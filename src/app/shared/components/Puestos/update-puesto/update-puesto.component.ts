import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import {provideNativeDateAdapter} from '@angular/material/core';
import { NgFor } from '@angular/common';
import { CoreService } from '../../../../Core/core.service';
import { Puesto } from '../../../../../../backend/models/puesto.model';
import { PuestosService } from '../../../../../../backend/ConexionDB/puestos.service';
import { Departamento } from '../../../../../../backend/models/departamento.model';
import { DepartamentosService } from '../../../../../../backend/ConexionDB/departamentos.service';
import { HttpClientModule} from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-update-puesto',
  standalone: true,
  imports: [MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgFor,
    HttpClientModule,
  MatButtonModule],
    providers: [DepartamentosService, PuestosService, provideNativeDateAdapter(), CoreService],
  templateUrl: './update-puesto.component.html',
  styleUrl: './update-puesto.component.css'
})
export class UpdatePuestoComponent implements OnInit{
  Form: FormGroup;
  departamentos: Departamento[] = [];
  NombreDepart: string[] = [];


  ngOnInit(): void {
    this._departamentosService.getDepartamentos().subscribe({
      next: (data) => {
        this.departamentos = data;
        this.departamentos.forEach(element => {
          this.NombreDepart.push(element.NombreDepartamento);
        });
        
      },
      error: (error) => {
        console.error('Error al cargar los departamentos', error);
      }
    });

    this.Form.patchValue(this.data);
    
  }
  constructor(
    private _fb: FormBuilder,
    private _puestoService: PuestosService,
    private _departamentosService: DepartamentosService,
    private _dialogRef: MatDialogRef<UpdatePuestoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ){
    this.Form = this._fb.group({
      NombrePuesto: '',
      NombreDepartamento: ''
    });
  }

  onFormSubmit() {
    
    if (this.Form.valid) {
      if(this.data){
      this._puestoService.updatePuestos(this.data.IdPuesto,this.Form.value).subscribe({
        next: (resp: any) => {
            this._coreService.openSnackBar('Puesto Actualizado successfully', resp);
            this._dialogRef.close(true);
        },
        error: (err: any) => {
            console.error('Error: ' + err);
            this._coreService.openSnackBar('Error al agregar el Puesto');
        }
    });
    }else{
      this._coreService.openSnackBar('Por favor, complete el formulario correctamente');
    }
  }
}

}
