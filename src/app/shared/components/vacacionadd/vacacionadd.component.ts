import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ReactiveFormsModule } from '@angular/forms';
import { EmpleadosService } from '../../../../../backend/services/empleados.service';
import { Empleado } from '../../../../../backend/models/empleado.model';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
@Component({
  selector: 'app-vacacionadd',
  standalone: true,
  imports:[RouterModule, MatIconModule, MatButtonModule,CardModule, CommonModule, ButtonModule, FormsModule,
    CalendarModule, ReactiveFormsModule, InputTextModule, InputTextareaModule
  ],
  providers:[],
  templateUrl: './vacacionadd.component.html',
  styleUrls: ['./vacacionadd.component.css']
})
export class VacacionaddComponent implements OnInit {
  employeeForm: FormGroup;
  empleados: Empleado[]=[];
  selectedEmpleado: Empleado | null = null;
  dates: Date[]=[];
  

  constructor(private fb: FormBuilder, private _empleadoService: EmpleadosService) {
    this.employeeForm = this.fb.group({
      NoNomina: ['', Validators.required],
      //position: ['', Validators.required],
      Fecha: ['', Validators.required],
      Comentarios: []
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

    this.employeeForm.get('NoNomina')!.valueChanges.subscribe(value => {
this.infoEmpleado(value);
    })
  }

  infoEmpleado(NoNomina: number){
    const empleado = this.empleados.find(emp => emp.NoNomina === NoNomina);
    this.selectedEmpleado = empleado ? empleado : null;
  };

  formatDateArray(dates: Date[]): string {
    return dates.map(date => this.formatDate(date)).join(', ');
  }

  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
  onSubmit() {
    if (this.employeeForm.valid) {
      //console.log(this.employeeForm.value);
      // Lógica para manejar la inserción del empleado
    }
  }

  limpiarfechas(){
    this.dates = [];
  }

}
