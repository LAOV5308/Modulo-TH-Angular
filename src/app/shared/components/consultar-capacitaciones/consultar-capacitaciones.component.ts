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

import { MessageService, ConfirmationService } from 'primeng/api';
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

@Component({
  selector: 'app-consultar-capacitaciones',
  standalone: true,
  imports: [CalendarModule, FormsModule, NgFor, CommonModule, FullCalendarModule,
    MatButtonModule, MatIcon, DynamicDialogModule, ToastModule, ButtonModule, SplitterModule, MatCardModule, MatGridListModule,
    PickListModule, NgFor, TableModule,  InputTextModule, DialogModule, ConfirmDialogModule, CheckboxModule, InputNumberModule
    , InputTextareaModule, FloatLabelModule
  ],
  providers:[CatalogoCapacitacionService, DialogService, MessageService, EmpleadosService, ConfirmationService],
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

 ref: DynamicDialogRef | undefined;
 
 @ViewChild('dt') dt: Table | undefined;
 @ViewChild('dtE') dtE: Table | undefined;
productDialog: boolean = false;
checked: boolean = false;

  constructor(private _dialog: MatDialog, private capacitacionesService: CatalogoCapacitacionService, private cdr: ChangeDetectorRef,
    public dialogService: DialogService, public messageService: MessageService, private empleadoService: EmpleadosService,
    private confirmationService: ConfirmationService, private fb: FormBuilder
  ){
    this.suscripcionForm = this.fb.group({
      NoNomina:[],
    IdProgramacionFecha:[]
    });

    this.evaluarForm = this.fb.group({
      NoNomina:[],
      IdProgramacionFecha:[],
      Calificacion: [],
      Estatus: [],
      Asistio: [],
      Comentario: []
    });

  }

  fechaHoy(){
    // Obtener la fecha de hoy
const today = new Date();

// Formatear la fecha en un string legible
const day = today.getDate();

alert(today);


  }

  ngAfterViewInit(): void {
    this.ngOnInit();
  }

  ngOnInit(): void {

    this.capacitacionesService.getProgramacionCapacitaciones().subscribe({
      next: (data) => {
        this.capacitacionesprogramadas = data;
       // console.log(data);
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

  updateCalendarEvents() {
    this.events=[];

    this.capacitacionesprogramadas.forEach(cap => {
      this.events.push({
        id: cap.IdProgramacionFecha,
        title: cap.NombreCapacitacion,
        start: new Date(cap.Fecha).toISOString().split('T')[0], // Convertir a ISO string para FullCalendar
            extendedProps: {
                imparte: cap.Imparte
            },
        color: cap.Color
        //color: cap.EstadoProgramacionCapacitacion ? 'green' : 'red',
      });
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
    this.capacitacionesService.getsingleProgramacionCapacitacion(clickInfo.event.id).subscribe({
      next: (data) => {
        this.programacionConsulta = data;
        const today = new Date();
        const fechaDate = new Date(this.programacionConsulta[0].Fecha);


// Formatear la fecha en un string legible
//const day = today.getDate();
if(fechaDate> today){
  this.eval=false;
  
}else{
  this.eval=true;
}


      },
      error: (error) => {
        console.error('Error al cargar las Capacitaciones', error);
      }
    });
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

  
    const dialog = this._dialog.open(ProgramarCapacitacionesComponent , {
      width: '1000px', height: '600px'
    });

    dialog.afterClosed().subscribe({
      next:(val)=>{
        if(val){
            this.ngAfterViewInit();
        
          
        }

      }
    });

  }

  desconsulta(){
    this.consulta = false;

  }

  consultar(){
    this.consulta = true;
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

saveAsignacion() {

  this.suscripcionForm.patchValue({
    IdProgramacionFecha: this.idProgramacionFecha
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

evaluar(id: number){
  /*
const ruta =[{'Algo':2,

}];*/

this.NoNominaEvaluar = id;
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
          IdProgramacionFecha: this.idProgramacionFecha,
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
  })
}

evaluarEmpleado(){

  this.evaluarForm.patchValue({
    NoNomina: this.NoNominaEvaluar,
    IdProgramacionFecha: this.idProgramacionFecha
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

  console.log(this.evaluarForm.value);
  

  try {
    this.capacitacionesService.addEvaluacion(this.evaluarForm.value).subscribe({
      next: (resp: any) => {
        this.messageService.add({ severity: 'success', summary: 'Evaluado', detail: 'Evaluado Exitosamente', life: 1500 });
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

  this.capacitacionesService.getsingleCalificaciones(3056).subscribe({
    next: (data) => {
      this.calificaciones = data;
     console.log(data);
      //this.updateCalendarEvents();
      
    },
    error: (error) => {
      console.error('Error al cargar las Capacitaciones', error);
    }
  });
}

 

}
