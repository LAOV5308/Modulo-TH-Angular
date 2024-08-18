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
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
@Component({
  selector: 'app-update-capacitaciones',
  standalone: true,
  imports: [CommonModule, RouterModule, CardModule, MatButtonModule, MatIconModule, MatButtonModule,
    FormsModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, SplitterModule, CalendarModule, ColorPickerModule,
    MatCheckboxModule, MatInputModule, ToastModule, ConfirmDialogModule

  ],
  providers:[CatalogoCapacitacionService, ConfirmationService, MessageService],
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
    selectedFrecuencia: string = '1 Dia';
    checked: boolean = false;

  frecuencias: string[]=[
    '1 Dia',
    'Más de 1 Dia'
  ];
  origen: string[]=[
    'Interna', 'Externa'
  ];

  constructor(private route: ActivatedRoute, private capacitacionesService: CatalogoCapacitacionService,
    private fb: FormBuilder, private confirmationService: ConfirmationService, private messageService: MessageService
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

    this.employeeForm.get('Frecuencia')?.valueChanges.subscribe(value => {
      this.selectedFrecuencia = value;
      this.updateFechaFieldsVisibility();
    });
    this.updateFechaFieldsVisibility();

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('IdProgramacionCapacitacion')){
        this.IdProgramacionCapacitacion = Number(paramMap.get('IdProgramacionCapacitacion'));
      }
    });

    this.capacitacionesService.getsingleProgramacionCapacitacion(this.IdProgramacionCapacitacion).subscribe({
      next: (data) => {
        this.capacitacionesprogramadas = data;
        console.log(this.capacitacionesprogramadas[0]);
        this.employeeForm.patchValue(this.capacitacionesprogramadas[0]);

      
        this.employeeForm.patchValue({
          FechaInicio: this.getFechaConDiaMas(this.capacitacionesprogramadas[0].FechaInicio),
          HoraInicio: this.getFechaConDiaMas(this.capacitacionesprogramadas[0].HoraInicio),
          HoraFin: this.getFechaConDiaMas(this.capacitacionesprogramadas[0].HoraFin)
            });
            
            console.log(this.employeeForm.value);
    


      },
      error: (error) => {
        console.error('Error al cargar las Capacitaciones', error);
      }
    });

  }
  updateFechaFieldsVisibility() {
    if (this.selectedFrecuencia === '1 Dia') {
      this.employeeForm.get('FechaFin')?.reset();
    }
  }

  getFechaConDiaMas(fecha: Date): Date {
    const nuevaFecha = new Date(fecha);
    nuevaFecha.setDate(nuevaFecha.getDate() + 1); // Agregar un día
    return nuevaFecha;
 }

  onSubmit(){

    

    this.confirmationService.confirm({
      message: '¿Esta Seguro que quiere actualizar la Capacitación?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        console.log(this.employeeForm.value);

        console.log(this.getFecha(this.employeeForm.value.FechaInicio));
        /*
        this.capacitacionesService.updateCapacitacion(this.IdProgramacionCapacitacion, this.employeeForm.value).subscribe({
          next: (data) => {
            this.messageService.add({ severity: 'success', summary: 'Actualización', detail: 'Actualizada Exitosamente', life: 1500 });
          },
          error: (error) => {
            console.error('Error al cargar las Capacitaciones', error);
          }
        });*/

      },
      reject: () => {
         
      }
  })


   

  }

  getFecha(fecha: Date): any {
    const newfech = new Date(fecha)
     return newfech;
   }

}
