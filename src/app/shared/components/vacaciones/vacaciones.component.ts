import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { FullCalendarModule } from '@fullcalendar/angular'; // FullCalendar module
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es'; // Importa el archivo de localización en español
import { CardModule } from 'primeng/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { EmpleadosService } from '../../../../../backend/services/empleados.service';
import { Empleado } from '../../../../../backend/models/empleado.model';
import { VacacionesService } from '../../../../../backend/services/vacaciones.service';
import { DiasDisponibles, FechaVacacion, Vacacion } from '../../../../../backend/models/vacacion.model';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';

interface Periodo {
  label: string;
  value: string;
  diasRestantes: number;
}

@Component({
  selector: 'app-vacaciones',
  standalone: true,
  imports:[CommonModule, NgFor, CalendarModule, FullCalendarModule, CardModule,
    MatIconModule, RouterModule, MatButtonModule, FormsModule, InputNumberModule, DialogModule, ReactiveFormsModule, InputTextareaModule,
    KeyFilterModule, ButtonModule, InputTextModule, TableModule, ConfirmDialogModule, ToastModule, DropdownModule, NgIf, SelectButtonModule
  ],
  providers:[MessageService, DatePipe, EmpleadosService, VacacionesService, ConfirmationService],
  templateUrl: './vacaciones.component.html',
  styleUrls: ['./vacaciones.component.css']
})


export class VacacionesComponent implements OnInit {
  date1: Date | undefined;
  date2: Date | undefined;
  dates: Date[] | undefined;
  comentarios: string | undefined;
  empleados: Empleado[] = [];
  vacacionForm: FormGroup;
  consultaForm: FormGroup;
  formattedDates: null | string = '';
  NoNomina: number | undefined;
  visible:boolean = false;
  btnAgregar: boolean = false;
vacaciones: FechaVacacion[]=[];
consultavacaciones: Vacacion[]=[];
vacacionesPeriodo: Vacacion[]=[];
PeriodosPrueba: Periodo[] = [];
DiasDisponibles!: number;
DiasRestantes!: number;
DiasDeLey!: number;
desactivarCalendario: boolean = true;
desactivarPeriodos: boolean = false;
IdVacacion!: number;
diasVacacionesDisponibles: number = 0;
todosDiasDisponibles: DiasDisponibles[]=[];

Opciones: string[] = ['2020', '2021', '2022', '2023', '2024'];
opcionSeleccionada: string = '';
  /*vacaciones:any[]=[
    {code:'123', name:'Luis', category:'Algo', quantity:'Pesos'},
    {code:'43', name:'Ortiz', category:'Queso', quantity:'Dolares'}
  ];*/

  constructor(private datePipe: DatePipe, private empleadosService: EmpleadosService, private fb: FormBuilder,
    private vacacionesService: VacacionesService, private confirmationService: ConfirmationService, private messageService: MessageService
  ) {
    this.vacacionForm = this.fb.group({
      NoNomina: ['', Validators.required],
      Fecha: ['', Validators.required],
      Comentarios: [''],
      Periodo:[''],
      IdVacacion:['']
    });
    this.consultaForm = this.fb.group({
      NoNomina: ['', Validators.required],
      FechaInicio: [''],
      FechaFin: ['']
    });
   }


obtenerVacacion(Periodo: string){

  console.log(this.NoNomina +' '+ Periodo);
  this.vacacionesService.getVacaciones(this.NoNomina, Periodo).subscribe({
    next:(data: any) => {
console.log(data);
this.vacacionesPeriodo = data;
this.IdVacacion = this.vacacionesPeriodo[0].IdVacacion;
this.DiasDisponibles = this.vacacionesPeriodo[0].DiasDisponibles;
this.DiasDeLey = this.vacacionesPeriodo[0].DiasVacaciones;
this.DiasRestantes = this.DiasDisponibles;
this.desactivarCalendario = false;
this.desactivarPeriodos = true;
    },
    error:(err: any) => {
      console.log('Error: ', err);
    },
  })

}
  ngOnInit() {

    /*
    
    this.empleadosService.getEmpleados().subscribe({
      next:(data: any)=>{
        console.log(data);
        this.empleados = data;
      },
      error:(err: any)=>{
        console.log('Error', err);
      }
    });

    alert(this.empleados[0].Aniversario);

    */


    
  };

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

  handleDateClick(arg: any) {
    if(arg.event!=undefined){
     // alert('date click! ' + arg.event);
    }
  }

  handleEventClick(clickInfo: any) {
    
  }
  showDialog(){
    
    console.log(this.NoNomina, this.opcionSeleccionada);

    this.vacacionesService.getVacacionesPeriodo(this.NoNomina).subscribe({
      next: (data: any)=> {
        this.PeriodosPrueba = [];
        this.consultavacaciones = data;
        console.log(this.consultavacaciones);
        
        this.consultavacaciones.forEach(element => {
          console.log(element);
          const nuevoPeriodo: Periodo = {
            value: element.Periodo,
            label: element.Periodo+': Disponibles: ' + element.DiasDisponibles + ' Dias',
            diasRestantes: element.DiasDisponibles
          };
          
          // Agregar el nuevo objeto al array PeriodosPrueba
          this.PeriodosPrueba.push(nuevoPeriodo);
          
        });


        console.log(this.PeriodosPrueba);
       
        //console.log(this.consultavacaciones[0].DiasDisponibles);
      },
      error: (err: any)=> {
        console.log('Error ', err)
      },
    })

    //console.log(this.Periodos.length);
    console.log(this.consultavacaciones.length);
    this.visible=true;
  }
  cerrar(){
    this.visible = false;
  }

  
  limpiar(){
    this.formattedDates = '';
    this.DiasRestantes = this.DiasDisponibles;
  }

  formatSelectedDates() {
    console.log(this.dates);
    console.log(this.dates?.length);

    if(this.dates == undefined){
      this.formattedDates = '';
      this.DiasRestantes = this.DiasDisponibles;
    }
    else{
      // Formatear las fechas seleccionadas
      this.formattedDates = '';
      if(this.dates != undefined){
        this.dates.forEach(element => {
          this.formattedDates = this.formattedDates+' '+this.datePipe.transform(element, 'dd/MM/yyyy')+', '
        });
      }

      if(this.DiasDisponibles < this.dates?.length){
        alert('Ya no hay dias');
        
      }else{
        this.DiasRestantes = this.DiasDisponibles
        this.DiasRestantes = this.DiasRestantes - this.dates?.length;
        //alert(this.DiasRestantes);
        if(this.DiasDisponibles == this.dates.length){
          this.desactivarCalendario = true;
        }
      }
      

      
    }
  }

  getFormatoFecha(fecha: Date): any {
    const newfech = new Date(fecha).toISOString().split('T')[0]
     return newfech;
   }
   
    getFechaConDiaMas(fecha: Date): any {
    const nuevaFecha = new Date(fecha);
    nuevaFecha.setDate(nuevaFecha.getDate() + 1); // Agregar un día
    const newfech = nuevaFecha.toISOString().split('T')[0];
    return newfech;
 }

ConsultarFechas(){
  /**
   * Si NO HAY FECHA INICIO O Fecha Fin
   * Todos
   * Si hay
   * Procedimiento almacenado
   * de Inicio y Fin
   */

this.reiniciar();
this.diasVacacionesDisponibles = 0;
if(this.NoNomina != undefined){
  this.empleadosService.getEmpleado(this.NoNomina).subscribe({
    next:(data:any) =>{

      this.vacacionesService.getDiasVacaciones(this.NoNomina).subscribe({
        next:(data: any) => {
          console.log(data);
          this.todosDiasDisponibles = data;
          this.diasVacacionesDisponibles = this.todosDiasDisponibles[0].DiasDisponibles;
          console.log(this.diasVacacionesDisponibles);
        },
        error:(err: any) => {
          console.log('Error ', err);
        }

      })
      this.empleados = data;

if(this.empleados.length > 0){
  console.log(this.empleados[0].Vacaciones);
  if(this.empleados[0].Vacaciones){

    this.btnAgregar = true;
  if(this.date1!=undefined && this.date2!=undefined){
    this.consultaForm.patchValue({
      NoNomina: this.NoNomina,
      FechaInicio: this.date1,
      FechaFin: this.date2
    });

    console.log(this.consultaForm.value);
    this.vacacionesService.getVacacionesRango(this.consultaForm.value).subscribe({
      next:(data: FechaVacacion[]) => {
        console.log(data);
        this.vacaciones = data;
      },
      error:(err: any) => {
        console.log('Error ', err);
      },
    })



  }else{
    //Todas Las Vacaciones del Colaborador
    console.log(this.date1 +' -- ' + this.date2);
    this.vacacionesService.getFechasVacaciones(this.NoNomina).subscribe({
    next:(data: FechaVacacion[]) => {
      this.vacaciones = data;
      console.log(this.vacaciones);
    },
    error:(err: any) => {
      console.log('Error', err);
    }
  })
  }

  }else{
    //this.messageService.add({ severity: 'error', summary: 'No hay Vacaciones', detail: 'Empleado Aun No tiene Vacaciones', sticky: true });
    this.confirmationService.confirm({
      message: 'Empleado Aun NO Cumple con el Primer Aniversario',
      header: 'No Cumple Aniversario',
      icon: 'pi pi-calendar-times',
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
      },
      reject: () => {
      }
  })
    this.vacaciones = [];
  this.btnAgregar = false;

  }

  

  
}else{
  this.messageService.add({ severity: 'error', summary: 'No Hay Vacaciones del empleado', detail: 'No hay Vacaciones' });
  this.vacaciones = [];
  this.btnAgregar = false;
};
    },
    error:(err: any) =>{
      console.log('Error ', err);
      //this.messageService.add({ severity: 'error', summary: 'No Hay Vacaciones del empleado', detail: 'No hay Vacaciones' });
    }
  });

}else{
  this.messageService.add({ severity: 'info', summary: 'Agrega No. Nomina', detail: 'No hay No. Nomina' });
  this.vacaciones = [];
  this.empleados = [];
  this.btnAgregar = false;

}
}



 OnSubmit(){
  //
    this.vacacionForm.patchValue({
      NoNomina: this.NoNomina,
      Comentarios: this.comentarios,
      Periodo: this.opcionSeleccionada,
      IdVacacion: this.IdVacacion
    });

    /*this.vacacionForm.patchValue({
      Comentarios: this.comentarios
    })*/

    /*if(this.comentarios){
      this.vacacionForm.patchValue({
        Comentarios: this.comentarios
      })
    }*/

    console.log(this.vacacionForm.value);
    
    this.dates?.forEach(fecha => {
      this.vacacionForm.patchValue({
        Fecha: fecha,
      });

      console.log(this.vacacionForm.value);
 this.vacacionesService.addVacacion(this.vacacionForm.value).subscribe({
      next:(data: any)=>{
        this.ConsultarFechas();
      console.log(data);
      },
      error:(err: any)=>{
        console.log('Error', err)
      }
    });
    });

    //Actualizar la vacacion 
    console.log(this.IdVacacion,this.DiasRestantes, (this.DiasDeLey - this.DiasRestantes));
    this.vacacionesService.updateDiasVacaciones(this.IdVacacion,this.DiasRestantes, (this.DiasDeLey - this.DiasRestantes)).subscribe({
      next:(data: any)=>{
       //console.log(data);
      this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Vacacion Agregada con Exito' });
      this.showDialog();

      //this.obtenerVacacion(this.opcionSeleccionada);

      },
      error:(err: any)=>{
        console.log('Error', err)
      }
    })

 }

 CancelarVacacion(IdFechaVacacion: number, IdVacacion: number){

  this.confirmationService.confirm({
    message: '¿Está seguro de que desea Cancelar la programacion de este Dia?',
    header: 'Confirmación',
    icon: 'pi pi-exclamation-triangle',
    rejectButtonStyleClass: "p-button-text",
    accept: () => {
      this.vacacionesService.deleteVacacion(IdFechaVacacion).subscribe({
        next:()=>{
          this.vacacionesService.incrementarDiasVacaciones(IdVacacion).subscribe({
            next:()=>{
              this.messageService.add({ severity: 'success', summary: 'Satisfactorio', detail: 'Eliminado Con exito' });
              this.ConsultarFechas();
            },
            error:(err: any)=>{
              console.log('Error', err);
            }
          })
        },
        error:(err: any)=>{
          console.log('Error', err);
        }
      })
    },
    reject: () => {
    }
})

 }


 reiniciar(){
  this.formattedDates = '';
  this.opcionSeleccionada = '';
  this.desactivarCalendario= true;
this.desactivarPeriodos= false;
this.DiasDisponibles = 0;
this.dates = [];
this.comentarios = '';
this.vacacionesPeriodo = [];
 }

 addOneDay(dateString: any): Date {
  const fecha = new Date(dateString);
  fecha.setDate(fecha.getDate() + 1);
  return fecha;
}


}
