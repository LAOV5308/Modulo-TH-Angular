import { Component, OnInit , HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';

import { HttpClientModule } from '@angular/common/http';  // Asegúrate de importar HttpClientModule

import { DatosComponent } from '../../../../../frontend/Datos/datos/datos.component';
import { DataService } from '../../../../../backend/ConexionDB/data.service';
import { HeaderComponent } from '../header/header.component';
import { CreateEmpleadoComponent } from '../empleados/create-empleado/create-empleado.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { LoginComponent } from '../Login/login.component';


@Component({
  selector: 'app-system',
  standalone: true,
  imports: [MatButtonModule,
    HeaderComponent,
    DatosComponent,
    SidebarComponent,
    RouterOutlet,
    HttpClientModule
  ],
  templateUrl: './system.component.html',
  styleUrl: './system.component.css'
})
export class SystemComponent {

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
  }

}
