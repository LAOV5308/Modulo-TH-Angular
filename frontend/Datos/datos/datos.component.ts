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


//import { AddDepartamentoComponent } from '../../src/app/shared/components/Departamentos/add-departamento/add-departamento.component';
//import { UpdateDepartamentoComponent } from '../../src/app/shared/components/Departamentos/update-departamento/update-departamento.component';



@Component({
  selector: 'app-datos',
  standalone: true,
  imports: [HttpClientModule,
    NgFor, DatePipe, MatButton, MatExpansionModule,
    MatSort, MatTableModule, MatIcon,
    HeaderComponent,
    CreateEmpleadoComponent
  ],
  providers: [EmpleadosService, CoreService],
  templateUrl: './datos.component.html',
  styleUrl: './datos.component.css'
})
export class DatosComponent implements OnInit{
  displayedColumns: string[] = [
    'NumeroNomina',
    'NombreEmpleado',
    'NombreDepartamento',
    'NombrePuesto',
    'Ingreso',
    'Antiguedad',
    'HorarioSemanal',
    'TipoIngreso',
    'EstadoEmpleado',
    'Acciones'
  ];

  empleados: Empleado[] = [];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatSort) sort!: MatSort;

  

  constructor(private empleadosService: EmpleadosService, 
    private _coreService: CoreService,
    private _dialog: MatDialog) { }

  ngOnInit() {
    //Traer a todos los empleados
    this.empleadosService.getEmpleados().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.empleados = data;
      },
      error: (error) => {
        console.error('Error al cargar los departamentos', error);
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
    const dialog = this._dialog.open(CreateEmpleadoComponent);
    dialog.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.actualizar();
        }
      }
    });


  }

  hola(){
    window.alert("Se ha Guardado");
  }
  editar(data: any){
    window.alert("Editar");
  }
  eliminar(id: number){
    window.alert("Elimina");
    console.log("Eliminar");
  }


  actualizar(){
    this.ngOnInit();
  }
}
