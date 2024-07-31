import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { MessageService } from 'primeng/api';
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

@Component({
  selector: 'app-vacaciones',
  standalone: true,
  imports:[CommonModule, NgFor, CalendarModule, FullCalendarModule, CardModule,
    MatIconModule, RouterModule, MatButtonModule
  ],
  providers:[MessageService],
  templateUrl: './vacaciones.component.html',
  styleUrls: ['./vacaciones.component.css']
})
export class VacacionesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
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

}
