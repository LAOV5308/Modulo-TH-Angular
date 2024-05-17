import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import { HeaderComponent } from '../../header/header.component';
import { CoreService } from '../../../../Core/core.service';
import { EmpleadosService } from '../../../../../../backend/ConexionDB/empleados.service';

import { CommonModule } from '@angular/common';

import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS} from '@angular/material/core';
import 'moment/locale/fr';
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
  selector: 'app-add-empleado',
  standalone: true,
  imports: [MatFormFieldModule,
    MatDialogModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatExpansionModule,
    MatCardModule,
    HeaderComponent,
    CommonModule,
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    provideMomentDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  EmpleadosService, provideNativeDateAdapter(),CoreService],
    
  templateUrl: './add-empleado.component.html',
  styleUrl: './add-empleado.component.css'
})
export class AddEmpleadoComponent implements OnInit {
  employeeForm: FormGroup;

  constructor(private fb: FormBuilder) { 
    this.employeeForm = this.fb.group({
      //Informacion Personal
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      sexo:[''],
      estadocivil:[''],
      fechanacimiento:[''],
      entidadnacimiento:[''],
      ciudadnacimiento:[''],
      curp:[''],
      rfc:[''],
      nss:[''],
      umf:[''],
      //Informacion Laboral
      // Define otros controles de formulario aquí
      noNomina: ['', Validators.required],
      nivel:[''],
      iddepartamento:[''],
      idpuesto:[''],
      responsable:[''],
      tipoingreso:[''],
      ingreso:[''],
      horariosemanal:[''],

      //Domicilio
      domicilioine:['', Validators.required],
      poblacion:[''],
      entidaddireccion:[''],
      cp:[''],
      correoElectronico: ['', [Validators.required, Validators.email]],
      numerotelefono1:[''],
      numerotelefono2:[''],

      //Contacto de Emergencia
      beneficiario: ['', Validators.required],
      parentesco:[''],
      fechanacimientobeneficiario:[''],
      numerotelefonoemergencia:[''],
      // Añadir más controles de formulario aquí
    });
  }

  ngOnInit(): void {
    
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      console.log(this.employeeForm.value);
    }
}

}
