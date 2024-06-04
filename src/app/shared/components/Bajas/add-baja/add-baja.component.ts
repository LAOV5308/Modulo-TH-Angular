import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { DepartamentosService } from '../../../../../../backend/ConexionDB/departamentos.service';
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
import { EmpleadosService } from '../../../../../../backend/ConexionDB/empleados.service';

import {provideMomentDateAdapter} from '@angular/material-moment-adapter';

import { HttpClientModule, provideHttpClient, withFetch  } from '@angular/common/http';


@Component({
  selector: 'app-add-baja',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgFor,
    HttpClientModule
  ],
  providers:[EmpleadosService,provideMomentDateAdapter(), provideNativeDateAdapter(), CoreService],
  templateUrl: './add-baja.component.html',
  styleUrl: './add-baja.component.css'
})
export class AddBajaComponent implements OnInit{
  Form: FormGroup;
  
  constructor(
    private _fb: FormBuilder,
  //private _departamentoService: DepartamentosService,
  private _empService: EmpleadosService,
  //private _dialogRef: MatDialogRef<AddBajaComponent>,
  //@Inject(MAT_DIALOG_DATA) public data: any,
  private _coreService: CoreService
){
  this.Form = this._fb.group({
    FechaBaja: '',
    TipoBaja: '',
    Finiquito: ''

  });
}

//Opciones de Eleccion
tipoBaja: string[] = [
  'Voluntaria',
  'Involuntaria',
  'Estrategica'
];


  ngOnInit(): void {
    
  }


  onFormSubmit(){
    if (this.Form.valid) {
      let formData = {};
      this._empService.addEmpleados(formData).subscribe({
          next: () => {
              this._coreService.openSnackBar('Employee added successfully');
             // this._dialogRef.close(true);
          },
          error: (err: any) => {
              console.error('Error: ' + err);
          }
      });
  }


  }

}
