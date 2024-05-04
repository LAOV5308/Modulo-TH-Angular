import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { LoginComponent } from '../../frontend/login/login.component';
import { DatosComponent } from '../../frontend/Datos/datos/datos.component';
import { DataService } from '../../backend/ConexionDB/data.service';
import { SystemComponent } from './shared/components/System/system.component';
import { HeaderComponent } from './shared/components/Header/header.component';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    MatButtonModule,
    LoginComponent,
    DatosComponent,
    SystemComponent,
    HeaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'modulo-th';
}
