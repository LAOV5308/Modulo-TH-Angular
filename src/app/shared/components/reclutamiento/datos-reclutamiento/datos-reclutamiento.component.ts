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
//import { AddIncidenciaComponent } from '../add-incidencia/add-incidencia.component';
//import { MessageConfirmCheckBoxComponent } from '../add-incidencia/message-confirm-check-box/message-confirm-check-box.component';
//import { UpdateIncidenciaComponent } from '../update-incidencia/update-incidencia.component';
import {MatTabsModule} from '@angular/material/tabs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SolicitudesService } from '../../../../../../backend/ConexionDB/solicitudes.service';
import { SolicitudProceso, SolicitudAceptada, SolicitudRechazada } from '../../../../../../backend/models/solicitudes.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-datos-reclutamiento',
  standalone: true,
  imports: [HttpClientModule,
    NgFor, DatePipe, MatButton, MatExpansionModule,
    MatSort, MatTableModule, MatIcon,
    MatPaginator, MatFormFieldModule,
    MatCheckboxModule,
    MatCardModule,
    FormsModule,
    MatTabsModule,
    MatProgressSpinnerModule

  ],
  providers:[SolicitudesService, EmpleadosService],
  templateUrl: './datos-reclutamiento.component.html',
  styleUrl: './datos-reclutamiento.component.css'
})
export class DatosReclutamientoComponent implements OnInit, AfterViewInit{
  
  checked = false;
  disabled = false;

  displayedColumns: string[] = [
    'IdSolicitud',
    'Nombre',
    'Apellidos',
    'Edad',
    'PuestoOfrecido',
    'PuestoSolicitado',
    'FechaSolicitud',
    'Acciones'
  ];

  displayedColumnsAceptadas: string[] = [
    'IdSolicitud',
    'Nombre',
    'Apellidos',
    'Edad',
    'PuestoAceptado',
    'FechaAceptacion',
    'Acciones'
  ];

  displayedColumnsRechazadas: string[] = [
    'IdSolicitud',
    'Nombre',
    'Apellidos',
    'Edad',
    'PuestoRechazado',
    'FechaRechazo',
    'Acciones'
  ];

  solicitudesProceso: SolicitudProceso[]=[];
  solicitudesAceptadas: SolicitudAceptada[]=[];
  solicitudesRechazadas: SolicitudRechazada[]=[];

  dataSource!: MatTableDataSource<any>;
  dataAceptadas!: MatTableDataSource<any>;
  dataRechazadas!: MatTableDataSource<any>;

  // Cambiar identificadores de ViewChild
  @ViewChild('sortAceptadas') sortAceptadas!: MatSort;
  @ViewChild('paginatorAceptadas') paginatorAceptadas!: MatPaginator;
  @ViewChild('sortProceso') sortProceso!: MatSort;
  @ViewChild('paginatorProceso') paginatorProceso!: MatPaginator;
  @ViewChild('sortRechazadas') sortRechazadas!: MatSort;
  @ViewChild('paginatorRechazadas') paginatorRechazadas!: MatPaginator;

  //@ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _solicitudesService: SolicitudesService,
    private _coreService: CoreService,
    private _dialog: MatDialog,
    private _empleadosService: EmpleadosService,
    private router: Router
  
  ){}

  ngAfterViewInit(): void {
    // Configurar el dataSource con el MatSort y MatPaginator después de que se hayan inicializado
    if (this.dataSource) {
      this.dataSource.sort = this.sortProceso;
      this.dataSource.paginator = this.paginatorProceso;
    }
    if (this.dataAceptadas) {
      this.dataAceptadas.sort = this.sortAceptadas;
      this.dataAceptadas.paginator = this.paginatorAceptadas;
    }
    if(this.dataRechazadas){
      this.dataRechazadas.sort = this.sortRechazadas;
      this.dataRechazadas.paginator = this.paginatorRechazadas
    }

  }

  ngOnInit(): void {
    //Traer a todas las incidencias
    this._solicitudesService.getSolicitudesProceso().subscribe({
      next: (data) => {
        this.solicitudesProceso = data;
        console.log(this.solicitudesProceso);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sortProceso;
        this.dataSource.paginator = this.paginatorProceso;
        
      },
      error: (error) => {
        console.error('Error al cargar las solicitudes', error);
      }
    });

    this._solicitudesService.getSolicitudesAceptadas().subscribe({
      next: (data) => {
        this.solicitudesAceptadas = data;
        console.log(this.solicitudesAceptadas);
        this.dataAceptadas = new MatTableDataSource(data);
        this.dataAceptadas.sort = this.sortAceptadas;
        this.dataAceptadas.paginator = this.paginatorAceptadas;
      },
      error: (error) => {
        console.error('Error al cargar las solicitudes', error);
      }
    });

    this._solicitudesService.getSolicitudesRechazadas().subscribe({
      next: (data) => {
        this.solicitudesRechazadas = data;
        console.log(this.solicitudesRechazadas);
        this.dataRechazadas = new MatTableDataSource(data);
        this.dataRechazadas.sort = this.sortRechazadas;
        this.dataRechazadas.paginator = this.paginatorRechazadas;
      },
      error: (error) => {
        console.error('Error al cargar las solicitudes', error);
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

this.router.navigate(['/system/addreclutamiento']);
    /*
    const dialog = this._dialog.open(AddIncidenciaComponent);
    dialog.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.actualizar();
        }
      }
    });*/
  }

  editar(data: any){
    window.alert(data);

    /*
    const dialogU = this._dialog.open(UpdateIncidenciaComponent,{
      data
    });
    dialogU.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.actualizar();
        }
      }
    });*/

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

  applyFilterAceptada(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataAceptadas.filter = filterValue.trim().toLowerCase();

    if (this.dataAceptadas.paginator) {
      this.dataAceptadas.paginator.firstPage();
    }
  }
  applyFilterRechazada(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataRechazadas.filter = filterValue.trim().toLowerCase();

    if (this.dataRechazadas.paginator) {
      this.dataRechazadas.paginator.firstPage();
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
    /*
    
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
*/
  }
    




}
