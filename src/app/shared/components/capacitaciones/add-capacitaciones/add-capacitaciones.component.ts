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
import { CoreService } from '../../../../Core/core.service';
import { EmpleadosService } from '../../../../../../backend/services/empleados.service';
import { Departamento } from '../../../../../../backend/models/departamento.model';
import { Puesto } from '../../../../../../backend/models/puesto.model';
import { CommonModule } from '@angular/common';

import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS} from '@angular/material/core';
import { HttpClientModule} from '@angular/common/http';
import { MatIcon } from '@angular/material/icon';


import 'moment/locale/fr';
import { DepartamentosService } from '../../../../../../backend/services/departamentos.service';

import { PuestosService } from '../../../../../../backend/services/puestos.service';
import { Empleado } from '../../../../../../backend/models/empleado.model';
import { Router } from '@angular/router';
import { IncidenciasService } from '../../../../../../backend/services/incidencias.service';
import { CapacitacionService } from '../../../../../../backend/services/capacitacion.service';
import { error } from 'console';


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
  selector: 'app-add-capacitaciones',
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
    CommonModule,
    HttpClientModule,
    MatIcon
  ],
  providers:[
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    provideMomentDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  EmpleadosService, provideNativeDateAdapter(),CoreService, DepartamentosService, PuestosService, CapacitacionService
  ],
  templateUrl: './add-capacitaciones.component.html',
  styleUrl: './add-capacitaciones.component.css'
})
export class AddCapacitacionesComponent implements OnInit{
  capacitacionForm: FormGroup;
  empleados: Empleado[]=[];
  //capacitacionesCatalogo: CapacitacionCatalogo[]=[]; 
  NombreCapacitaciones: string[]=[];
  enter: boolean = false;
  selectedEmpleado: Empleado | null = null;


  valoracion: string[]=[
    'Aprobado', 'No Aprobado', 'N/A'
  ];

  ngOnInit(): void {
    this._empleadoService.getEmpleados().subscribe({
      next:(data) => {
        this.empleados = data
      },
      error: (error) => {
        console.error('Error al cargar los empleados ', error)
      }
    });

    
    this.capacitacionForm.get('NoNomina')!.valueChanges.subscribe(value => {
      this.updateEmployeeInfo(value);
    });

    /*this._catalogocapacitacionesService.getCatalogoCapacitaciones().subscribe({
      next:(data) => {
        this.capacitacionesCatalogo = data
        this.capacitacionesCatalogo.forEach(element => {
          this.NombreCapacitaciones.push(element.NombreCapacitacion);
        });
      },
      error: (error) => {
        console.error('Error al cargar las Capacitaciones del Catalogo ', error)
      }
    })*/
    
  }

  updateEmployeeInfo(nomina: number): void {
    const empleado = this.empleados.find(emp => emp.NoNomina === nomina);
    this.selectedEmpleado = empleado ? empleado : null;
  }

  constructor(private fb: FormBuilder, private _coreService: CoreService,
    private _dialogRef: MatDialogRef<AddCapacitacionesComponent>,
    private router: Router,
    private _empleadoService: EmpleadosService,
    private _catalogocapacitacionesService: CapacitacionService,
    private dialog: MatDialog
  ) {
    this.capacitacionForm = this.fb.group({
      NoNomina: ['', Validators.required],
      NombreCapacitacion: ['', Validators.required],
      FechaCapacitacion: ['', Validators.required],
      CalificacionCapacitacion: ['', Validators.required],
      ValoracionCapacitacion: ['', Validators.required],
    });
  }


  onSubmit(): void {
    this.enter = false;

    this.empleados.forEach(element => {
      if(element.NoNomina == this.capacitacionForm.value.NoNomina){
        this.enter = true;
      }
    });

    
      if (this.capacitacionForm.valid) {
        console.log('Form Incidencia');
        console.log(this.capacitacionForm.value);

        if(this.enter){
        this._empleadoService.addCapacitaciones(this.capacitacionForm.value).subscribe({
          next: (resp: any) => {
              this._coreService.openSnackBar('Capacitacion added successfully', resp);
              this._dialogRef.close(true);
              //this.router.navigate(['/empleados'])
          },
          error: (err: any) => {
              console.error('Error: ' + err);
              this._coreService.openSnackBar('Error al agregar Capacitacion');
          }
      });
      
    }else{
      this._coreService.openSnackBar('NoNomina NO-Encontrado/No-Activo');
      this.capacitacionForm.patchValue({
        NoNomina: null,
      });


    }
      }else{
        this._coreService.openSnackBar('Por favor, complete el formulario correctamente');
      }


  }

}
