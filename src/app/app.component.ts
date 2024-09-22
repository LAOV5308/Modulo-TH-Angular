import { Component, OnInit , HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { DatosComponent } from '../../frontend/Datos/datos/datos.component';
import { HttpClientModule } from '@angular/common/http';  // Asegúrate de importar HttpClientModule
import { LoginComponent } from './shared/components/Login/login.component';
import { NgIf } from '@angular/common';
import { FilterMatchMode,PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    MatButtonModule,
    LoginComponent,
    DatosComponent,
    HttpClientModule,
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'modulo-th';

  constructor(private primengConfig: PrimeNGConfig){
    this.primengConfig.csp.set({nonce: '...'});

  }
  ngOnInit(): void {
    this.primengConfig.ripple = false;

    this.primengConfig.setTranslation({
      accept: 'Aceptar',
      reject: 'Cancelar',
      choose: 'Seleccionar',
      lt: 'Menor que',
      lte: 'Menor o igual que',
      gt: 'Mayor que',
      gte: 'Mayor o igual que',
      dayNames:['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      dayNamesShort:['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
      dayNamesMin:['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
      monthNames: [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ],
    monthNamesShort: [
      'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
      'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ],
  today: 'Hoy',
  clear: 'Limpiar'
    });

    this.primengConfig.zIndex = {
      modal: 1100,
      overlay: 1000,
      menu: 1000,
      tooltipo: 1100
    };

    this.primengConfig.filterMatchModeOptions = {
      text: [FilterMatchMode.STARTS_WITH, FilterMatchMode.CONTAINS, FilterMatchMode.NOT_CONTAINS, FilterMatchMode.ENDS_WITH, FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS],
      numeric: [FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS, FilterMatchMode.LESS_THAN, FilterMatchMode.LESS_THAN_OR_EQUAL_TO, FilterMatchMode.GREATER_THAN, FilterMatchMode.GREATER_THAN_OR_EQUAL_TO],
      date: [FilterMatchMode.DATE_IS, FilterMatchMode.DATE_IS_NOT, FilterMatchMode.DATE_BEFORE, FilterMatchMode.DATE_AFTER]
  };

  }

  
    

  
  /*
  isLoggedIn(){
    return false;
  }

  sidebarVisible: boolean = true;

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      if (this.sidebarVisible) {
        sidebar.classList.remove('hidden');
      } else {
        sidebar.classList.add('hidden');
      }
    }
  }
  
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const sidebar = document.querySelector('.sidebar');
    const header = document.querySelector('app-header');
  
    if (sidebar && header && !sidebar.contains(event.target as Node) && !header.contains(event.target as Node)) {
      this.sidebarVisible = false;
      sidebar.classList.add('hidden');
    }
  }*/

}
