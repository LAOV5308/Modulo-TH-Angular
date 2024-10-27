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
import { NgFor, NgIf } from '@angular/common';
import { CoreService } from '../../../../Core/core.service';
import { EmpleadosService } from '../../../../../../backend/services/empleados.service';
import {MatButtonModule} from '@angular/material/button';

import {provideMomentDateAdapter} from '@angular/material-moment-adapter';

import { HttpClientModule, provideHttpClient, withFetch  } from '@angular/common/http';
import {DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';

//Fecha Español

import 'moment/locale/es';


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
    NgIf,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule
  ],
  providers:[
    provideMomentDateAdapter(),{provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    EmpleadosService, CoreService],
  templateUrl: './add-baja.component.html',
  styleUrl: './add-baja.component.css'
})
export class AddBajaComponent implements OnInit{
  Form: FormGroup;
  NoNomina: number=0;
  procesoDemanda: boolean = false;
  
  constructor(
    private _fb: FormBuilder,
  //private _departamentoService: DepartamentosService,
  private _empService: EmpleadosService,
  private _dialogRef: MatDialogRef<AddBajaComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private _coreService: CoreService,
){
  this.Form = this._fb.group({
    //NoNomina: [{value: ' ', disabled: true}, Validators.required],
    FechaSalida: ['', Validators.required],
    TipoBaja: ['', Validators.required],
    Finiquito: [''],
    FondoAhorro: [''],
    Motivo: ['', Validators.required],
    ProcesoDemanda: [false],
    FechaInicio: [''],
    FechaFin: ['']

  }); 
}

//Opciones de Eleccion
tipoBaja: string[] = [
  'Voluntaria',
  'Involuntaria',
  'Estrategica'
];

//Motivo
motivo: string[] = [
  'Mejor empleo', 'Inconformidad de Horarios/turnos', 'Inconformidad de Sueldo', 'Relación con compañeros', 
  'Inconformidad con el trabajo', 'Lejania', 'Cambio de Residencia', 'Enfermedad', 'Situación Personal', 'Matrimonio', 'Otro'
]


  ngOnInit(): void {
    /*
      this.Form.patchValue({
        NoNomina: this.data.NoNomina
      })*/
      this.NoNomina = this.data.NoNomina;
      this.onChanges();
  }

  onChanges(): void {
    this.Form.get('ProcesoDemanda')!.valueChanges.subscribe(val => {
      this.procesoDemanda = val;
      this.Form.get('FechaInicio')!.updateValueAndValidity();
      this.Form.get('FechaFin')!.updateValueAndValidity();
    });
  }
  


  onFormSubmit(){
    if (this.Form.valid) {
      console.log(this.Form.value);
      
      if(this.Form.value.Finiquito == 0){
        this.Form.patchValue({
          Finiquito: null
        })
      }
      if(this.Form.value.FondoAhorro == 0){
        this.Form.patchValue({
          FondoAhorro: null
        })
      }
      //
      if(this.Form.value.FechaInicio == ''){
        this.Form.patchValue({
          FechaInicio: null
        })
      }
      if(this.Form.value.FechaFin == ''){
        this.Form.patchValue({
          FechaFin: null
        })
      }

      this._empService.addBajaEmpleado(this.data.NoNomina,this.Form.value).subscribe({
        next: (resp: any) => {
          this._coreService.openSnackBar('Empleado Dado de Baja Satisfactoriamente  *o*', resp);
          this._dialogRef.close(true);
      },
      error: (err: any) => {
          console.error('Error: ' + err);
          this._coreService.openSnackBar('error ' + err);
      }
      });
  }
  }

}
