import { Component, OnInit , HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { DatosComponent } from '../../frontend/Datos/datos/datos.component';
import { DataService } from '../../backend/ConexionDB/data.service';
import { SystemComponent } from './shared/components/system/system.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { CreateEmpleadoComponent } from './shared/components/empleados/create-empleado/create-empleado.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';  // Asegúrate de importar HttpClientModule
import { LoginComponent } from './shared/components/Login/login.component';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    MatButtonModule,
    LoginComponent,
    DatosComponent,
    SystemComponent,
    HeaderComponent,
    CreateEmpleadoComponent,
    SidebarComponent,
    HttpClientModule,
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'modulo-th';

  
  isLoggedIn(){
    return false;
  }

}
