import { Component, OnInit, Inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
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
import { MessageConfirmCheckBoxComponent } from '../add-incidencia/message-confirm-check-box/message-confirm-check-box.component';



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
  selector: 'app-update-incidencia',
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
    MessageConfirmCheckBoxComponent
  ],
  providers:[
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    provideMomentDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  EmpleadosService, provideNativeDateAdapter(),CoreService, DepartamentosService, PuestosService, IncidenciasService,
  ],
  templateUrl: './update-incidencia.component.html',
  styleUrl: './update-incidencia.component.css'
})
export class UpdateIncidenciaComponent implements OnInit{
  incidenciaForm: FormGroup;
  empleados: Empleado[]=[];
  enter: boolean = false;
  selectedEmpleado: Empleado | null = null;

  motivos: string[] = [
    'Maternidad', 
    'Trayecto', 
    'Enfermedad General', 
    'ST2 (Alta)', 
    'ST7'
  ];

  constructor(private fb: FormBuilder, private _incidenciasService: IncidenciasService, private _coreService: CoreService,
    private _dialogRef: MatDialogRef<UpdateIncidenciaComponent>,
    private router: Router,
    private _empleadoService: EmpleadosService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.incidenciaForm = this.fb.group({
      NoNomina: [{value: '', disabled:true}],
      //NoNomina: ['', Validators.required],
      Motivo: ['', Validators.required],
      FechaInicio: ['', Validators.required],
      FechaFin: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this._empleadoService.getEmpleados().subscribe({
      next: (data) => {
        this.empleados = data;
      },
      error: (error) => {
        console.error('Error al cargar los empleados', error);
      }

    });

    //this.incidenciaForm.patchValue(this.data);


    this.incidenciaForm.patchValue({
      NoNomina: this.data.NoNomina,
      Motivo: this.data.Motivo,
      FechaInicio: this.incrementarUnDia(new Date(this.data.FechaInicio)),
        FechaFin: this.incrementarUnDia(new Date(this.data.FechaFin))
    });

    console.log(this.data.NoNomina);
    this.updateEmployeeInfo(this.data.NoNomina);

    this.incidenciaForm.get('NoNomina')!.valueChanges.subscribe(value => {
      this.updateEmployeeInfo(value);
    });
    


    
    //console.log('Data'+this.data.NombreCompleto);

  }

  updateEmployeeInfo(nomina: number): void {
    const empleado = this.empleados.find(emp => emp.NoNomina === nomina);
    this.selectedEmpleado = empleado ? empleado : null;
  }

  //Incrementar un dia
  incrementarUnDia(fecha: Date): Date {
    fecha.setDate(fecha.getDate() + 1);
    return fecha;
  }


  onSubmit(): void {
    
      if (this.incidenciaForm.valid) {
        console.log(this.incidenciaForm.value);

          
        this._incidenciasService.updateIncidencia(this.data.IdIncidencias ,this.incidenciaForm.value).subscribe({
          next: (resp: any) => {
              this._coreService.openSnackBar('Incidencia actualizado successfully', resp);
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
