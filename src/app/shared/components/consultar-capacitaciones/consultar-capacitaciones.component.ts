import { CommonModule, NgFor, NumberSymbol } from '@angular/common';
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
import { CapacitacionProgramada, CapacitacionesSuscripciones, Calificaciones, Capacitacion } from '../../../../../backend/models/capacitacion.model';
import { CapacitacionService } from '../../../../../backend/services/capacitacion.service';

import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';

import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { SplitterModule } from 'primeng/splitter';  
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { Empleado } from '../../../../../backend/models/empleado.model';
import { EmpleadosService } from '../../../../../backend/services/empleados.service';
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
import { Router } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';



interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}


@Component({
  selector: 'app-consultar-capacitaciones',
  standalone: true,
  imports: [CalendarModule, FormsModule, NgFor, CommonModule, FullCalendarModule,
    MatButtonModule, MatIcon, DynamicDialogModule, ToastModule, ButtonModule, SplitterModule, MatCardModule, MatGridListModule,
    PickListModule, NgFor, TableModule,  InputTextModule, DialogModule, ConfirmDialogModule, CheckboxModule, InputNumberModule
    , InputTextareaModule, FloatLabelModule, SplitButtonModule, MenubarModule, CardModule, MatMenuModule, DropdownModule, MatFormFieldModule,
    MatOptionModule, MatSelectModule, MatDatepickerModule, MatExpansionModule

  ],
  providers:[CapacitacionService, DialogService, MessageService, EmpleadosService, ConfirmationService, provideNativeDateAdapter()],
  templateUrl: './consultar-capacitaciones.component.html',
  styleUrl: './consultar-capacitaciones.component.css'
})
export class ConsultarCapacitacionesComponent implements OnInit, AfterViewInit{
 //Capacitacoiones Programadas
 capacitaciones: Capacitacion[]=[];
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


 //EN CSv
 cols!: Column[];
 exportColumns!: ExportColumn[];

//EN CSV CALIFICACION
 cols1!: Column[];
 exportColumns1!: ExportColumn[];



idProgramacionFecha!: number;
idProgramacionCapacitacion!: number;
validarDuplicidad: number[]=[];
suscripcionForm: FormGroup;
evaluarForm: FormGroup;
asistenciaForm: FormGroup;
calificacionEmpleado: number =0;
comentario!: string;
eval!: boolean;
calificaciones: Calificaciones[]=[];
visible: boolean = false;
 ref: DynamicDialogRef | undefined;
 
 @ViewChild('dt') dt: Table | undefined;
 @ViewChild('dtE') dtE: Table | undefined;
productDialog: boolean = false;
checked: boolean = false;
asistio!: boolean;
mostrarcalificaciones: boolean = false;
mostrarasistencia: boolean = false;
fechaDate!:Date;
verificacion: boolean = false;
asistenciadata: any[]=[];
cerrado!: boolean;

orig: string[] = [
  'Interna',
  'Externa'
];

  constructor(private _dialog: MatDialog, private capacitacionesService: CapacitacionService, private cdr: ChangeDetectorRef,
    public dialogService: DialogService, public messageService: MessageService, private empleadoService: EmpleadosService,
    private confirmationService: ConfirmationService, private fb: FormBuilder, private router: Router
  ){
    this.suscripcionForm = this.fb.group({
      NoNomina:[],
    IdProgramacionCapacitacion:[]
    });

    this.asistenciaForm = this.fb.group({
    IdProgramacionCapacitacion:[],
      NoNomina:[]
    });


    this.evaluarForm = this.fb.group({
      NoNomina:[],
      IdProgramacionCapacitacion:[],
      Calificacion: [],
      Estatus: [],
      Asistio: [],
      Comentario: []
    });

  }
  save(severity: string) {
    this.messageService.add({ severity: severity, summary: 'Success', detail: 'Data Saved' });
}


  ngAfterViewInit(): void {
      this.ngOnInit();
  }

  ngOnInit(): void {

    this.capacitacionesService.getCapacitaciones().subscribe({
      next: (data) => {
        this.capacitaciones = data;
        console.log(this.capacitaciones);
        //console.log('data');
        this.updateCalendarEvents();
        
      },
      error: (error) => {
        console.error('Error al cargar las Capacitaciones', error);
      }
    });


    this.capacitacionesService.getProgramacionCapacitaciones().subscribe({
      next: (data) => {
        this.capacitacionesprogramadas = data;
        
        //console.log('data');
        console.log(this.capacitacionesprogramadas);
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
      { field: 'NombreDepartamento', header: 'Departamento'},
      { field: 'Asistencia', header: 'Asistencia'},

  ];


  this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));


  this.cols1 = [
    { field: 'NoNomina', header: 'NoNomina'},
    { field: 'Nombre', header: 'Nombre'},
    { field: 'Apellidos', header: 'Apellidos'},
    { field: 'NombrePuesto', header: 'Puesto'},
    { field: 'NombreDepartamento', header: 'Departamento'},
    { field: 'Asistencia', header: 'Asistencia'},
    { field: 'Calificacion', header: 'Calificacion'},
    { field: 'Estatus', header: 'Evaluacion'},
    { field: 'Comentario', header: 'Comentario'},

];


this.exportColumns1 = this.cols1.map((col) => ({ title: col.header, dataKey: col.field }));

  }


  customExportCSV(dt: any) {
    const dataToExport = dt.filteredValue || dt.value; // Obtener los datos de la tabla
    const transformedData = dataToExport.map((row: any) => ({
      ...row,
      Asistencia: row.Asistencia === true ? 'Asistió' : 'No Asistió' // Transformar 1/0 a Asistió/No Asistió
    }));
  
    // Definir las columnas que se exportarán
    const cols = this.cols.map(col => col.header);
  
    // Construir CSV
    let csvContent = cols.join(',') + '\n'; // Añadir encabezados
  
    transformedData.forEach((row: any) => {
      let rowData = this.cols.map(col => row[col.field]).join(',');
      csvContent += rowData + '\n'; // Añadir cada fila
    });
  
    // Crear blob para descargar CSV con codificación UTF-8
    const blob = new Blob([`\uFEFF${csvContent}`], { type: 'text/csv;charset=utf-8;' }); // Se añade \uFEFF para asegurar UTF-8
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'asistencia_Capacitacion_'+this.programacionConsulta[0].NombreCapacitacion+'_'+this.getFechaConDiaAdicional(this.programacionConsulta[0].Fecha) +'.csv'
    a.click();
    window.URL.revokeObjectURL(url);
  }


  customExportCalificacionCSV(dt: any) {
    const dataToExport = dt.filteredValue || dt.value; // Obtener los datos de la tabla
    
    const transformedData = dataToExport.map((row: any) => ({
      ...row,
      Asistencia: row.Asistencia === true ? 'Asistió' : 'No Asistió', // Transformar 1/0 a Asistió/No Asistió
      Estatus: row.Estatus === true ? 'Aprobo' : 'No Aprobo'
    }));
  
    // Definir las columnas que se exportarán
    const cols = this.cols1.map(col => col.header);
  
    // Construir CSV
    let csvContent = cols.join(',') + '\n'; // Añadir encabezados
  
    transformedData.forEach((row: any) => {
      let rowData = this.cols1.map(col => row[col.field]).join(',');
      csvContent += rowData + '\n'; // Añadir cada fila
    });
  
    // Crear blob para descargar CSV con codificación UTF-8
    const blob = new Blob([`\uFEFF${csvContent}`], { type: 'text/csv;charset=utf-8;' }); // Se añade \uFEFF para asegurar UTF-8
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'calificaciones_Capacitacion_'+this.programacionConsulta[0].NombreCapacitacion+'_'+this.getFechaConDiaAdicional(this.programacionConsulta[0].Fecha) +'.csv'
    a.click();
    window.URL.revokeObjectURL(url);
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

      /*
      this.events.push({
        id: cap.IdProgramacionFecha,
        title: cap.NombreCapacitacion,
        start: new Date(cap.Fecha).toISOString().split('T')[0], // Convertir a ISO string para FullCalendar
        extendedProps: {
                imparte: cap.PersonaImparte
            },
        color: cap.Color
        //color: cap.EstadoProgramacionCapacitacion ? 'green' : 'red',
      });*/

      
      if(cap.FechaFin!=null && cap.FechaInicio!=null){
        //Aqui entra para mostrar en el calendario fecha inicio y fecha Fin
        this.events.push({
          id: cap.IdProgramacionFecha,
          description: cap.IdProgramacionCapacitacion,
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
        //Aqui muestra en el calendario solo la fecha inicio o la unica
        this.events.push({
          id: cap.IdProgramacionFecha,
          title: cap.NombreCapacitacion,
          description: cap.IdProgramacionCapacitacion,
          start: new Date(cap.Fecha).toISOString().split('T')[0], // Convertir a ISO string para FullCalendar
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
    
    //ID´s
    this.idProgramacionFecha = clickInfo.event.id;
    this.idProgramacionCapacitacion= Number(clickInfo.event.extendedProps.description);

    //console.log(this.idProgramacionFecha);

    this.consulta = false;
    this.verificacion = false;
    this.programacionConsulta=[];
    this.calificaciones = [];
    this.mostrarasistencia = false;
    //AQUI
    this.capacitacionesService.getsingleProgramacionCapacitacion(clickInfo.event.id).subscribe({
      next: (data) => {
        this.programacionConsulta = data;
console.log(this.programacionConsulta);

        /*console.log('Programacion Consulta');
        console.log(data);*/

        console.log(this.programacionConsulta);

        const today = new Date();

        
this.cerrado = this.programacionConsulta[0].Cerrado;


        if(this.programacionConsulta[0].Fecha!=null){
          this.fechaDate = new Date(this.programacionConsulta[0].Fecha);
        }else{
          if(this.programacionConsulta[0].FechaFin == null){
            this.fechaDate = new Date(this.programacionConsulta[0].FechaInicio);
          }else{
          this.fechaDate = new Date(this.programacionConsulta[0].FechaFin);
          }
        }
        
        

        // Agregar un día
        this.fechaDate.setDate(this.fechaDate.getDate() + 1);

        console.log(this.fechaDate);

// Formatear la fecha en un string legible
//const day = today.getDate();
    

       if(this.programacionConsulta[0].Evaluacion==true){
          this.eval=true;
          }
        else{
    //Aqui una variable o Metodo para la parte de evalua
        this.eval=false;
          }


      },
      error: (error) => {
        console.error('Error al cargar las Capacitaciones', error);
      }
    });


    //OBTENGO LAS CALIFICACIONES
this.capacitacionesService.getsingleCalificaciones(this.idProgramacionCapacitacion).subscribe({
  next:(data) =>{
    //console.log('Calificaciones');
    //console.log(data);
    this.calificaciones = data;
    
  },
  error: (error) => {
    console.error('Error al cargar las Calificaciones', error);
  }

});

//Consulto las suscripciones de los empleados a las programaciones
    this.consultar();

  }

/*getProgramaciones(idProgramacionCapacitacion: number): any{
    this.capacitacionesService.getsingleProgramaciones(idProgramacionCapacitacion).subscribe({
      next: (data) => {
        this.capacitacionessuscripciones = data;
       return this.capacitacionessuscripciones;
        
      },
      error: (error) => {
        console.error('Error al cargar las Capacitaciones', error);
      }
    });
  }*/


    cerrar(){
      this.confirmationService.confirm({
        message: '¿Está seguro de que quieres Finalizar la Capacitación?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        rejectButtonStyleClass: "p-button-text",
        acceptLabel: 'Sí',
        rejectLabel: 'No',
        accept: () => {
          
          this.capacitacionesService.concluirProgramacionCapacitacion(this.idProgramacionCapacitacion).subscribe({
            next:(data: any) =>{
              console.log(data);
              this.ngAfterViewInit();
              this.recargarCapacitacion();
            
            },
            error:(error: any) =>{
              console.log(error);
            }
          })
        },
        reject: () => {
        }
    })
    }


  consultar(){
    this.consulta = true;
    this.mostrarcalificaciones = false;
    this.validarDuplicidad = [];

    if(this.idProgramacionCapacitacion){
      this.capacitacionesService.getsingleProgramaciones(this.idProgramacionCapacitacion).subscribe({
        next: (data) => {
          //CapacitacionesProgramadas
          this.capacitacionessuscripciones = data;
          /*console.log('Capacitaciones suscripciones');
          console.log(this.capacitacionessuscripciones);*/
          
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
      message: '¿Está seguro de que desea Cancelar la programacion de este Dia?',
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
    IdProgramacionCapacitacion: Number(this.idProgramacionCapacitacion)
  })

  this.targetEmpleados.forEach(empleado => {

    this.suscripcionForm.patchValue({
      NoNomina: empleado.NoNomina
    });

//console.log(this.suscripcionForm.value);

if(this.validarDuplicidad.includes(this.suscripcionForm.value.NoNomina)){
  //console.log('Elementos duplicados');
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
    IdProgramacionCapacitacion: this.idProgramacionCapacitacion
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
  this.confirmationService.confirm({
    message: '¿Quieres Evaluar a N.Nomina-'+ this.NoNominaEvaluar + ' con esta calificacion: '+this.calificacionEmpleado+'?',
    header: 'Confirmación',
    icon: 'pi pi-exclamation-triangle',
    rejectButtonStyleClass: "p-button-text",
    rejectLabel: 'No',
    acceptLabel: 'Sí',
    accept: () => {
      
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

    },
    reject: () => {
     
    }
})



  
  
}

calificacionesMostrar(){
this.mostrarcalificaciones = true;
this.mostrarasistencia = false,
this.consulta = false;
this.calificaciones=[];

this.capacitacionesService.getsingleCalificaciones(this.idProgramacionCapacitacion).subscribe({
  next:(data) =>{
    //console.log('Calificaciones');
    //console.log(data);
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

asistenciaMostrar(){
  this.mostrarcalificaciones = false;
this.mostrarasistencia = true,
this.consulta = false;

/*
this.calificaciones=[];

this.capacitacionesService.getsingleCalificaciones(this.idProgramacionCapacitacion).subscribe({
  next:(data) =>{
    //console.log('Calificaciones');
    //console.log(data);
    this.calificaciones = data;
    
  },
  error: (error) => {
    console.error('Error al cargar las Calificaciones', error);
  }

});*/

}

 
resetEvaluarForm(){
  this.calificacionEmpleado = 0;
  this.comentario = '';
};

Asistencia(NoNomina: Number){

  this.asistenciaForm.patchValue({
    IdProgramacionCapacitacion: Number(this.idProgramacionCapacitacion),
    NoNomina: NoNomina
  });

  this.capacitacionesService.addAsistencia(this.asistenciaForm.value).subscribe({
    next: (resp: any) => {
      this.messageService.add({ severity: 'success', summary: 'Asistencia', detail: 'Asistencia Agregada Exitosamente', life: 1500 });
      this.consultar();
  },
  error: (err: any) => {
      console.error('Error: ' + err);
  }
  });

}

editarCapacitacion(){
  if(this.idProgramacionCapacitacion){
    this.router.navigate(['system/updateCapacitacion/'+this.idProgramacionCapacitacion]);
  }
}


recargarCapacitacion(){
  this.mostrarasistencia = false;
  this.mostrarcalificaciones = false;
 this.consulta = false;
    this.verificacion = false;
    this.programacionConsulta=[];
    this.calificaciones = [];
    //AQUI
    this.capacitacionesService.getsingleProgramacionCapacitacion(this.idProgramacionFecha).subscribe({
      next: (data) => {
        this.programacionConsulta = data;
console.log(this.programacionConsulta);

        /*console.log('Programacion Consulta');
        console.log(data);*/

        console.log(this.programacionConsulta);

        const today = new Date();

        
this.cerrado = this.programacionConsulta[0].Cerrado;


        if(this.programacionConsulta[0].Fecha!=null){
          this.fechaDate = new Date(this.programacionConsulta[0].Fecha);
        }else{
          if(this.programacionConsulta[0].FechaFin == null){
            this.fechaDate = new Date(this.programacionConsulta[0].FechaInicio);
          }else{
          this.fechaDate = new Date(this.programacionConsulta[0].FechaFin);
          }
        }
        
        

        // Agregar un día
        this.fechaDate.setDate(this.fechaDate.getDate() + 1);

        console.log(this.fechaDate);

// Formatear la fecha en un string legible
//const day = today.getDate();
    

       if(this.programacionConsulta[0].Evaluacion==true){
          this.eval=true;
          }
        else{
    //Aqui una variable o Metodo para la parte de evalua
        this.eval=false;
          }


      },
      error: (error) => {
        console.error('Error al cargar las Capacitaciones', error);
      }
    });


    //OBTENGO LAS CALIFICACIONES
this.capacitacionesService.getsingleCalificaciones(this.idProgramacionCapacitacion).subscribe({
  next:(data) =>{
    //console.log('Calificaciones');
    //console.log(data);
    this.calificaciones = data;
    
  },
  error: (error) => {
    console.error('Error al cargar las Calificaciones', error);
  }

});

//Consulto las suscripciones de los empleados a las programaciones
    this.consultar();


}
}
