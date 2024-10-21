import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FaltasService } from '../../../../../backend/services/faltas.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { EmpleadosService } from '../../../../../backend/services/empleados.service';
import { MatSelectModule } from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { Empleado } from '../../../../../backend/models/empleado.model';

//Fecha Español
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import 'moment/locale/es';

import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

import { Table } from 'primeng/table';  
import { Falta } from '../../../../../backend/models/falta.model';
import { Router } from '@angular/router';// Importante para manejar la navegación

import {MatRadioModule} from '@angular/material/radio';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-faltasadd',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatTabsModule, MatProgressSpinnerModule, MatFormFieldModule, MatButtonModule, MatInputModule,
    MatSelectModule, NgFor, MatIconModule, MatCardModule, MatChipsModule, MatDatepickerModule, ToastModule, TableModule, ButtonModule,
    IconFieldModule, InputIconModule, InputTextModule, NgIf, MatRadioModule
  ],
  providers:[FaltasService, EmpleadosService, provideMomentDateAdapter(),{provide: MAT_DATE_LOCALE, useValue: 'es-ES'}, MessageService],
  templateUrl: './faltasadd.component.html',
  styleUrl: './faltasadd.component.css'
})
export class FaltasaddComponent implements OnInit {

  empleados: Empleado[] = [];
  allempleados: Empleado[]=[];
  faltasabiertos: Falta[]=[];
  faltascerrados: Falta[]=[];
  Form: FormGroup;
  NoNomina: number | undefined;
  NoNominaEmpleado: number | undefined;
  Nombre: string | undefined;
  NombrePuesto: string | undefined;
  NombreDepartamento: string | undefined;

  @ViewChild('dt2') dt2!: Table;


  Motivo: string[] = [
    'Enfermedad', 
    'Trámite', 
    'Asunto familiar', 
    'Otro'
  ];
  Sancion: string[] = [
    'Horas extras', 
    'Servicio comunitario', 
    'Descanso', 
    'Rescisión contratual', 
    'Acta administrativa', 
    'Baja'
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



  constructor(private _fb: FormBuilder, private faltaService: FaltasService, private empleadoService: EmpleadosService, private messageService: MessageService,
    private router: Router, private _dialogRef: MatDialogRef<FaltasaddComponent>,@Inject(MAT_DIALOG_DATA) public data: {NoNomina: number}
  ){
    this.Form = this._fb.group({
      NoNomina: [''],
      FechaFalta: ['', Validators.required],
      Motivo: ['', Validators.required],
      Sancion: ['', Validators.required],
      Estatus: [''],
      NivelSancion:[''],
      HorasExtras:[''],
      Comentario:['']
    });
  }


  ngOnInit(): void {

    this.NoNomina = this.data.NoNomina;

    this.empleadoService.getEmpleadosAll().subscribe({
      next:(data) => {
        this.allempleados = data;
      },
      error:(error) => {
        console.log(error);
      }
    })

    this.faltaService.getFaltasAbiertos().subscribe({
      next:(data) => {
        this.faltasabiertos = data;
      },
      error:(error) => {
        console.log(error);
      }
    })
    
  }


  addFalta(){

    if(this.Form.valid && this.NoNomina){
      this.Form.patchValue({
        NoNomina: this.NoNomina
      })

      if(this.Form.get('Sancion')?.value == 'Horas extras'){
        this.Form.patchValue({
          HorasExtras: true
        })
      }else{
        this.Form.patchValue({
          HorasExtras: false
        })
      }
      
      console.log(this.Form.value);

      this.faltaService.addFalta(this.Form.value).subscribe({
        next:(data) => {
          this.messageService.add({ severity: 'success', summary: 'Creada', detail: 'Falta Creada Con exito' });
          /*this.ngOnInit();*/
          this.reiniciarValores();
        },
        error:(error) => {
          console.log(error);
        },
      })


    }else{
      this.messageService.add({ severity: 'error', summary: 'Campos Faltantes', detail: 'Existen Campos Faltantes (No.Nomina Empleado, detalles, etc)' });
    }

  }
  
  reiniciarValores(){
    this._dialogRef.close(true);
  }

}
