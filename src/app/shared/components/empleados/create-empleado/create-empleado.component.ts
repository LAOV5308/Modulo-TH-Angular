import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmpleadosService } from '../../../../../../backend/ConexionDB/empleados.service';
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


@Component({
  selector: 'app-create-empleado',
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
NgFor
  ],
  providers: [EmpleadosService, provideNativeDateAdapter(), CoreService],
  templateUrl: './create-empleado.component.html',
  styleUrl: './create-empleado.component.css'
})
export class CreateEmpleadoComponent implements OnInit {
  empForm: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _empService: EmpleadosService,
    private _dialogRef: MatDialogRef<CreateEmpleadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ){
    this.empForm = this._fb.group({
      NumeroNomina: '',
      NombreEmpleado: '',
      NombreDepartamento: '',
      NombrePuesto: '',
      Ingreso: '',
      HorarioSemanal: '',
      TipoIngreso: ''
    });
  }

  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];
  departamentos: string[] = [
    'Calidad/Sanidad',
    'Mantenimiento',
    'Diseño y Desarrollo',
    'T-H',
    'Contraloria',
    'Produccion',
    'Comercializacion',
    'Subdireccion'
  ];
  puestos: string[] = [
    'Coordinador',
    'Gestor Documental',
    'Fisico Quimico',
    'Promotoria',
    'Tecnico de Mantenimiento'
  ];
  horariosemanal: string[] = [
    '6:00- 14:00',
    '14:00 -22:00',
    '22:00 -6:00',
    '9:00- 17:00',
    '9:00 - 18:00',
    '6:00 - 14:00',
    '6:00 - 11:00',
    '9:00- 14:00'
  ];

  ngOnInit(): void {
    //this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
        let formData = {
            ...this.empForm.value,
            Ingreso: this.empForm.value.Ingreso.toISOString().slice(0, 10) // Formato 'YYYY-MM-DD'
        };
        this._empService.addEmpleados(formData).subscribe({
            next: () => {
                this._coreService.openSnackBar('Employee added successfully');
                this._dialogRef.close(true);
            },
            error: (err: any) => {
                console.error('Error: ' + err);
            }
        });
    }
}


}
