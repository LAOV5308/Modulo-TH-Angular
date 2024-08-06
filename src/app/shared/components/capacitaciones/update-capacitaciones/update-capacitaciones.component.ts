import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router, RouterModule } from '@angular/router';// Importante para manejar la navegación
import { CatalogoCapacitacionService } from '../../../../../../backend/ConexionDB/catalogocapacitacion.service';
import { CardModule } from 'primeng/card';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SplitterModule } from 'primeng/splitter';
import { CalendarModule } from 'primeng/calendar';
import { Empleado } from '../../../../../../backend/models/empleado.model';
import { CapacitacionCatalogo } from '../../../../../../backend/models/capacitacioncatalogo.model';
import { CapacitacionProgramada } from '../../../../../../backend/models/capacitacion.model';
import { ColorPickerModule } from 'primeng/colorpicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-update-capacitaciones',
  standalone: true,
  imports: [CommonModule, RouterModule, CardModule, MatButtonModule, MatIconModule, MatButtonModule,
    FormsModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, SplitterModule, CalendarModule, ColorPickerModule,
    MatCheckboxModule, MatInputModule

  ],
  providers:[CatalogoCapacitacionService],
  templateUrl: './update-capacitaciones.component.html',
  styleUrl: './update-capacitaciones.component.css'
})
export class UpdateCapacitacionesComponent implements OnInit{
  IdProgramacionCapacitacion!: number;
  employeeForm: FormGroup;
  hoy = new Date();
  fechaStart: Date = this.hoy;

  sourceEmpleados!: Empleado[];
  targetEmpleados!: Empleado[];
  //Capacitacoiones Programadas
  capacitacionesprogramadas: CapacitacionProgramada[]=[];

  capacitaciones: CapacitacionCatalogo[] = [];
  capacitacionesFiltradas: CapacitacionCatalogo[] = [];


  capacitacionesFiltrada: string = '';
  NombreCapacitaciones: string[] =[];
  minDate: Date | undefined;
  capacitacionSeleccionada: any;
    filteredCapacitaciones!: any[];
    selectedFrecuencia: string = 'Diaria';
    checked: boolean = false;



  frecuencias: string[]=[
    'Diaria',
    'Semanal',
    'Mensual',
    'Anual'
  ];
  origen: string[]=[
    'Interna', 'Externa'
  ];

  constructor(private route: ActivatedRoute, private capacitacionesService: CatalogoCapacitacionService,
    private fb: FormBuilder,
  ){
    this.employeeForm = this.fb.group({
      Color:['', Validators.required],
      Evaluacion:[''],
      NombreCapacitacion:['', Validators.required],
      Origen:['', Validators.required],
      Frecuencia:['', Validators.required],
      FechaInicio: ['', Validators.required],
      FechaFin: [''],
      HoraInicio: [''],
      HoraFin: [''],
      PersonaImparte:[''],
      Comentarios:[''],
    });

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('IdProgramacionCapacitacion')){
        this.IdProgramacionCapacitacion = Number(paramMap.get('IdProgramacionCapacitacion'));
      }
    });

    this.capacitacionesService.getsingleProgramacionCapacitacion(this.IdProgramacionCapacitacion).subscribe({
      next: (data) => {
        this.capacitacionesprogramadas = data;
        this.employeeForm.patchValue(this.capacitacionesprogramadas[0]);
        /*
        FALTAN LOS FORMATOS DE FECHA
        this.employeeForm.patchValue({
          FechaInicio: this.capacitacionesprogramadas[0].FechaInicio
            });*/

    


      },
      error: (error) => {
        console.error('Error al cargar las Capacitaciones', error);
      }
    });

  }

  onSubmit(){

  }

}
