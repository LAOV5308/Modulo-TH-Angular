import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { Departamento } from '../../../../../../backend/models/departamento.model';
import { HttpClientModule, provideHttpClient, withFetch  } from '@angular/common/http';
import { DepartamentosService } from '../../../../../../backend/services/departamentos.service';
import { NgFor, DatePipe, NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { CoreService } from '../../../../Core/core.service';
import { MatDialog } from '@angular/material/dialog';
import { AddDepartamentoComponent } from '../add-departamento/add-departamento.component';
import { UpdateDepartamentoComponent } from '../update-departamento/update-departamento.component';
import { MatPaginator } from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { EmpleadosService } from '../../../../../../backend/services/empleados.service';
import { Empleado } from '../../../../../../backend/models/empleado.model';


@Component({
  selector: 'app-datos-departamentos',
  standalone: true,
  imports: [HttpClientModule,
    NgFor, DatePipe, MatButton, MatExpansionModule,
    MatSort, MatTableModule, MatIcon,
    MatPaginator, MatFormFieldModule, NgIf,
    AddDepartamentoComponent,
    UpdateDepartamentoComponent,
    ToastModule
  ],
  providers: [DepartamentosService, MessageService,EmpleadosService],
  templateUrl: './datos-departamentos.component.html',
  styleUrl: './datos-departamentos.component.css'
})
export class DatosDepartamentosComponent implements OnInit, AfterViewInit{
  mostrar: boolean=false;

  displayedColumns: string[] = [
    'IdDepartamento',
    'NombreDepartamento',
    'NombreResponsable',
    'Acciones'
  ];

  departamentos: Departamento[] = [];
  empleados: Empleado[] = [];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _departamentosService: DepartamentosService,
    private messageService: MessageService,
      private _dialog: MatDialog,
      private empleadosService: EmpleadosService
  ) { }

  ngAfterViewInit(): void {
    // Configurar el dataSource con el MatSort y MatPaginator después de que se hayan inicializado
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnInit() {
    //window.alert('actualizo');
    //Traer a todos los empleados
    this._departamentosService.getDepartamentos().subscribe({
      next: (data) => {
        this.departamentos = data;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        
      },
      error: (error) => {
        console.error('Error al cargar los departamentos', error);
      }
    });

    this.empleadosService.getEmpleados().subscribe({
      next: (data) => {
        this.empleados = data;
        
      },
      error: (error) => {
        console.error('Error', error);
      }
    });
  }


  agregar(){
    const dialog = this._dialog.open(AddDepartamentoComponent);
    dialog.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.actualizar();
        }
      }
    });
  }


  editar(data: any){
    const dialogU = this._dialog.open(UpdateDepartamentoComponent,{
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

    if(this.empleados.find(empleado => empleado.IdDepartamento === id)){
      this.messageService.add({ severity: 'warn', summary: 'No se puede Eliminar', detail: 'Existen Empleados Activos con este Departamento' });
    }else{
      this._departamentosService.deleteDepartamentos(id).subscribe({
        next: (res) => {
          this.actualizar();
          this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'Eliminado Correctamente' });
        },
        error: (error) => {
          console.error('Error al cargar los departamentos', error);
        }
      });
    }

    
    
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
