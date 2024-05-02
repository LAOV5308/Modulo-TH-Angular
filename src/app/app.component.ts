import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { LoginComponent } from '../../frontend/login/login.component';
import { DatosComponent } from '../../frontend/Datos/datos/datos.component';
import { DataService } from '../../backend/ConexionDB/data.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    MatButtonModule,
    LoginComponent,
    DatosComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'modulo-th';
}
