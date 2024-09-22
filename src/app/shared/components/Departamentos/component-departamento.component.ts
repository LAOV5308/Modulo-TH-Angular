import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { DepartamentosService } from '../../../../../backend/ConexionDB/departamentos.service';

import { AddDepartamentoComponent } from './add-departamento/add-departamento.component';
import { DatosDepartamentosComponent } from '../../../../../frontend/datos-departamentos/datos-departamentos.component';






@Component({
  selector: 'app-component-departamento',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    AddDepartamentoComponent,
    DatosDepartamentosComponent
  ],
  providers: [DepartamentosService],
  templateUrl: './component-departamento.component.html',
  styleUrl: './component-departamento.component.css'
})
export class ComponentDepartamentoComponent {
  constructor(
    private _dialog: MatDialog,
    private _departamentoService: DepartamentosService
  ){

  }


  ngOnInit(): void {
    
  }

  agregarDepartamento(){
    const dialog = this._dialog.open(AddDepartamentoComponent);
  
  }

}
