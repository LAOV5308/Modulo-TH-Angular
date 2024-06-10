
import { Component, OnInit, ViewChild} from '@angular/core';
import { Incidencia } from '../../../../../../backend/models/incidencia.model';
import { Empleado } from '../../../../../../backend/models/empleado.model';
import { HttpClientModule, provideHttpClient, withFetch  } from '@angular/common/http';
import { Capacitacion } from '../../../../../../backend/models/capacitacion.model';

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
import { MessageConfirmCheckBoxComponent } from '../../incidencias/add-incidencia/message-confirm-check-box/message-confirm-check-box.component';


@Component({
  selector: 'app-datos-capacitaciones',
  standalone: true,
  imports: [HttpClientModule,
    NgFor, DatePipe, MatButton, MatExpansionModule,
    MatSort, MatTableModule, MatIcon,
    MatPaginator, MatFormFieldModule,
    MatCheckboxModule,
    MatCardModule,
    FormsModule,MessageConfirmCheckBoxComponent],
    providers:[EmpleadosService, CoreService],
  templateUrl: './datos-capacitaciones.component.html',
  styleUrl: './datos-capacitaciones.component.css'
})

export class DatosCapacitacionesComponent implements OnInit{

  checked = false;
  disabled = false;

  displayedColumns: string[] = [
    'NoNomina',
  'NombreCompleto',
  'NombrePuesto',
  'NombreDepartamento',
  'FechaIngreso',
  'CURP',
  'NombreCapacitacion',
  'FechaCapacitacion',
  'ValoracionCapacitacion',
  'CalificacionCapacitacion'
  ];

  capacitaciones: Capacitacion[] = [];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _coreService: CoreService,
    private _dialog: MatDialog,
    private _empleadosService: EmpleadosService
  
  ){}

  ngOnInit(): void {
    //Traer a todas las incidencias
    this._empleadosService.getCapacitaciones().subscribe({
      next: (data) => {
        this.capacitaciones = data;
        console.log(this.capacitaciones);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        
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
    /*
    const dialog = this._dialog.open();
    dialog.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.actualizar();
        }
      }
    });*/
  }

  editar(data: any){
    /*
    const dialogU = this._dialog.open(,{
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
