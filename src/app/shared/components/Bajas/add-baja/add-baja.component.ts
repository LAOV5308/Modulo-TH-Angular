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

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

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
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    provideMomentDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    EmpleadosService, provideNativeDateAdapter(), CoreService],
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
  private _adapter: DateAdapter<any>
){
  this.Form = this._fb.group({
    //NoNomina: [{value: ' ', disabled: true}, Validators.required],
    FechaSalida: ['', Validators.required],
    TipoBaja: ['', Validators.required],
    Finiquito: '',
    ProcesoDemanda: [false],
    FechaInicio: [''],
    FechaFin: ['']

  });
  this._adapter.setLocale('en-GB'); // Esto configura el adaptador de fecha para usar el formato de fecha correcto
}

//Opciones de Eleccion
tipoBaja: string[] = [
  'Voluntaria',
  'Involuntaria',
  'Estrategica'
];


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
