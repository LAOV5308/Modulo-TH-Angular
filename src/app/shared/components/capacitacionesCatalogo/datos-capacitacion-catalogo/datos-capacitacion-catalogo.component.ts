
import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { Incidencia } from '../../../../../../backend/models/incidencia.model';
import { Empleado } from '../../../../../../backend/models/empleado.model';
import { HttpClientModule, provideHttpClient, withFetch  } from '@angular/common/http';
import { Capacitacion } from '../../../../../../backend/models/capacitacion.model';

import { NgFor, DatePipe, NgIf, CommonModule } from '@angular/common';
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
import { MessageConfirmCheckBoxComponent } from '../../incidencias/add-incidencia/message-confirm-check-box/message-confirm-check-box.component';
import { CapacitacionService } from '../../../../../../backend/ConexionDB/capacitacion.service';

import { MessageDeleteComponent } from '../../Messages/message-delete/message-delete.component';
import { UpdateCapacitacionCatalogoComponent } from '../update-capacitacion-catalogo/update-capacitacion-catalogo.component';
import { AddCapacitacionesComponent } from '../../capacitaciones/add-capacitaciones/add-capacitaciones.component';
import { ColorPickerModule } from 'primeng/colorpicker';


@Component({
  selector: 'app-datos-capacitacion-catalogo',
  standalone: true,
  imports: [HttpClientModule,
    NgFor, DatePipe, MatButton, MatExpansionModule,
    MatSort, MatTableModule, MatIcon,
    MatPaginator, MatFormFieldModule,
    MatCheckboxModule,
    MatCardModule,
    FormsModule,MessageConfirmCheckBoxComponent,
    MessageDeleteComponent,
    UpdateCapacitacionCatalogoComponent, NgIf,  ColorPickerModule, CommonModule ],
    providers:[EmpleadosService, CoreService, CapacitacionService],
  templateUrl: './datos-capacitacion-catalogo.component.html',
  styleUrl: './datos-capacitacion-catalogo.component.css'
})
export class DatosCapacitacionCatalogoComponent implements OnInit, AfterViewInit{
  checked = false;
  disabled = false;
  Habilitado = false;
  color: string = '#0073ff';

  displayedColumns: string[] = [
    //'CodigoCapacitacion',
    'Color',
    'NombreCapacitacion',
    'Origen',
    'Estatus',
    'TipoCapacitacion',
    'Duracion',
    'Acciones'
    //'EstadoNombreCapacitacion'
  ];

  //capacitaciones: CapacitacionCatalogo[] = [];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _coreService: CoreService,
    private _dialog: MatDialog,
    private _empleadosService: EmpleadosService,
    private _catalogoCapacitacionesService: CapacitacionService
  ){}

  ngAfterViewInit(): void {
    // Configurar el dataSource con el MatSort y MatPaginator después de que se hayan inicializado
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnInit(): void {
   this.getCapacitaciones();
    
  }

  getCapacitaciones(){
    /*
     //Traer a todas las incidencias
     this._catalogoCapacitacionesService.getCatalogoCapacitaciones().subscribe({
      next: (data) => {
        /*this.capacitaciones = data;
        console.log(this.capacitaciones);*/
        /*this.dataSource = new MatTableDataSource(data);
        //this.actualizar();
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.error('Error al cargar las capacitaciones', error);
      }
    });
*/
  }

  ajustarFecha(fecha: string): string {
    let date = new Date(fecha);
    let userTimezoneOffset = date.getTimezoneOffset() * 60000;
    date = new Date(date.getTime() + userTimezoneOffset); // Ajuste para corregir la zona horaria
    return date.toISOString().split('T')[0]; // Devuelve solo la parte de la fecha (YYYY-MM-DD)
  }

  agregar(){
    /*
    const dialog = this._dialog.open(AddCapacitacionCatalogoComponent
      );

    dialog.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.actualizar();
        }
      }
    });*/
  }

  editar(data: string){

    const dialogU = this._dialog.open(UpdateCapacitacionCatalogoComponent,{
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
  eliminar(IdCatalogoCapacitacion: number, nombreCapacitacion: string){

    //Mensaje de confirmar para eliminar
    const dialogRef = this._dialog.open(MessageDeleteComponent, {
      width: '400px', height: '250px', 
      data: {
        description: '¿Está seguro que desea dar de baja la Capacitacion?',
        item: nombreCapacitacion
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //Eliminar
    this._catalogoCapacitacionesService.deleteCatalogoCapacitacion(IdCatalogoCapacitacion).subscribe({
      next: (res) => {
        this.actualizar();
        this._coreService.openSnackBar('Se ha Eliminado la Capacitacion del Catalogo!', 'done');
      },
      error: (error) => {
        console.error('Error al Eliminar', error);
      }
    });
        
      }
    });
  

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

}
