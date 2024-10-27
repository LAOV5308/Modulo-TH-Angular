import { Component , ChangeDetectorRef, OnInit, Inject} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { PickListModule } from 'primeng/picklist';
import { Empleado } from '../../../../../backend/models/empleado.model';
import { EmpleadosService } from '../../../../../backend/services/empleados.service';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MatOption } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule, MatDatepickerIntl } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import 'moment/locale/es';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { CapacitacionService } from '../../../../../backend/services/capacitacion.service';
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
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ToastModule } from 'primeng/toast';
registerLocaleData(localeEs);
import { InputNumberModule } from 'primeng/inputnumber';

import { NgxColorsModule } from 'ngx-colors';


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
    RadioButtonModule, MatSelectModule, CardModule, SplitterModule, MatIconModule, RouterLink, MatCheckboxModule,
    ToastModule, NgxColorsModule, InputNumberModule
  ],
  providers:[EmpleadosService, MessageService,
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    provideMomentDateAdapter(),CapacitacionService, { provide: LOCALE_ID, useValue: 'es' }
  ],
  templateUrl: './programar-capacitaciones.component.html',
  styleUrl: './programar-capacitaciones.component.css'
})
export class ProgramarCapacitacionesComponent implements OnInit{
  dates: Date[] | undefined;
  datesAux: Date[] | undefined;
  rangeDates: Date[] | undefined;
  hoy = new Date();
  fechaStart: Date = this.hoy;
mensaje: boolean = false;
  sourceEmpleados!: Empleado[];
  targetEmpleados!: Empleado[];
  employeeForm: FormGroup;
  horas: number = 0;
  
  //Capacitacoiones Programadas
  capacitacionesprogramadas: CapacitacionProgramada[]=[];

  capacitacionesFiltrada: string = '';
  NombreCapacitaciones: string[] =[];
  minDate: Date | undefined;

  capacitacionSeleccionada: any;

  idProgramacionCapacitacion: number | null = null;

    filteredCapacitaciones!: any[];
    checked: boolean = false;

    leftColor!: string;
    selectedFrecuencia: string = 'Seleccion de Dias';
    frecuencias: string[]=[
      'Seleccion de Dias',
      'Seleccion Dia Inicio y Dia Fin'
    ];

    origen: string[]=[
      'Interna', 'Externa'
    ];

  constructor(private cdr: ChangeDetectorRef, private empleadoService: EmpleadosService,
    private capacitacionesService: CapacitacionService,
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
      Horas:['', Validators.required],
      NombreCapacitacion:['', Validators.required],
      Origen:['', Validators.required],
      Frecuencia:['', Validators.required],
      PersonaImparte:[''],
      Comentarios:[''],
      Fecha: [''],
      FechaRango: [''],
      //FechaInicio: [''],
      FechaFin: [''],
      HoraInicio: [''],
      HoraFin: ['']
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
    if (this.selectedFrecuencia === 'Seleccion de Dias') {
      this.employeeForm.get('FechaRango')?.reset();
      this.rangeDates = undefined;
    }
    if (this.selectedFrecuencia === 'Seleccion Dia Inicio y Dia Fin') {
      this.employeeForm.get('Fecha')?.reset();
      this.dates = undefined;
    }
  }

  updateCloseButtonLabel(label: string) {
    this._intl.closeCalendarLabel = label;
    this._intl.changes.next();
  }

  getDateFormatString(): string {
    return 'DD/MM/YYYY';
  }


  imprimir(){
    //console.log(this.targetEmpleados)
    //console.log(this.employeeForm.value);
  }
  
  onSubmit(){
    //console.log(this.rangeDates);
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

/*
console.log(this.dates);
console.log(this.employeeForm.value);*/


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
if(this.employeeForm.valid){
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
  if(this.employeeForm.value.FechaInicio == ''){
    this.employeeForm.patchValue({
      FechaInicio: null
    });
  };
  if(this.employeeForm.value.FechaFin == ''){
    this.employeeForm.patchValue({
      FechaFin: null
    });
  };
  
  //if(this.employeeForm.value.HoraInicio == ''){}
  
  
  
  if(this.dates == undefined && this.rangeDates==undefined){
    this.messageService.add({ severity: 'warn', summary: 'Precaucion', detail: 'No hay fechas Seleccionadas' });
  }else{
    //Aqui Primero Metemos un registro de la informacion de la capacitacion

this.datesAux = this.dates;

    this.employeeForm.patchValue({
      Fecha: null
    });

    //console.log(this.employeeForm.value);
  
        this.capacitacionesService.addCapacitacion(this.employeeForm.value).subscribe({
          next: (resp: any) => {
            //window.alert('Agregado con exito');
            //console.log('Capacitación agregada:', resp);
        this.idProgramacionCapacitacion = resp.IdProgramacionCapacitacion;  // Guarda el IdProgramacionCapacitacion
       // console.log('ID de la programación:', this.idProgramacionCapacitacion);
        //this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Capacitacion Agregada Exitosamente' });


//console.log(this.datesAux + ' '+this.rangeDates +''+this.idProgramacionCapacitacion);
//Programar Capacitaciones para los dias
if(this.datesAux!=undefined){
//alert('Entro en fechas');



//Multiplicacion de Horas por Dias
//var HorasPorDia = this.datesAux.length * this.employeeForm.value.Horas;

this.datesAux!.forEach((element:Date) => {
/*this.employeeForm.patchValue({
  Fecha: element
});*/

this.capacitacionesService.addCapacitacionFecha(this.idProgramacionCapacitacion, element, this.employeeForm.value.Horas).subscribe({
  next: (resp: any) => {
    //this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Capacitacion Agregada Exitosamente'+resp });
},
error: (err: any) => {
    console.log(err);
}
})

});
this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Capacitacion Agregada Exitosamente' });
this.limpiar();
}

//Programar Capacitaciones de Inicio Y Fin
if(this.rangeDates!=undefined){
  /*
this.employeeForm.patchValue({
  FechaInicio: this.rangeDates[0],
  FechaFin: this.rangeDates[1]
});
*/
//console.log(this.employeeForm.value);
//console.log(this.idProgramacionCapacitacion+' '+this.rangeDates[0] +' '+this.rangeDates[1])

 this.capacitacionesService.addCapacitacionRango(this.idProgramacionCapacitacion, this.rangeDates[0], this.rangeDates[1], this.employeeForm.value.Horas).subscribe({
  next: (resp: any) => {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Capacitacion Agregada Exitosamente' });
    this.limpiar();

},
error: (err: any) => {
    window.alert(err);
    this.rangeDates = undefined;
    this.limpiar();
}
});
}


      //this.limpiar();
        },
        error: (err: any) => {
            console.log(err);
            /*
            this.dates = [];
            this.limpiar();*/
        }
        });

      
  }
  



}else{

  this.messageService.add({ severity: 'warn', summary: 'Completa Campos', detail: 'Faltan campos por llenar' });
}


  





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
      Fecha:null,
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
