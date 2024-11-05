import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
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
import { FaltasaddComponent } from '../faltasadd/faltasadd.component';
import { MatDialog } from '@angular/material/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {MatTooltipModule} from '@angular/material/tooltip';


@Component({
  selector: 'app-faltas',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatTabsModule, MatProgressSpinnerModule, MatFormFieldModule, MatButtonModule, MatInputModule,
    MatSelectModule, NgFor, MatIconModule, MatCardModule, MatChipsModule, MatDatepickerModule, ToastModule, TableModule, ButtonModule,
    IconFieldModule, InputIconModule, InputTextModule, NgIf, MatRadioModule, CheckboxModule, ConfirmPopupModule, ConfirmDialogModule,
    MatTooltipModule
  ],
  providers:[FaltasService, EmpleadosService, provideMomentDateAdapter(),{provide: MAT_DATE_LOCALE, useValue: 'es-ES'}, MessageService, ConfirmationService],
  templateUrl: './faltas.component.html',
  styleUrl: './faltas.component.css'
})
export class FaltasComponent implements OnInit {
  empleados: Empleado[] = [];
  allempleados: Empleado[]=[];
  faltasabiertos: Falta[]=[];
  faltascerrados: Falta[]=[];

  NoNomina: number | undefined;
  NoNominaEmpleado: number | undefined;
  Nombre: string | undefined;
  NombrePuesto: string | undefined;
  NombreDepartamento: string | undefined;
  btnagregar:boolean = true;

  @ViewChild('dt2') dt2!: Table;
  @ViewChild('dt3') dt3!: Table;

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



  constructor(private _fb: FormBuilder, private faltaService: FaltasService, private empleadoService: EmpleadosService, private messageService: MessageService,
    private router: Router, private _dialog: MatDialog,private confirmationService: ConfirmationService
  ){

  }

  ngOnInit(): void {

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

    this.faltaService.getFaltasCerrados().subscribe({
      next:(data) => {
        this.faltascerrados = data;
      },
      error:(error) => {
        console.log(error);
      }
    })


    
  }



  findEmpleados(){

    if(this.allempleados.find(empleado => empleado.NoNomina === this.NoNomina)){
      this.btnagregar = false;
      this.empleadoService.getEmpleado(this.NoNomina).subscribe({
        next:(data) => {
          this.empleados = data;
          this.NoNominaEmpleado = this.empleados[0].NoNomina;
          this.Nombre = this.empleados[0].Apellidos +' ' +this.empleados[0].Nombre;
          this.NombrePuesto = this.empleados[0].NombrePuesto;
          this.NombreDepartamento = this.empleados[0].NombreDepartamento;
  
        },
        error:(error) => {
          console.log(error);
        }
      })
    }else{
      this.messageService.add({ severity: 'error', summary: 'No Encontrado', detail: 'Emplado No Encontrado', life: 3000 });
      this.reiniciarValores();
      this.btnagregar = true;
      
    }

    

  }

  reiniciarValores(){
    this.NoNomina = undefined;
    this.NoNominaEmpleado = undefined;
    this.Nombre = undefined;
    this.NombrePuesto = undefined;
    this.NombreDepartamento = undefined;
    this.btnagregar = true;
  }


  filterTable(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.dt2.filterGlobal(inputElement.value, 'contains');
    }
  }
  
  filterTable3(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.dt3.filterGlobal(inputElement.value, 'contains');
    }
  }

  agregarDias(IdFalta: number){

    this.router.navigate(['system/faltasdias/'+IdFalta]);


  }


  agregarForm(){
    const dialog = this._dialog.open(FaltasaddComponent, {
      data: { 
        NoNomina: this.NoNominaEmpleado 
      },
      height: '400px',
      width: '600px'
    });

    dialog.afterClosed().subscribe({
      next:(val: any)=>{
        this.ngOnInit();
        this.reiniciarValores();
      }
    });
  }

  cerrar(IdFalta: number){

    this.confirmationService.confirm({
      message: '¿Quieres cerrar la Falta?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon:"none",
      rejectIcon:"none",
      rejectButtonStyleClass:"p-button-text",
      accept: () => {
        this.faltaService.closefalta(IdFalta).subscribe({
          next:(data) => {
            this.messageService.add({ severity: 'success', summary: 'Cerrada', detail: 'Falta Cerrada Con exito' });
            this.ngOnInit();
          },
          error:(error) => {
            console.log(error);
          }
        })
      },
      reject: () => {
          //this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
  });
  }

  deletefalta(IdFalta: number){
    this.confirmationService.confirm({
      message: '¿Quieres eliminar la falta?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon:"none",
      rejectIcon:"none",
      rejectButtonStyleClass:"p-button-text",
      accept: () => {
        this.faltaService.deleteFalta(IdFalta).subscribe({
          next:(data) => {
            this.messageService.add({ severity: 'success', summary: 'Eliminada con Exito', detail: 'Falta Eliminada Con exito' });
            this.ngOnInit();
          },
          error:(error) => {
            console.log(error);
          }
        })
      },
      reject: () => {
          //this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
  });

  }

}
