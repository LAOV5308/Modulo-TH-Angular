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


import { DepartamentosService } from '../../../../../../backend/services/departamentos.service';

import { PuestosService } from '../../../../../../backend/services/puestos.service';
import { Empleado } from '../../../../../../backend/models/empleado.model';
import { Router } from '@angular/router';
import { IncidenciasService } from '../../../../../../backend/services/incidencias.service';
import { MessageConfirmCheckBoxComponent } from './message-confirm-check-box/message-confirm-check-box.component';

import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


//Fecha Español
import 'moment/locale/es';

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
    CommonModule,
    HttpClientModule,
    MatIcon,
    MessageConfirmCheckBoxComponent,
    FormsModule,
    MatCheckboxModule,
    ToastModule
  ],
  providers:[
    provideMomentDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
  EmpleadosService, CoreService, DepartamentosService, PuestosService, IncidenciasService, MessageService
  ],
  templateUrl: './add-incidencia.component.html',
  styleUrl: './add-incidencia.component.css'
})
export class AddIncidenciaComponent implements OnInit{
  incidenciaForm: FormGroup;
  empleados: Empleado[]=[];
  enter: boolean = false;
  selectedEmpleado: Empleado | null = null;
  selectedValue: string | null = null;

  motivos: string[] = [
    'Falta',
    'Enfermedad General',
    'Maternidad', 
    'Trayecto',
    'Probable Riesgo de Trabajo'
  ];

  constructor(private fb: FormBuilder, private _incidenciasService: IncidenciasService, 
    //private _coreService: CoreService,
    private _dialogRef: MatDialogRef<AddIncidenciaComponent>,
    private router: Router,
    private _empleadoService: EmpleadosService,
    private dialog: MatDialog,
    private messageService: MessageService
  ) {
    this.incidenciaForm = this.fb.group({
      NoNomina: ['', Validators.required],
      Motivo: ['', Validators.required],
      FechaInicio: ['', Validators.required],
      FechaFin: ['', Validators.required],
      CategoriaIncidencia: ['', Validators.required],
      FolioAlta: [''],
      FolioBaja: ['']
    });
  }

  ngOnInit(): void {
    this._empleadoService.getEmpleadosAll().subscribe({
      next: (data) => {
        this.empleados = data;
      },
      error: (error) => {
        console.error('Error al cargar los empleados', error);
      }

    });

    this.incidenciaForm.get('NoNomina')!.valueChanges.subscribe(value => {
      this.updateEmployeeInfo(value);
    });
    
  }

  updateEmployeeInfo(nomina: number): void {
    const empleado = this.empleados.find(emp => emp.NoNomina === nomina);
    this.selectedEmpleado = empleado ? empleado : null;
  }
  

  onSubmit(): void {
    this.enter = false;

    this.empleados.forEach(element => {
      if(element.NoNomina == this.incidenciaForm.value.NoNomina){
        this.enter = true;
      }
    });

    
      if (this.incidenciaForm.valid) {

        if(this.enter){
        console.log(this.incidenciaForm.value);
        this._incidenciasService.addIncidencias(this.incidenciaForm.value).subscribe({
          next: (resp: any) => {
              
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Incidencia added successfully' });
              this._dialogRef.close(true);
              //this.router.navigate(['/empleados'])
          },
          error: (err: any) => {
              console.error('Error: ' + err);
              //this._coreService.openSnackBar('Error al agregar Incidencia');
          }
      });
      
    }else{
      
      this.messageService.add({ severity: 'info', summary: 'No Encontrado', detail: 'NoNomina NO-Encontrado' });
      this.incidenciaForm.patchValue({
        NoNomina: null,
      });


    }
      }else{
       
        this.messageService.add({ severity: 'info', summary: 'Campos Faltantes', detail: 'Por favor, complete el formulario correctamente' });
      }


  }

  
}
