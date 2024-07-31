import { CommonModule, NgFor } from '@angular/common';
import { AfterViewInit, Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { FullCalendarModule } from '@fullcalendar/angular'; // FullCalendar module
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es'; // Importa el archivo de localización en español
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ProgramarCapacitacionesComponent } from '../programar-capacitaciones/programar-capacitaciones.component';
import { MatDialog } from '@angular/material/dialog';
import { CapacitacionProgramada, CapacitacionesSuscripciones, Calificaciones } from '../../../../../backend/models/capacitacion.model';
import { CatalogoCapacitacionService } from '../../../../../backend/ConexionDB/catalogocapacitacion.service';

import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';

import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { SplitterModule } from 'primeng/splitter';  
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { Empleado } from '../../../../../backend/models/empleado.model';
import { EmpleadosService } from '../../../../../backend/ConexionDB/empleados.service';
import { PickListModule } from 'primeng/picklist';
import { Table, TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';

import {MatMenuModule} from '@angular/material/menu';
import { DropdownModule } from 'primeng/dropdown';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}
interface Suscripcion{
  NoNomina: number;
  IdProgramacionFecha: number;
}

interface Origenes {
  label: string;
  value: string;
}
interface Frecuencias {
  label: string;
  value: string;
}

@Component({
  selector: 'app-consultar-capacitaciones',
  standalone: true,
  imports: [CalendarModule, FormsModule, NgFor, CommonModule, FullCalendarModule,
    MatButtonModule, MatIcon, DynamicDialogModule, ToastModule, ButtonModule, SplitterModule, MatCardModule, MatGridListModule,
    PickListModule, NgFor, TableModule,  InputTextModule, DialogModule, ConfirmDialogModule, CheckboxModule, InputNumberModule
    , InputTextareaModule, FloatLabelModule, SplitButtonModule, MenubarModule, CardModule, MatMenuModule, DropdownModule, MatFormFieldModule,
    MatOptionModule, MatSelectModule, MatDatepickerModule

  ],
  providers:[CatalogoCapacitacionService, DialogService, MessageService, EmpleadosService, ConfirmationService, provideNativeDateAdapter()],
  templateUrl: './consultar-capacitaciones.component.html',
  styleUrl: './consultar-capacitaciones.component.css'
})
export class ConsultarCapacitacionesComponent implements OnInit, AfterViewInit{
 //Capacitacoiones Programadas
 capacitacionesprogramadas: CapacitacionProgramada[]=[];
 capacitacionessuscripciones: CapacitacionesSuscripciones[]=[];
 events: any[] = [];  // Crear el arreglo de eventos
 programacionConsulta: CapacitacionProgramada[]=[];
 
 empleados: Empleado[]= [];

 sourceEmpleados!: Empleado[];
 targetEmpleados!: Empleado[];
 consulta: boolean = false;
 WEvaluar: boolean = false;
 NoNominaEvaluar!: number;
 cols!: Column[];
 exportColumns!: ExportColumn[];
idProgramacionFecha: number = 0;
validarDuplicidad: number[]=[];
suscripcionForm: FormGroup;
evaluarForm: FormGroup;
calificacionEmpleado: number =0;
comentario!: string;
eval: boolean= true;
calificaciones: Calificaciones[]=[];
visible: boolean = false;
 ref: DynamicDialogRef | undefined;
 
 @ViewChild('dt') dt: Table | undefined;
 @ViewChild('dtE') dtE: Table | undefined;
productDialog: boolean = false;
checked: boolean = false;
asistio!: boolean;
mostrarcalificaciones: boolean = false;
items: MenuItem[];
items1: MenuItem[] | undefined;
selectedOrigen!: Origenes;
selectedFrecuencia!: Frecuencias;
fechaDate!:Date;

origenes: Origenes[] = [
  { label: 'Interna', value: 'Interna' },
  { label: 'Externa', value: 'Externa' }
];
frecuencias: Frecuencias[] = [
  { label: 'Diaria', value: 'Diari' },
  { label: 'Semanal', value: 'Semanal' },
  { label: 'Mensual', value: 'Mensual' },
  { label: 'Anual', value: 'Anual' }
];

orig: string[] = [
  'Interna',
  'Externa'
];



  constructor(private _dialog: MatDialog, private capacitacionesService: CatalogoCapacitacionService, private cdr: ChangeDetectorRef,
    public dialogService: DialogService, public messageService: MessageService, private empleadoService: EmpleadosService,
    private confirmationService: ConfirmationService, private fb: FormBuilder
  ){
    this.suscripcionForm = this.fb.group({
      NoNomina:[],
    IdProgramacionCapacitacion:[]
    });

    this.evaluarForm = this.fb.group({
      NoNomina:[],
      IdProgramacionCapacitacion:[],
      Calificacion: [],
      Estatus: [],
      Asistio: [],
      Comentario: []
    });

    this.items = [
      {
          label: 'Update',
          icon: 'pi pi-fw pi-calendar-times',
          command: () => {
              //this.update();
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Updated' });

              
          }
      },
      {
          label: 'Delete',
          command: () => {
              //this.delete();
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Updated' });
          }
      },
      { label: 'Angular Website', url: 'http://angular.io' },
      { label: 'Upload', routerLink: ['/fileupload'] }
  ];

  this.items1 = [
    {
        label: 'Home',
        icon: 'pi pi-home'
    },
    {
        label: 'Features',
        icon: 'pi pi-star'
    },
    {
        label: 'Projects',
        icon: 'pi pi-search',
        items: [
            {
                label: 'Components',
                icon: 'pi pi-bolt'
            },
            {
                label: 'Blocks',
                icon: 'pi pi-server'
            },
            {
                label: 'UI Kit',
                icon: 'pi pi-pencil'
            },
            {
                label: 'Templates',
                icon: 'pi pi-palette',
                items: [
                    {
                        label: 'Apollo',
                        icon: 'pi pi-palette'
                    },
                    {
                        label: 'Ultima',
                        icon: 'pi pi-palette'
                    }
                ]
            }
        ]
    },
    {
        label: 'Contact',
        icon: 'pi pi-envelope'
    }
]

  }
  save(severity: string) {
    this.messageService.add({ severity: severity, summary: 'Success', detail: 'Data Saved' });
}


  ngAfterViewInit(): void {
    this.ngOnInit();
  }

  ngOnInit(): void {

    this.capacitacionesService.getProgramacionCapacitaciones().subscribe({
      next: (data) => {
        this.capacitacionesprogramadas = data;
        console.log('data');
        console.log(data);
        this.updateCalendarEvents();
        
      },
      error: (error) => {
        console.error('Error al cargar las Capacitaciones', error);
      }
    });

    //Aqui traeremos los empleados que estan en dicha Capacitacion
    this.empleadoService.getEmpleados().subscribe({
      next: (data) => {
        this.empleados = data;
        this.sourceEmpleados = data;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error al cargar los departamentos', error);
      }
    });

    this.targetEmpleados = [];

    this.cols = [
      { field: 'NoNomina', header: 'NoNomina'},
      { field: 'Nombre', header: 'Nombre'},
      { field: 'Apellidos', header: 'Apellidos'},
      { field: 'NombrePuesto', header: 'Puesto'},
      { field: 'NombreDepartamento', header: 'Departamento'}
  ];

  this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));

  }


  // Método para obtener la fecha con un día añadido
  getFechaConDiaAdicional(fecha: Date): any {
   const newfech = new Date(fecha).toISOString().split('T')[0]
    return newfech;
  }
   getFechaConDiaMas(fecha: Date): any {
   const nuevaFecha = new Date(fecha);
   nuevaFecha.setDate(nuevaFecha.getDate() + 1); // Agregar un día
   const newfech = nuevaFecha.toISOString().split('T')[0];
   return newfech;
}


convertirFechaATiempo(fechaISO: string): string {
  // Crear un objeto Date a partir de la cadena ISO
  const fecha = new Date(fechaISO);

  // Restar 6 horas a la fecha
  fecha.setUTCHours(fecha.getUTCHours() - 6);

  // Obtener las horas y los minutos
  let horas: number = fecha.getUTCHours(); // Usar getUTCHours() para obtener la hora en UTC
  const minutos: number = fecha.getUTCMinutes();

  // Determinar el periodo (A.M./P.M.)
  const periodo: string = horas >= 12 ? 'P.M.' : 'A.M.';

  // Convertir la hora al formato de 12 horas
  horas = horas % 12;
  horas = horas ? horas : 12; // La hora 0 se debe convertir a 12

  // Formatear los minutos para asegurarse de que siempre tengan dos dígitos
  const minutosFormateados: string = minutos < 10 ? '0' + minutos : minutos.toString();

  // Construir la cadena de tiempo en el formato deseado
  const tiempoFormateado: string = `${horas}:${minutosFormateados} ${periodo}`;

  return tiempoFormateado;
}

  updateCalendarEvents() {
    this.events=[];

    this.capacitacionesprogramadas.forEach(cap => {
      if(cap.FechaFin!=null){
        this.events.push({
          id: cap.IdProgramacionCapacitacion,
          title: cap.NombreCapacitacion,
          start: new Date(cap.FechaInicio).toISOString().split('T')[0], // Convertir a ISO string para FullCalendar
          end: this.getFechaConDiaMas(cap.FechaFin), 
          extendedProps: {
                  imparte: cap.PersonaImparte
              },
          color: cap.Color
          //color: cap.EstadoProgramacionCapacitacion ? 'green' : 'red',
        });
      }else{
        this.events.push({
          id: cap.IdProgramacionCapacitacion,
          title: cap.NombreCapacitacion,
          start: new Date(cap.FechaInicio).toISOString().split('T')[0], // Convertir a ISO string para FullCalendar
          extendedProps: {
                  imparte: cap.PersonaImparte
              },
          color: cap.Color
          //color: cap.EstadoProgramacionCapacitacion ? 'green' : 'red',
        });
      }
      
    });

    this.calendarOptions = {
      ...this.calendarOptions,
      events: this.events
    };


  }
/*
    this.events=[
      {id:2, title: 'Algo', start: '2024-07-04', end:'2024-07-06', color: 'red'},
      { title: 'Capacitacion 2', date: '2024-07-04', color: 'green'},
      { title: 'Capacitacion 4', date: '2024-07-02'} ,
      { id: 17, title: 'ABS', start: '2024-07-26', color: 'green'} ,
    ];*/

    
    
    //console.log(JSON.stringify(this.events));

 

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: (arg) => this.handleDateClick(arg),
    eventClick: this.handleEventClick.bind(this),
    locale: esLocale, // Configura el calendario para usar español,
    eventTimeFormat: { // Configurar el formato de la hora
      hour: '2-digit',
      minute: '2-digit',
      hour12: true // Formato de 12 horas
    }
  };
      /*
      events: [
        { title: 'Algo', start: '2024-07-04', end:'2024-07-06', color: 'red'},
        { title: 'Capacitacion 2', date: '2024-07-04', color: 'green'},
        { title: 'Capacitacion 4', date: '2024-07-02'}
      ]*/



  handleDateClick(arg: any) {
    if(arg.event!=undefined){
     // alert('date click! ' + arg.event);
    }
  }

  handleEventClick(clickInfo: any) {
    //alert('Event clicked: ' + clickInfo.event.start);
    /*
    alert(
      `Event clicked: ${clickInfo.event.title}\n` +
      `Start: ${clickInfo.event.start}\n` +
      `End: ${clickInfo.event.end}\n` +
      `ID: ${clickInfo.event.id}\n` +
      `URL: ${clickInfo.event.url}\n` +
      `Class Names: ${clickInfo.event.classNames.join(', ')}\n` +
      `Background Color: ${clickInfo.event.backgroundColor}\n` +
      `Border Color: ${clickInfo.event.borderColor}\n` +
      `Text Color: ${clickInfo.event.textColor}\n` +
      `Description: ${clickInfo.event.extendedProps.description}`
    );
    */
    //Consulta
/**this.capacitacionesService.getProgramacionCapacitaciones().subscribe({
      next: (data) => {
        this.capacitacionesprogramadas = data;
        console.log(data);
        this.updateCalendarEvents();
        
      },
      error: (error) => {
        console.error('Error al cargar las Capacitaciones', error);
      }
    }); */
    
    this.idProgramacionFecha = clickInfo.event.id;
    console.log(this.idProgramacionFecha);
    this.consulta = false;
    this.programacionConsulta=[];
    this.calificaciones = [];
    //AQUI
    this.capacitacionesService.getsingleProgramacionCapacitacion(clickInfo.event.id).subscribe({
      next: (data) => {
        this.programacionConsulta = data;
        console.log('Programacion Consulta');
        console.log(data);
        const today = new Date();
        
        if(this.programacionConsulta[0].FechaFin == null){
          
          this.fechaDate = new Date(this.programacionConsulta[0].FechaInicio);

        }else{
        this.fechaDate = new Date(this.programacionConsulta[0].FechaFin);

        }
        // Agregar un día
        this.fechaDate.setDate(this.fechaDate.getDate() + 1);
// Formatear la fecha en un string legible
//const day = today.getDate();
if(this.fechaDate >= today){
  this.eval=false;
  
}else{
  this.eval=true;
}
      },
      error: (error) => {
        console.error('Error al cargar las Capacitaciones', error);
      }
    });

this.capacitacionesService.getsingleCalificaciones(this.idProgramacionFecha).subscribe({
  next:(data) =>{
    console.log('Calificaciones');
    console.log(data);
    this.calificaciones = data;
    
  },
  error: (error) => {
    console.error('Error al cargar las Calificaciones', error);
  }

});

    this.consultar();

  }

  filterGlobal(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    const dt = this.dt; // Asegúrate de tener referencia a la tabla

    if (dt) {
      dt.filterGlobal(value, 'contains');
    }
  }

  filterGlobalEmpleado(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    const dtE = this.dtE; // Asegúrate de tener referencia a la tabla

    if (dtE) {
      dtE.filterGlobal(value, 'contains');
    }
  }


  agregar(){
    
 this.visible= true;

 /*
    this.ref = this.dialogService.open(ProgramarCapacitacionesComponent, {
      header: 'Programar Nueva Capacitacion',
      width: '50vw',
      modal:true,
      contentStyle: { overflow: 'auto' },
      breakpoints: {
          '960px': '75vw',
          '640px': '90vw'
      }
  });*/
  /*
  this.confirmationService.confirm({
    message: '¿Está seguro de que desea proceder?',
    header: 'Confirmación',
    icon: 'pi pi-exclamation-triangle',
    rejectButtonStyleClass: "p-button-text",
    acceptLabel: 'Sí',
    rejectLabel: 'No',
    accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Has aceptado' });
    },
    reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: 'Has rechazado', life: 3000 });
    }
})*/

  /*
    const dialog = this._dialog.open(ProgramarCapacitacionesComponent , {
      width: '1000px', height: '600px'
    });

    dialog.afterClosed().subscribe({
      next:(val)=>{
        if(val){
            this.ngAfterViewInit();
        
          
        }

      }
    });*/

  }

  desconsulta(){
    this.consulta = false;

  }

  consultar(){
    this.consulta = true;
    this.mostrarcalificaciones = false;
    this.validarDuplicidad = [];

    if(this.idProgramacionFecha){
      this.capacitacionesService.getsingleProgramaciones(this.idProgramacionFecha).subscribe({
        next: (data) => {
          this.capacitacionessuscripciones = data;
          
        this.capacitacionessuscripciones.forEach(consulta => {
          this.validarDuplicidad.push(consulta.NoNomina);
        });
        
          
        },
        error: (error) => {
          console.error('Error al cargar las Capacitaciones', error);
        }
      });
    }
    

  }

  asignar(){
    this.targetEmpleados=[];
    this.productDialog = true;

  }

  eliminar(id: number){

    this.confirmationService.confirm({
      message: '¿Está seguro de que desea Eliminar?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonStyleClass: "p-button-text",
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: () => {
        this.capacitacionesService.deleteSuscripcion(id).subscribe({
          next: (resp: any) => {
            this.messageService.add({ severity: 'success', summary: 'Satisfactorio', detail: 'Eliminado Exitosamente', life: 1500 });
          this.consultar();
            
          },
          error: (error) => {
            console.error('Error al eliminar', error);
          }
        });
      },
      reject: () => {
         
      }
  })
  }

  eliminarprogramacion(id: number){

    this.confirmationService.confirm({
      message: '¿Está seguro de que desea Eliminar la programacion de la capacitacion?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonStyleClass: "p-button-text",
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: () => {
        this.capacitacionesService.deleteProgramacionCapacitacion(id).subscribe({
          next: (resp: any) => {
            this.messageService.add({ severity: 'success', summary: 'Satisfactorio', detail: 'Eliminado Exitosamente', life: 1500 });
            this.programacionConsulta = [];
            this.ngAfterViewInit();
            this.consultar();
            
            
          },
          error: (error) => {
            console.error('Error al eliminar', error);
          }
        });
      },
      reject: () => {
         
      }
  })

  }

  actualizar(){
    this.ngAfterViewInit();

  }
  hideDialog() {
    
    this.productDialog = false;
    this.WEvaluar = false;
}

//Asignar ProgramacionCapacitacion
saveAsignacion() {

  this.suscripcionForm.patchValue({
    IdProgramacionCapacitacion: this.idProgramacionFecha
  })

  this.targetEmpleados.forEach(empleado => {
    this.suscripcionForm.patchValue({
      NoNomina: empleado.NoNomina
    });

console.log(this.suscripcionForm.value);

if(this.validarDuplicidad.includes(this.suscripcionForm.value.NoNomina)){
}else{
  this.capacitacionesService.addSuscripcion(this.suscripcionForm.value).subscribe({
    next: (resp: any) => {
     // alert('Se ha cerrado');
     this.consultar();
     

  },
  error: (err: any) => {
      console.error('Error: ' + err);
  }
  });
}
  });

  

  this.messageService.add({ severity: 'success', summary: 'Satisfactorio', detail: 'Asignacion Guardada Exitosamente', life: 1500 });
  
      this.productDialog = false;
      
}

evaluar(id: number, evaluado: boolean){
  /*
const ruta =[{'Algo':2,

}];*/


this.NoNominaEvaluar = id;
if(evaluado){
  this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Empleado fue Evaluado', life: 1500  });
}else{
  //this.evaluarForm.reset();
  this.WEvaluar = true;
}

  /*
this.confirmationService.confirm({
      message: '¿La persona Asistio a la Capacitacion? '+ this.NoNominaEvaluar + 'IdFecha:'+this.idProgramacionFecha,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonStyleClass: "p-button-text",
      rejectLabel: 'No',
      acceptLabel: 'Sí',
      accept: () => {
        this.WEvaluar = true;
        this.messageService.add({ severity: 'success', summary: 'Satisfactorio', detail: 'Eliminado Exitosamente', life: 1500 });
      },
      reject: () => {
        
      
        this.evaluarForm.patchValue({
          NoNomina: this.NoNominaEvaluar,
          IdProgramacionCapacitacion: this.idProgramacionFecha,
          Calificacion: null,
            Estatus: null,
            Asistio: false
        });
      
        this.capacitacionesService.addEvaluacion(this.evaluarForm.value).subscribe({
          next: (resp: any) => {
            this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Empleado No asistio', life: 1500  });
        },
        error: (err: any) => {
            console.error('Error: ' + err);
        }
        });

        

      }
  })*/
}

evaluarEmpleado(){

  this.evaluarForm.patchValue({
    NoNomina: this.NoNominaEvaluar,
    IdProgramacionCapacitacion: this.idProgramacionFecha
  });


  if(this.calificacionEmpleado>=7){
    this.evaluarForm.patchValue({
      Calificacion: this.calificacionEmpleado,
      Estatus: true,
      Asistio: true,
      Comentario: this.comentario
    });
  }else{
    this.evaluarForm.patchValue({
      Calificacion: this.calificacionEmpleado,
      Estatus: false,
      Asistio: true,
      Comentario: this.comentario
    });

  }

  try {
    this.capacitacionesService.addEvaluacion(this.evaluarForm.value).subscribe({
      next: (resp: any) => {
        this.messageService.add({ severity: 'success', summary: 'Evaluado', detail: 'Evaluado Exitosamente', life: 1500 });
        this.resetEvaluarForm();
        this.WEvaluar = false;
        this.actualizar();
        this.consultar();


    
    },
    error: (err: any) => {
        console.error('Error: ' + err);
    }
    });

    
  } catch (error) {
    console.log('Error', error);
    
  }
  
  
}

calificacionesMostrar(){
this.mostrarcalificaciones = true;
this.consulta = false;
this.calificaciones=[];

this.capacitacionesService.getsingleCalificaciones(this.idProgramacionFecha).subscribe({
  next:(data) =>{
    console.log('Calificaciones');
    console.log(data);
    this.calificaciones = data;
    
  },
  error: (error) => {
    console.error('Error al cargar las Calificaciones', error);
  }

});

/*
  this.capacitacionesService.getsingleCalificaciones(3056).subscribe({
    next: (data) => {
      this.calificaciones = data;
     console.log(data);
      //this.updateCalendarEvents();
      
    },
    error: (error) => {
      console.error('Error al cargar las Capacitaciones', error);
    }
  });*/
}

Asistencia(){
  window.alert('Asistencia');
}
 
resetEvaluarForm(){
  this.calificacionEmpleado = 0;
  this.comentario = '';
};




}
