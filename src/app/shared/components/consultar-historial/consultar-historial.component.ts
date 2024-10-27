import { Component, OnInit } from '@angular/core';

import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import { EmpleadosService } from '../../../../../backend/services/empleados.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { BajasService } from '../../../../../backend/services/bajas.service';
import { Baja } from '../../../../../backend/models/baja.model';
import { Empleado } from '../../../../../backend/models/empleado.model';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import {FormGroup, FormBuilder, Validators, FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IncidenciaB } from '../../../../../backend/models/incidencia.model';
import { IncidenciasService } from '../../../../../backend/services/incidencias.service';
import { FechaVacacion } from '../../../../../backend/models/vacacion.model';
import { VacacionesService } from '../../../../../backend/services/vacaciones.service';

@Component({
  selector: 'app-consultar-historial',
  standalone: true,
  imports: [IconFieldModule, InputIconModule, InputTextModule, MatTabsModule, MatIconModule, ToastModule,
    TableModule, CommonModule, MatFormFieldModule, FormsModule,
    ReactiveFormsModule
  ],
  providers:[EmpleadosService, MessageService, BajasService, IncidenciasService, VacacionesService],
  templateUrl: './consultar-historial.component.html',
  styleUrl: './consultar-historial.component.css'
})
export class ConsultarHistorialComponent implements OnInit{
  bajaForm: FormGroup;
  Nombre!: string;
  NombrePuesto!: string;
  NombreDepartamento!: string;
  bajas: Baja[] = [];
  empleados: Empleado[] = [];
  incidencias: IncidenciaB[]=[];
  ultimo: number = 0;
  empleadosA: Empleado[]=[];
  vacaciones: FechaVacacion[]=[];

  constructor(private empleadosService: EmpleadosService, 
    private messageService: MessageService, private bajasService: BajasService,
    private fb: FormBuilder, private incidenciasService: IncidenciasService, private vacacionesService: VacacionesService
  ){
    this.bajaForm = this.fb.group({
      NoNomina: ['']
    });

  }

  ngOnInit(): void {
    this.empleadosService.getEmpleadosAll().subscribe({
      next:(data)=>{
        this.empleados = data;
      },
      error: (error) => {
        console.error('Error al cargar las Bajas', error);
      }
    });

    this.bajaForm.get('NoNomina')!.valueChanges.subscribe(value => {
      this.obtener(value);
    });

    
    
  }

  addOneDay(dateString: string): Date {
    const fecha = new Date(dateString);
    fecha.setDate(fecha.getDate() + 1);
    return fecha;
  }

  obtener(NoNomina: any){
    
    this.Nombre='';
    this.NombreDepartamento='';
    this.NombrePuesto='';
    
      this.empleadosService.getEmpleado(NoNomina).subscribe({
        next:(data) =>{
          this.empleadosA = data;
          //console.log(this.empleadosA);

          //this.empleados = data;
          /*this.ultimo = this.bajas.length-1;*/
          if(this.empleadosA.length>0){
          this.Nombre = this.empleadosA[0].Apellidos+ ' '+this.empleadosA[0].Nombre+'';
          this.NombrePuesto = this.empleadosA[0].NombrePuesto;
          this.NombreDepartamento = this.empleadosA[0].NombreDepartamento;
          }
        
    }
  
      });


    
    this.bajasService.getBajas(NoNomina).subscribe({
      next:(data) =>{
        this.bajas = data;
        /*this.ultimo = this.bajas.length-1;
        this.Nombre = this.bajas[this.ultimo].Nombre+ ' '+this.bajas[this.ultimo].Apellidos;
        this.NombrePuesto = this.bajas[this.ultimo].NombrePuesto;
        this.NombreDepartamento = this.bajas[this.ultimo].NombreDepartamento;*/
      },
      error: (error) => {
        console.error('Error al cargar las Bajas', error);
      }
    
    });

    this.bajasService.getIncidencias(NoNomina).subscribe({
      next:(data) =>{
        this.incidencias = data;
        //console.log(this.incidencias);
      },
      error: (error) => {
        console.error('Error al cargar las Bajas', error);
      }
    });

    this.vacacionesService.getFechasVacaciones(NoNomina).subscribe({
      next:(data) =>{
        this.vacaciones = data;
        //console.log(this.incidencias);
      },
      error: (error) => {
        console.error('Error al cargar las vacaciones', error);
      }
    })

    //this.messageService.add({ severity: 'success', summary: 'Success', detail: NoNomina });
  }




}
