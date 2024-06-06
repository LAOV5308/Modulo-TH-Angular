import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
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
import { Departamento } from '../../../../../../backend/models/departamento.model';
import { Puesto } from '../../../../../../backend/models/puesto.model';

import { CommonModule } from '@angular/common';

import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS} from '@angular/material/core';
import { HttpClientModule} from '@angular/common/http';
import { MatIcon } from '@angular/material/icon';


import 'moment/locale/fr';
import { DepartamentosService } from '../../../../../../backend/ConexionDB/departamentos.service';

import { PuestosService } from '../../../../../../backend/ConexionDB/puestos.service';
import { Empleado } from '../../../../../../backend/models/empleado.model';
import { Router } from '@angular/router';
import { IncidenciasService } from '../../../../../../backend/ConexionDB/incidencias.service';


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
  selector: 'app-add-incidencia',
  standalone: true,
  imports: [
    MatFormFieldModule,
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
    HttpClientModule,
    MatIcon,
  ],
  providers:[
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    provideMomentDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  EmpleadosService, provideNativeDateAdapter(),CoreService, DepartamentosService, PuestosService, IncidenciasService
  ],
  templateUrl: './add-incidencia.component.html',
  styleUrl: './add-incidencia.component.css'
})
export class AddIncidenciaComponent implements OnInit{
  incidenciaForm: FormGroup;
  motivos: string[] = [
    'Maternidad', 
    'Trayecto', 
    'Enfermedad General', 
    'ST2 (Alta)', 
    'ST7'
  ];

  constructor(private fb: FormBuilder, private _incidenciasService: IncidenciasService, private _coreService: CoreService,
    private _dialogRef: MatDialogRef<AddIncidenciaComponent>,
    private router: Router
  ) {
    this.incidenciaForm = this.fb.group({
      NoNomina: ['', Validators.required],
      Motivo: ['', Validators.required],
      FechaInicio: ['', Validators.required],
      FechaFin: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    
  }

  onSubmit(): void {
    if (this.incidenciaForm.valid) {
      console.log(this.incidenciaForm.value);

      this._incidenciasService.addIncidencias(this.incidenciaForm.value).subscribe({
        next: (resp: any) => {
            this._coreService.openSnackBar('Incidencia added successfully', resp);
            this._dialogRef.close(true);
            //this.router.navigate(['/empleados'])
        },
        error: (err: any) => {
            console.error('Error: ' + err);
            this._coreService.openSnackBar('Error al agregar Incidencia');
        }
    });
    }else{
      this._coreService.openSnackBar('Por favor, complete el formulario correctamente');
    }

  }
}