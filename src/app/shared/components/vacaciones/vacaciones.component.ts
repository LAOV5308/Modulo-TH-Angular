import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
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
import { EmpleadosService } from '../../../../../backend/ConexionDB/empleados.service';
import { Empleado } from '../../../../../backend/models/empleado.model';
import { VacacionesService } from '../../../../../backend/ConexionDB/vacaciones.service';
import { Vacacion } from '../../../../../backend/models/vacacion.model';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-vacaciones',
  standalone: true,
  imports:[CommonModule, NgFor, CalendarModule, FullCalendarModule, CardModule,
    MatIconModule, RouterModule, MatButtonModule, FormsModule, InputNumberModule, DialogModule, ReactiveFormsModule, InputTextareaModule,
    KeyFilterModule, ButtonModule, InputTextModule, TableModule, ConfirmDialogModule, ToastModule
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
vacaciones: Vacacion[]=[];

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
      Comentarios: ['']
    });
    this.consultaForm = this.fb.group({
      NoNomina: ['', Validators.required],
      FechaInicio: [''],
      FechaFin: ['']
    });
   }

  ngOnInit() {
    this.empleadosService.getEmpleados().subscribe({
      next:(data: any)=>{
        console.log(data);
        this.empleados = data;
      },
      error:(err: any)=>{
        console.log('Error', err);
      }
    });
    
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
    this.visible=true;
  }
  cerrar(){
    this.visible = false;
  }


  limpiar(){
    this.formattedDates = '';
  }
  formatSelectedDates() {
    console.log(this.dates);

    if(this.dates == undefined){
      this.formattedDates = '';
    }
    else{
      // Formatear las fechas seleccionadas
      this.formattedDates = '';
      if(this.dates != undefined){
        this.dates.forEach(element => {
          this.formattedDates = this.formattedDates+' '+this.datePipe.transform(element, 'dd/MM/yyyy')+', '
        });
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
  this.empleadosService.getEmpleado(this.NoNomina).subscribe({
    next:(data:any) =>{
      this.empleados = data;
      console.log(this.empleados);
    },
    error:(err: any) =>{
      console.log('Error ', err);
    }
  });
  

if(this.empleados.length != 0){
  
  if(this.date1!=undefined && this.date2!=undefined){
    this.consultaForm.patchValue({
      NoNomina: this.NoNomina,
      FechaInicio: this.date1,
      FechaFin: this.date2
    });

    console.log(this.consultaForm.value);
    this.vacacionesService.getVacacionesRango(this.consultaForm.value).subscribe({
      next:(data: Vacacion[]) => {
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
    this.vacacionesService.getVacaciones(this.NoNomina).subscribe({
    next:(data: Vacacion[]) => {
      this.vacaciones = data;
    },
    error:(err: any) => {
      console.log('Error', err);
    }
  })
  }
  
}else{alert('No Existe Empleado')};

}

 OnSubmit(){


    this.vacacionForm.patchValue({
      NoNomina: this.NoNomina,
    });

    this.vacacionForm.patchValue({
      Comentarios: this.comentarios
    })

    /*if(this.comentarios){
      this.vacacionForm.patchValue({
        Comentarios: this.comentarios
      })
    }*/

    console.log(this.vacacionForm.value);
    alert(this.dates?.length);
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

 }

 CancelarVacacion(IdVacacion: number){
  this.confirmationService.confirm({
    message: '¿Está seguro de que desea Cancelar la programacion de este Dia?',
    header: 'Confirmación',
    icon: 'pi pi-exclamation-triangle',
    rejectButtonStyleClass: "p-button-text",
    accept: () => {
      this.vacacionesService.deleteVacacion(IdVacacion).subscribe({
        next:()=>{
          this.messageService.add({ severity: 'success', summary: 'Satisfactorio', detail: 'Eliminado Con exito' });
          this.ConsultarFechas();
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

 


}
