import { Component , ChangeDetectorRef, OnInit, Inject} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { PickListModule } from 'primeng/picklist';
import { Empleado } from '../../../../../backend/models/empleado.model';
import { EmpleadosService } from '../../../../../backend/ConexionDB/empleados.service';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MatOption } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule, MatDatepickerIntl } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import 'moment/locale/es';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { CapacitacionCatalogo } from '../../../../../backend/models/capacitacioncatalogo.model';
import { CatalogoCapacitacionService } from '../../../../../backend/ConexionDB/catalogocapacitacion.service';
import { NgFor, NgForOf, NgIf } from '@angular/common';
import { CapacitacionProgramada } from '../../../../../backend/models/capacitacion.model';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef } from '@angular/material/dialog';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { AutoCompleteModule } from 'primeng/autocomplete'
import { ColorPickerModule } from 'primeng/colorpicker';
import { RadioButtonModule } from 'primeng/radiobutton';
import {MatSelectModule} from '@angular/material/select';
import { CardModule } from 'primeng/card';
import { SplitterModule } from 'primeng/splitter';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import {MatCheckboxModule} from '@angular/material/checkbox'
registerLocaleData(localeEs);

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}


@Component({
  selector: 'app-programar-capacitaciones',
  standalone: true,
  imports: [FormsModule, CalendarModule, PickListModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule, MatButtonModule, ReactiveFormsModule,
    MatAutocompleteModule, NgFor, NgIf, NgForOf, MatOption, MatCardModule, NgxMaterialTimepickerModule, AutoCompleteModule, ColorPickerModule,
    RadioButtonModule, MatSelectModule, CardModule, SplitterModule, MatIconModule, RouterLink, MatCheckboxModule
  ],
  providers:[EmpleadosService, MessageService,
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    provideMomentDateAdapter(),CatalogoCapacitacionService, { provide: LOCALE_ID, useValue: 'es' }
  ],
  templateUrl: './programar-capacitaciones.component.html',
  styleUrl: './programar-capacitaciones.component.css'
})
export class ProgramarCapacitacionesComponent implements OnInit{
  hoy = new Date();
  fechaStart: Date = this.hoy;

  sourceEmpleados!: Empleado[];
  targetEmpleados!: Empleado[];
  employeeForm: FormGroup;
  
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

  constructor(private cdr: ChangeDetectorRef, private empleadoService: EmpleadosService,
    private catalogoCapacitacionesService: CatalogoCapacitacionService,
    private _adapter: DateAdapter<any>,
    private _intl: MatDatepickerIntl,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    private fb: FormBuilder,
    public messageService: MessageService
    //private _dialogRef: MatDialogRef<ProgramarCapacitacionesComponent>,
  ){
    
    this.minDate = new Date();

    this.employeeForm = this.fb.group({
      
      //Informacion Laboral
      // Define otros controles de formulario aquí
      
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

  es: any;
  datetime12h: Date[] | undefined;

  filterCountry(event: AutoCompleteCompleteEvent) {
    let filtered: string[] = [];
    let query = event.query;

    for (let i = 0; i < (this.NombreCapacitaciones as string[]).length; i++) {
        let country = (this.NombreCapacitaciones as string[])[i];
        if (country.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(country);
        }
    }

    this.filteredCapacitaciones = filtered;
}

 
  ngOnInit(): void {

    this.employeeForm.get('Frecuencia')?.valueChanges.subscribe(value => {
      this.selectedFrecuencia = value;
      this.updateFechaFieldsVisibility();
    });
    this.updateFechaFieldsVisibility();



    this.catalogoCapacitacionesService.getCatalogoCapacitaciones().subscribe({
      next: (data) => {
        this.capacitaciones = data;
        this.capacitacionesFiltradas = this.capacitaciones;
this.NombreCapacitaciones=[];
        this.capacitaciones.forEach(capacitacion => {
          
          this.NombreCapacitaciones.push(capacitacion.NombreCapacitacion);
        }
      );
        
      },
      error: (error) => {
        console.error('Error al cargar las Capacitaciones', error);
      }
    });

    /*
    this.catalogoCapacitacionesService.getProgramacionCapacitaciones().subscribe({
      next: (data) => {
        this.capacitacionesprogramadas = data;
        
      },
      error: (error) => {
        console.error('Error al cargar las Capacitaciones', error);
      }
    });*/
   

    this.empleadoService.getEmpleados().subscribe({
      next: (data) => {
        this.sourceEmpleados = data;
        this.cdr.markForCheck();
        
      },
      error: (error) => {
        console.error('Error al cargar los departamentos', error);
      }
    });
    this.targetEmpleados = [];
  }

  updateFechaFieldsVisibility() {
    if (this.selectedFrecuencia === 'Diaria') {
      this.employeeForm.get('FechaFin')?.reset();
    }
  }



  updateCloseButtonLabel(label: string) {
    this._intl.closeCalendarLabel = label;
    this._intl.changes.next();
  }

  getDateFormatString(): string {
    return 'DD/MM/YYYY';
  }

  filterCapacitaciones() {
    const filterValue = this.capacitacionesFiltrada.toLowerCase();
    this.capacitacionesFiltradas = this.capacitaciones.filter(capacitacion => capacitacion.NombreCapacitacion.toLowerCase().includes(filterValue));
  }

  



  imprimir(){
    console.log(this.targetEmpleados)
    console.log(this.employeeForm.value);
  }
  
  onSubmit(){
    //alert(this.datetime12h);
    /*

    console.log(this.employeeForm.value.HoraInicio);

    const hours = this.employeeForm.value.HoraInicio.getHours().toString().padStart(2, '0');
      const minutes = this.employeeForm.value.HoraInicio.getMinutes().toString().padStart(2, '0');
      const formattedTime = `${hours}:${minutes}`; // Formato TIME para SQL Server

      const hours1 = this.employeeForm.value.HoraFin.getHours().toString().padStart(2, '0');
      const minutes1 = this.employeeForm.value.HoraFin.getMinutes().toString().padStart(2, '0');
      const formattedTime1 = `${hours1}:${minutes1}`; // Formato TIME para SQL Server

this.employeeForm.patchValue({
  HoraInicio: formattedTime,
  HoraFin: formattedTime1
});*/

console.log(this.employeeForm.value);

/*
this.empleadoService.postIngreso(this.employeeForm.value).subscribe({
  next: (resp: any) => {
   // alert('Se ha cerrado');
    //this._dialogRef.close(true);
},
error: (err: any) => {
    console.error('Error: ' + err);
}
});*/

/*
this.targetEmpleados.forEach(empleado => {
  this.employeeForm.patchValue({
    NoNomina: empleado.NoNomina
  });
  

  console.log(`NoNominaEmpleado: ${empleado.NoNomina}`);
  // Puedes realizar otras operaciones aquí
});*/

/*
if(this.employeeForm.value.Origen == 'Interna'){
  this.employeeForm.patchValue({
    Color: '#00943e'
  });
  
}else{
  this.employeeForm.patchValue({
    Color: '#388ec7'
  });
}*/

/*if(this.employeeForm.value.Evaluacion == ''){
  
}*/


if(this.employeeForm.value.HoraInicio == ''){
  this.employeeForm.patchValue({
    HoraInicio: null
  });
};
if(this.employeeForm.value.HoraFin == ''){
  this.employeeForm.patchValue({
    HoraFin: null
  });
};
//if(this.employeeForm.value.HoraInicio == ''){}

console.log(this.employeeForm.value);
this.catalogoCapacitacionesService.addCapacitacion(this.employeeForm.value).subscribe({
  next: (resp: any) => {
    window.alert('Agregado con exito');
    //this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Capacitacion Agregada Exitosamente' });
    this.limpiar();
},
error: (err: any) => {
    console.error('Error: ' + err);
    window.alert(err);
}
});

    /*
  this.empleadoService.postIngreso(this.employeeForm.value).subscribe({
    next: (resp: any) => {
      window.alert('exito'+resp);
      this.limpiar();
  },
  error: (err: any) => {
      console.error('Error: ' + err);
  }
  });*/
    

  }

limpiar(){
  this.employeeForm.reset({
    NombreCapacitacion:'',
      Origen:'',
      Frecuencia:'',
      FechaInicio: null,
      FechaFin: null,
      HoraInicio: null,
      HoraFin: null,
      //HoraInicio:[''],
      Imparte:'',
      Comentarios:''
  });
}

}
