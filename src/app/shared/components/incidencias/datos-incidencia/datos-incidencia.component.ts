import { Component, OnInit, ViewChild} from '@angular/core';
import { Incidencia } from '../../../../../../backend/models/incidencia.model';
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
    AddIncidenciaComponent
  
  ],
    providers:[EmpleadosService, CoreService, IncidenciasService],
  templateUrl: './datos-incidencia.component.html',
  styleUrl: './datos-incidencia.component.css'
})
export class DatosIncidenciaComponent implements OnInit{

  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;

  displayedColumns: string[] = [
    'IdIncidencias',
    'NoNomina',
  'NombreCompleto',
  'NombrePuesto',
  'NombreDepartamento',
  'NombreResponsable',
  'Motivo',
  'FechaInicio',
  'FechaFin',
  'DiasSubsidios',
  'Estatus',
    'Acciones'
  ];

  incidencias: Incidencia[] = [];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _incidenciasService: IncidenciasService,
    private _coreService: CoreService,
    private _dialog: MatDialog,){}

  ngOnInit(): void {
    //Traer a todas las incidencias
    this._incidenciasService.getIncidencias().subscribe({
      next: (data) => {
        this.incidencias = data;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        
      },
      error: (error) => {
        console.error('Error al cargar las incidencias', error);
      }
    });
    
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


}
