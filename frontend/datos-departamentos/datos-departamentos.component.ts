import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { Departamento } from '../../backend/models/departamento.model';
import { HttpClientModule, provideHttpClient, withFetch  } from '@angular/common/http';
import { DepartamentosService } from '../../backend/services/departamentos.service';
import { NgFor, DatePipe, NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { CoreService } from '../../src/app/Core/core.service';
import { MatDialog } from '@angular/material/dialog';
import { AddDepartamentoComponent } from '../../src/app/shared/components/Departamentos/add-departamento/add-departamento.component';
import { UpdateDepartamentoComponent } from '../../src/app/shared/components/Departamentos/update-departamento/update-departamento.component';
import { MatPaginator } from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';



@Component({
  selector: 'app-datos-departamentos',
  standalone: true,
  imports: [HttpClientModule,
    NgFor, DatePipe, MatButton, MatExpansionModule,
    MatSort, MatTableModule, MatIcon,
    MatPaginator, MatFormFieldModule, NgIf,
    AddDepartamentoComponent,
    UpdateDepartamentoComponent
  ],
  providers: [DepartamentosService, CoreService],
  templateUrl: './datos-departamentos.component.html',
  styleUrl: './datos-departamentos.component.css'
})
export class DatosDepartamentosComponent implements OnInit, AfterViewInit{
  mostrar: boolean=false;

  displayedColumns: string[] = [
    'IdDepartamento',
    'NombreDepartamento',
    'NombreResponsable',
    'EstadoDepartamento',
    'Acciones'
  ];

  departamentos: Departamento[] = [];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _departamentosService: DepartamentosService,
      private _coreService: CoreService,
      private _dialog: MatDialog,
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
    this._departamentosService.deleteDepartamentos(id).subscribe({
      next: (res) => {
        this.actualizar();
        this._coreService.openSnackBar('Departamento Eliminado!', 'done');
      },
      error: (error) => {
        console.error('Error al cargar los departamentos', error);
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

  

}
