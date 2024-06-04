import { Component, OnInit, ViewChild } from '@angular/core';
import { Empleado } from '../../../backend/models/empleado.model';
import { HttpClientModule, provideHttpClient, withFetch  } from '@angular/common/http';
import { EmpleadosService } from '../../../backend/ConexionDB/empleados.service';
import { NgFor, DatePipe, NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CoreService } from '../../../src/app/Core/core.service';
import { HeaderComponent } from '../../../src/app/shared/components/header/header.component';
import { CreateEmpleadoComponent } from '../../../src/app/shared/components/empleados/create-empleado/create-empleado.component';
import { UpdateEmpleadoComponent } from '../../../src/app/shared/components/empleados/update-empleado/update-empleado.component';
import { MatPaginator } from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';

import { Router, RouterModule } from '@angular/router';// Importante para manejar la navegación

import { FlexLayoutModule } from '@angular/flex-layout';
import { AddBajaComponent } from '../../../src/app/shared/components/Bajas/add-baja/add-baja.component';
//import { AddDepartamentoComponent } from '../../src/app/shared/components/Departamentos/add-departamento/add-departamento.component';
//import { UpdateDepartamentoComponent } from '../../src/app/shared/components/Departamentos/update-departamento/update-departamento.component';



@Component({
  selector: 'app-datos',
  standalone: true,
  imports: [HttpClientModule,
    NgFor, DatePipe, MatButton, MatExpansionModule,
    MatSort, MatTableModule, MatIcon,
    HeaderComponent,
    CreateEmpleadoComponent,
    //UpdateEmpleadoComponent,
    MatPaginator,
    MatFormFieldModule,
    FlexLayoutModule,
    AddBajaComponent
  ],
  providers: [EmpleadosService, CoreService],
  templateUrl: './datos.component.html',
  styleUrl: './datos.component.css'
})
export class DatosComponent implements OnInit{
  NoNomina: number = 0;
 

  
  displayedColumns: string[] = [
    'NoNomina',
    'Nombre',
    //'Apellidos',
    'NombreDepartamento',
    'NombrePuesto',
    'Ingreso',
    'Antiguedad',
    'HorarioSemanal',
    'TipoIngreso',
    'Sueldo',
    //'EstadoEmpleado',
    'Acciones'
  ];

  empleados: Empleado[] = [];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private empleadosService: EmpleadosService, 
    private _coreService: CoreService,
    private _dialog: MatDialog,
    private router: Router) { 
  

    }

  ngOnInit() {
    //Traer a todos los empleados
    this.empleadosService.getEmpleados().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.empleados = data;
      },
      error: (error) => {
        console.error('Error al cargar los Empleados', error);
      }
    });

    /*
    this.empleadosService.getEmpleados().subscribe({
      next: (data) => {
        this.empleados = data;
      },
      error: (error) => {
        console.error('Error al cargar los empleados', error);
        window.alert('Eror al cargar los empleados' + error);
      }
    });*/

  }

  agregar(){
    /*
    const dialog = this._dialog.open(CreateEmpleadoComponent);
    dialog.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.actualizar();
        }
      }
    });*/


  }

  hola(){
    window.alert("Se ha Guardado");
  }

  editar(id: number){
    this.router.navigate(['updateEmpleado'+'/'+id]);
    
    /*
      const dialogU = this._dialog.open(UpdateEmpleadoComponent);

      dialogU.afterClosed().subscribe({
        next:(val)=>{
          if(val){
            this.actualizar();
          }
        }
      });*/
    
  }
  eliminar(data: number){

    /*const dialogU = this._dialog.open(AddBajaComponent,{
      data
    });*/
    const dialogU = this._dialog.open(AddBajaComponent);

    /*
    dialogU.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.actualizar();
        }
      }
    });*/

/*
    window.alert("Elimina"+id);
    //Eliminar
    this.empleadosService.deleteEmpleados(id).subscribe({
      next: (res) => {
        this.actualizar();
        this._coreService.openSnackBar('Employee deleted!', 'done');
      },
      error: (error) => {
        console.error('Error al cargar los empleados', error);
      }
    });*/

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
}
