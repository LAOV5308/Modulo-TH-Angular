import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Puesto } from '../../backend/models/puesto.model';
import { HttpClientModule, provideHttpClient, withFetch  } from '@angular/common/http';
import { NgFor, DatePipe, NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { CoreService } from '../../src/app/Core/core.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import { PuestosService } from '../../backend/services/puestos.service';
import { AddPuestoComponent } from '../../src/app/shared/components/Puestos/add-puesto/add-puesto.component';
import { UpdatePuestoComponent } from '../../src/app/shared/components/Puestos/update-puesto/update-puesto.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { EmpleadosService } from '../../backend/services/empleados.service';
import { Empleado } from '../../backend/models/empleado.model';


@Component({
  selector: 'app-datos-puestos',
  standalone: true,
  imports: [ToastModule,HttpClientModule,
    NgFor, DatePipe, MatButton, MatExpansionModule,
    MatSort, MatTableModule, MatIcon,
    MatPaginator, MatFormFieldModule, UpdatePuestoComponent, AddPuestoComponent],
    providers: [PuestosService, MessageService,EmpleadosService],
  templateUrl: './datos-puestos.component.html',
  styleUrl: './datos-puestos.component.css'
})
export class DatosPuestosComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = [
    'IdPuesto',
    'NombrePuesto',
    'NombreDepartamento',
    'Acciones'
  ];
  algo: any;
  puestos: Puesto[] = [];
  dataSource!: MatTableDataSource<any>;
  empleados:Empleado[]=[];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _puestosService: PuestosService,
      private _dialog: MatDialog,
      private messageService: MessageService,
      private empleadosService: EmpleadosService
  ) { this.cargarPuestos()}

ngOnInit(): void {

  this.cargarPuestos();

  this.empleadosService.getEmpleados().subscribe({
    next: (data) => {
      this.empleados = data;
    },
    error: (error) => {
      console.error('Error al cargar los puestos', error);
    }
  });
  
}

ngAfterViewInit(): void {
  // Configurar el dataSource con el MatSort y MatPaginator después de que se hayan inicializado
  if (this.dataSource) {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}


cargarPuestos(): void {
  this._puestosService.getPuestos().subscribe({
    next: (data) => {
      this.puestos = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },
    error: (error) => {
      console.error('Error al cargar los puestos', error);
    }
  });
}



agregar(){
  const dialog = this._dialog.open(AddPuestoComponent);
  dialog.afterClosed().subscribe({
    next:(val)=>{
      if(val){
        this.actualizar();
      }
    }
  });
}


editar(data: any){
  const dialogU = this._dialog.open(UpdatePuestoComponent,{
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

eliminar(id: number){
  //window.alert("Elimina"+id);
  //Eliminar
  if(this.empleados.find(empleado => empleado.IdPuesto === id)){
    this.messageService.add({ severity: 'info', summary: 'No se puede Eliminar', detail: 'Hay empleados Activos con este Puesto' });
  }else{
    this._puestosService.deletePuestos(id).subscribe({
      next: (res) => {
        this.actualizar();
        this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'Eliminado Con exito' });
      },
      error: (error) => {
        console.error('Error al cargar los puestos', error);
      }
    });
  }
 
  
}

actualizar(){
    this.cargarPuestos();
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

}
