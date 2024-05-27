import { Component, OnInit, ViewChild} from '@angular/core';
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
import { PuestosService } from '../../backend/ConexionDB/puestos.service';
import { AddPuestoComponent } from '../../src/app/shared/components/Puestos/add-puesto/add-puesto.component';
import { UpdatePuestoComponent } from '../../src/app/shared/components/Puestos/update-puesto/update-puesto.component';


@Component({
  selector: 'app-datos-puestos',
  standalone: true,
  imports: [HttpClientModule,
    NgFor, DatePipe, MatButton, MatExpansionModule,
    MatSort, MatTableModule, MatIcon,
    MatPaginator, MatFormFieldModule],
    providers: [PuestosService, CoreService],
  templateUrl: './datos-puestos.component.html',
  styleUrl: './datos-puestos.component.css'
})
export class DatosPuestosComponent implements OnInit{
  displayedColumns: string[] = [
    'IdPuesto',
    'NombrePuesto',
    'NombreDepartamento',
    'EstadoPuesto',
    'Acciones'
  ];
  puestos: Puesto[] = [];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _puestosService: PuestosService,
      private _coreService: CoreService,
      private _dialog: MatDialog,
  ) { }

ngOnInit(): void {
  this._puestosService.getPuestos().subscribe({
    next: (data) => {
      this.puestos = data;
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
  this._puestosService.deletePuestos(id).subscribe({
    next: (res) => {
      this.actualizar();
      this._coreService.openSnackBar('Puesto Eliminado!', 'done');
    },
    error: (error) => {
      console.error('Error al cargar los puestos', error);
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
