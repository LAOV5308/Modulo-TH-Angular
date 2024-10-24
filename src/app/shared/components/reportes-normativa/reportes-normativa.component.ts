import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
//Fecha Español
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import {MAT_DATE_LOCALE, MatOptionModule} from '@angular/material/core';
import 'moment/locale/es';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { EmpleadosService } from '../../../../../backend/services/empleados.service';
import { Empleado } from '../../../../../backend/models/empleado.model';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ReportesService } from '../../../../../backend/services/reportes.service';
import { Reporte } from '../../../../../backend/models/reporte.model';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

import { Table } from 'primeng/table';  
import { Router } from '@angular/router';// Importante para manejar la navegación
import {MatChipsModule} from '@angular/material/chips';
import { ReportesnormativaupdateComponent } from '../reportesnormativaupdate/reportesnormativaupdate.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';

import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-reportes-normativa',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatProgressSpinnerModule, MatDatepickerModule, MatFormFieldModule,
    MatInputModule, ToastModule,NgIf,MatOptionModule, MatSelectModule, MatButtonModule,
TableModule, ButtonModule, IconFieldModule, InputIconModule, InputTextModule, ConfirmDialogModule, MatChipsModule, ReportesnormativaupdateComponent,
MatTabsModule
  ],
  providers:[provideMomentDateAdapter(),{provide: MAT_DATE_LOCALE, useValue: 'es-ES'}, MessageService, EmpleadosService, ReportesService, ConfirmationService],
  templateUrl: './reportes-normativa.component.html',
  styleUrl: './reportes-normativa.component.css'
})
export class ReportesNormativaComponent implements OnInit{
  NoNomina!: number | undefined;
  NoNominaEmpleado: number | undefined;
  Nombre: string | undefined;
  NombrePuesto: string | undefined;
  NombreDepartamento: string | undefined;

empleados:Empleado[]=[];
reportes: Reporte[]=[];
Form: FormGroup;
@ViewChild('dt2') dt2!: Table;

Motivo: string[] = [
  'Enfermedad', 
  'Trámite', 
  'Asunto familiar', 
  'Otro'
];
Sancion: string[] = [
  'N/A',
  'Acta administrativa', 
  'Baja',
  'Descanso',
  'Horas extras', 
  'Servicio comunitario', 
  'Rescisión contratual'
];

Estatus: string[] = [
  'Justificada', 'Injustificada'
];

NivelSancion: string[]=[
  'Cumplida', 
  'En proceso', 
  'Baja', 
  'N/A', 
  'Enterad@', 
  'Notificar', 
  'Incapacidad', 'Suspension'
]


  constructor(private messageService: MessageService, private empleadosService: EmpleadosService, private _fb: FormBuilder, private reportesService: ReportesService,
    private confirmationService: ConfirmationService, public dialog: MatDialog 
  ){

    this.Form = this._fb.group({
      NoNomina: [''],
      MotivoReporte: ['', Validators.required],
      PersonaReporto: ['', Validators.required],
      FechaReporte: ['', Validators.required],
      SancionAplicada: ['', Validators.required],
      NotasTalentoHumano:[''],
    });
  }

  ngOnInit(): void {
    this.reportesService.getReportes().subscribe({
      next:(data)=>{
        console.log(data);
        this.reportes = data;
        console.log(this.reportes);
      },
      error:(error)=>{
        console.log(error);
      }
    })
    
  }
  consultaempleado(){
    this.empleadosService.getEmpleado(this.NoNomina).subscribe({
      next:(data)=>{  
        console.log(data);
        this.empleados = data;

        if(this.empleados.length>=1){
          this.NoNominaEmpleado = this.empleados[0].NoNomina;
          this.Nombre = this.empleados[0].Apellidos +' ' +this.empleados[0].Nombre;
          this.NombrePuesto = this.empleados[0].NombrePuesto;
          this.NombreDepartamento = this.empleados[0].NombreDepartamento;
        }else{
          this.NoNominaEmpleado = undefined;
          this.Nombre = undefined;
          this.NombrePuesto = undefined;
          this.NombreDepartamento = undefined;
        }

        
        
      },
      error:(error)=>{
        console.log(error);
      }
      
    })

  }

  addReporte(){
if(this.Form.valid){

  this.Form.patchValue({
    NoNomina: this.NoNomina
  })

  console.log(this.Form.value);

  this.reportesService.addReporte(this.Form.value).subscribe({
    next:(data)=>{
      this.messageService.add({ severity: 'success', summary: 'Agregado con Exito', detail: 'Reporte Agregado Con exito' });
      this.ngOnInit();
      this.reiniciarValores();
    },
    error:(error)=>{
      console.log(error);
    }
  })

  
}else{
alert('Faltan Campos');
}
  }

  deleteReporte(IdReporte: number){
    this.confirmationService.confirm({
      message: '¿Quieres eliminar Reporte?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon:"none",
      rejectIcon:"none",
      rejectButtonStyleClass:"p-button-text",
      accept: () => {
        this.reportesService.deleteReporte(IdReporte).subscribe({
          next:(data)=>{
            this.messageService.add({ severity: 'success', summary: 'Eliminado con Exito', detail: 'Reporte Eliminado Con exito' });
            this.ngOnInit();
            this.reiniciarValores();
          },
          error:(error)=>{
            console.log(error);
          }
        })
      },
      reject: () => {
          //this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
  });

  }


  editarReporte(IdReporte: number) {
    const dialogRef = this.dialog.open(ReportesnormativaupdateComponent, {
      data: { IdReporte: IdReporte },
      height: '350px',
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
      this.ngOnInit();
    });
  }


  filterTable(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.dt2.filterGlobal(inputElement.value, 'contains');
    }
  }

  reiniciarValores(){
    this.Form.reset();
    this.NoNomina = undefined;
    this.NoNominaEmpleado = undefined;
    this.Nombre = undefined;
    this.NombrePuesto = undefined;
    this.NombreDepartamento = undefined;
  }

}
