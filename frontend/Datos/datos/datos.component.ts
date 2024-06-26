import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
import {MatTabsModule} from '@angular/material/tabs';
import { MessageRecuperarComponent } from '../../../src/app/shared/components/Messages/message-recuperar/message-recuperar.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
    AddBajaComponent,
    MatTabsModule,
    MessageRecuperarComponent
  ],
  providers: [EmpleadosService, CoreService],
  templateUrl: './datos.component.html',
  styleUrl: './datos.component.css'
})
export class DatosComponent implements OnInit, AfterViewInit{
  NoNomina: number = 0;
  Form: FormGroup;
 

  
  displayedColumns: string[] = [
    'NoNomina',
    'Nombre',
    'Edad',
    'NombreDepartamento',
    'NombrePuesto',
    'Ingreso',
    'Antiguedad',
    'HorarioSemanal',
    'TipoIngreso',
    //'Sueldo',
    //'EstadoEmpleado',
    'Acciones'
  ];

  empleados: Empleado[] = [];
  dataSource!: MatTableDataSource<any>;
  dataInactive!: MatTableDataSource<any>;
    // Cambiar identificadores de ViewChild
    @ViewChild('sortActive') sortActive!: MatSort;
    @ViewChild('paginatorActive') paginatorActive!: MatPaginator;
    @ViewChild('sortInactive') sortInactive!: MatSort;
    @ViewChild('paginatorInactive') paginatorInactive!: MatPaginator;

  constructor(private empleadosService: EmpleadosService, 
    private _coreService: CoreService,
    private _dialog: MatDialog,
    private router: Router,
    private _fb: FormBuilder
  ) { 
      this.Form = this._fb.group({
        NoNomina: ''
      });
  

    }

    ngAfterViewInit(): void {
      // Configurar el dataSource con el MatSort y MatPaginator después de que se hayan inicializado
      if (this.dataSource) {
        this.dataSource.sort = this.sortActive;
        this.dataSource.paginator = this.paginatorActive;
      }

      if (this.dataInactive) {
        this.dataInactive.sort = this.sortInactive;
        this.dataInactive.paginator = this.paginatorInactive;
      }

    }

  ngOnInit() {
    //Traer a todos los empleados
    this.empleadosService.getEmpleados().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sortActive;
        this.dataSource.paginator = this.paginatorActive;
        this.empleados = data;
      },
      error: (error) => {
        console.error('Error al cargar los Empleados', error);
      }
    });

    this.empleadosService.getEmpleadosInactive().subscribe({
      next: (data) => {
        this.dataInactive = new MatTableDataSource(data);
        this.dataInactive.sort = this.sortInactive;
        this.dataInactive.paginator = this.paginatorInactive;
        //this.empleados = data;
      },
      error: (error) => {
        console.error('Error al cargar los Empleados Inactivos', error);
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

  consultar(idEmpleado: number){
    this.router.navigate(['system/consultarEmpleado'+'/'+idEmpleado]);
  }

  recuperar(NoNomina1: number, NombreEmpleado: string){

    //Mensaje de confirmar para eliminar
    const dialogRef = this._dialog.open(MessageRecuperarComponent, {
      width: '400px', height: '250px', 
      data: {
        description: '¿Está seguro que desea recuperar el empleado?',
        item: NombreEmpleado
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        /*
        let datos = [{
          NoNomina: NoNomina1
        }];*/

        this.Form.patchValue({
          NoNomina: NoNomina1
        })

    this.empleadosService.recuperarEmpleado(this.Form.value).subscribe({
      next: (resp: any) => {
        this._coreService.openSnackBar('Empleado Recuperado successfully', resp);
        this.actualizar();

    },
    error: (err: any) => {
        console.error('Error: ' + err);
        this._coreService.openSnackBar('Error al recuperar Empleado');
    }
    });
        
      }
    });
  }
  

  editar(id: number){
    this.router.navigate(['system/updateEmpleado'+'/'+id]);
    
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

  eliminar(data: any){

    const dialogU = this._dialog.open(AddBajaComponent,{
      data
    });

    
    dialogU.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.actualizar();
        }
      }
    });

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


applyFilterInactive(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataInactive.filter = filterValue.trim().toLowerCase();

  if (this.dataInactive.paginator) {
    this.dataInactive.paginator.firstPage();
  }
}
}
