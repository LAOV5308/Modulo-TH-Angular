import { Component , ChangeDetectorRef, OnInit, Inject} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModelGroup, ReactiveFormsModule} from '@angular/forms';
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
import { NgFor, NgForOf } from '@angular/common';
import { CapacitacionProgramada } from '../../../../../backend/models/capacitacion.model';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef } from '@angular/material/dialog';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { AutoCompleteModule } from 'primeng/autocomplete'
import { ColorPickerModule } from 'primeng/colorpicker';

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
    MatAutocompleteModule, NgFor, NgForOf, MatOption, MatCardModule, NgxMaterialTimepickerModule, AutoCompleteModule, ColorPickerModule
  ],
  providers:[EmpleadosService, 
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    provideMomentDateAdapter(),CatalogoCapacitacionService, { provide: LOCALE_ID, useValue: 'es' }
  ],
  templateUrl: './programar-capacitaciones.component.html',
  styleUrl: './programar-capacitaciones.component.css'
})
export class ProgramarCapacitacionesComponent implements OnInit{
  
  sourceEmpleados!: Empleado[];
  targetEmpleados!: Empleado[];
  employeeForm: FormGroup;
  //Capacitacoiones Programadas
  capacitacionesprogramadas: CapacitacionProgramada[]=[];

  capacitaciones: CapacitacionCatalogo[] = [];
  capacitacionesFiltradas: CapacitacionCatalogo[] = [];
  capacitacionesFiltrada: string = '';
  NombreCapacitaciones: string[] =[];

  capacitacionSeleccionada: any;

    filteredCapacitaciones!: any[];

  constructor(private cdr: ChangeDetectorRef, private empleadoService: EmpleadosService,
    private catalogoCapacitacionesService: CatalogoCapacitacionService,
    private _adapter: DateAdapter<any>,
    private _intl: MatDatepickerIntl,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    private fb: FormBuilder,
    private _dialogRef: MatDialogRef<ProgramarCapacitacionesComponent>,
  ){

    this.employeeForm = this.fb.group({
      
      //Informacion Laboral
      // Define otros controles de formulario aquí
      Fecha: [''],
      HoraInicio:[''],
      NombreCapacitacion:[''],
      Imparte:['']
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
    this.es = {
      firstDayOfWeek: 1,
      dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
      dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      dayNamesMin: ["D","L","M","M","J","V","S"],
      monthNames: ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],
      monthNamesShort: ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"],
      today: 'Hoy',
      clear: 'Borrar'
    };

    this._adapter.setLocale('es-ES');
    this.updateCloseButtonLabel('Cerrar el calendario');

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

this.empleadoService.postIngreso(this.employeeForm.value).subscribe({
  next: (resp: any) => {
   // alert('Se ha cerrado');
    this._dialogRef.close(true);
},
error: (err: any) => {
    console.error('Error: ' + err);
}
});

/*
this.targetEmpleados.forEach(empleado => {
  this.employeeForm.patchValue({
    NoNomina: empleado.NoNomina
  });
  
  this.empleadoService.postIngreso(this.employeeForm.value).subscribe({
    next: (resp: any) => {
      window.alert('exito'+resp);
      this.limpiar();
  },
  error: (err: any) => {
      console.error('Error: ' + err);
  }
  });

  console.log(`NoNominaEmpleado: ${empleado.NoNomina}`);
  // Puedes realizar otras operaciones aquí
});
    */
    

  }

limpiar(){
  this.employeeForm.reset({
    Ingreso: null,
      HoraInicio:null,
      HoraFin:null,
      NombreCapacitacion:''

  });
}

}
