import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { Incidencia } from '../../../../../../backend/models/incidencia.model';
import { Empleado } from '../../../../../../backend/models/empleado.model';
import { HttpClientModule, provideHttpClient, withFetch  } from '@angular/common/http';

import { NgFor, DatePipe, NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

import { MatPaginator } from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CoreService } from '../../../../Core/core.service';
import { EmpleadosService } from '../../../../../../backend/ConexionDB/empleados.service';
import { IncidenciasService } from '../../../../../../backend/ConexionDB/incidencias.service';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import { AddIncidenciaComponent } from '../add-incidencia/add-incidencia.component';
import { MessageConfirmCheckBoxComponent } from '../add-incidencia/message-confirm-check-box/message-confirm-check-box.component';
import { UpdateIncidenciaComponent } from '../update-incidencia/update-incidencia.component';
import {MatTabsModule} from '@angular/material/tabs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-datos-incidencia',
  standalone: true,
  imports: [HttpClientModule,
    NgFor, DatePipe, MatButton, MatExpansionModule,
    MatSort, MatTableModule, MatIcon,
    MatPaginator, MatFormFieldModule,
    MatCheckboxModule,
    MatCardModule,
    FormsModule,
    AddIncidenciaComponent,
    MessageConfirmCheckBoxComponent,
    UpdateIncidenciaComponent,
    MatTabsModule,
    MatProgressSpinnerModule
  
  ],
    providers:[EmpleadosService, CoreService, IncidenciasService],
  templateUrl: './datos-incidencia.component.html',
  styleUrl: './datos-incidencia.component.css'
})
export class DatosIncidenciaComponent implements OnInit, AfterViewInit{

  checked = false;
  disabled = false;

  displayedColumns: string[] = [
    'IdIncidencias',
    'NoNomina',
  'NombreCompleto',
  'NombrePuesto',
  'NombreDepartamento',
  'CategoriaIncidencia',
  'Motivo',
  'FechaInicio',
  'FechaFin',
  'DiasSubsidios',
  'Estatus',
  'FolioAlta',
  'FolioBaja',
  'Acciones'
  ];

  incidencias: Incidencia[] = [];
  incidenciasClose: Incidencia[]=[];
  incidenciasAll: Incidencia[]=[];
  dataSource!: MatTableDataSource<any>;
  dataClose!: MatTableDataSource<any>;
  dataAll!: MatTableDataSource<any>;
  @ViewChild('sortActive') sortActive!: MatSort;
  @ViewChild('sortClose') sortClose!: MatSort;
  @ViewChild('sortAll') sortAll!: MatSort;
  
  @ViewChild('paginatorActive') paginatorActive!: MatPaginator;
  @ViewChild('paginatorClose') paginatorClose!: MatPaginator;
  @ViewChild('paginatorAll') paginatorAll!: MatPaginator;

  constructor(private _incidenciasService: IncidenciasService,
    private _coreService: CoreService,
    private _dialog: MatDialog,
    private _empleadosService: EmpleadosService
  
  ){}

  ngAfterViewInit(): void {
    // Configurar el dataSource con el MatSort y MatPaginator después de que se hayan inicializado
    if (this.dataSource) {
      this.dataSource.sort = this.sortActive;
      this.dataSource.paginator = this.paginatorActive;
    }
    if (this.dataClose) {
      this.dataClose.sort = this.sortClose;
      this.dataClose.paginator = this.paginatorClose;
    }
    
    if (this.dataAll) {
      this.dataAll.sort = this.sortAll;
      this.dataAll.paginator = this.paginatorAll;
    }
  }

  ngOnInit(): void {
    //Traer a todas las incidencias
    this._incidenciasService.getIncidencias().subscribe({
      next: (data) => {
        this.incidencias = data;
        console.log(this.incidencias);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sortActive;
        this.dataSource.paginator = this.paginatorActive;
        
      },
      error: (error) => {
        console.error('Error al cargar las incidencias', error);
      }
    });
    this._incidenciasService.getIncidenciasClose().subscribe({
      next: (data) => {
        this.incidenciasClose = data;
        this.dataClose = new MatTableDataSource(data);
        this.dataClose.sort = this.sortClose;
        this.dataClose.paginator = this.paginatorClose;
        
      },
      error: (error) => {
        console.error('Error al cargar las incidencias', error);
      }
    });
    this._incidenciasService.getIncidenciasAll().subscribe({
      next: (data) => {
        this.incidenciasAll = data;
        console.log(this.incidencias);
        this.dataAll = new MatTableDataSource(data);
        this.dataAll.sort = this.sortAll;
        this.dataAll.paginator = this.paginatorAll;
        
      },
      error: (error) => {
        console.error('Error al cargar las incidencias', error);
      }
    });
    
  }

  ajustarFecha(fecha: string): string {
    let date = new Date(fecha);
    let userTimezoneOffset = date.getTimezoneOffset() * 60000;
    date = new Date(date.getTime() + userTimezoneOffset); // Ajuste para corregir la zona horaria
    return date.toISOString().split('T')[0]; // Devuelve solo la parte de la fecha (YYYY-MM-DD)
  }

  agregar(){
    const dialog = this._dialog.open(AddIncidenciaComponent);
    dialog.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.actualizar();
        }
      }
    });
  }

  editar(data: any){

    const dialogU = this._dialog.open(UpdateIncidenciaComponent,{
      data
    });
    dialogU.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.actualizar();
        }
      }
    });

  }
  eliminar(Id: number){

  }

  actualizar(){
    this.ngOnInit();
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  applyFilterClose(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataClose.filter = filterValue.trim().toLowerCase();

    if (this.dataClose.paginator) {
      this.dataClose.paginator.firstPage();
    }
  }
  applyFilterAll(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataAll.filter = filterValue.trim().toLowerCase();

    if (this.dataAll.paginator) {
      this.dataAll.paginator.firstPage();
    }
  }

  /*seleccionar(){
    const dialogRef = this._dialog.open(MessageConfirmCheckBoxComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        window.alert('Se ha dado de Baja');
        // Aquí puedes agregar la lógica para manejar el cierre de sesión
      } else {
        window.alert('Aun sigue activa');
      }
    });
  }*/

  seleccionar(IdIncidencias: number): void {
    const dialogRef = this._dialog.open(MessageConfirmCheckBoxComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._incidenciasService.closeIncidencia(IdIncidencias, null).subscribe({
          next: (resp: any) => {
            this._coreService.openSnackBar('Incidencia Cerrada con exito', resp);
            this.actualizar();
            //this.router.navigate(['/empleados'])
        },
        error: (err: any) => {
            console.error('Error: ' + err);
            this._coreService.openSnackBar('Error al cerrar incidencia');
        }
    });

        
        // Aquí puedes agregar la lógica para manejar el cierre de sesión
      } else {
        //row.disabled = !row.disabled;
        this.actualizar();
      }
    });

  }
    




}
