import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';  // Importante para manejar la navegación
import { HeaderComponent } from '../header/header.component';
import { DatosComponent } from '../../../../../frontend/Datos/datos/datos.component';


@Component({
  selector: 'app-system',
  standalone: true,
  imports: [MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    RouterModule,
    HeaderComponent,
    DatosComponent
  ],
  templateUrl: './system.component.html',
  styleUrl: './system.component.css'
})
export class SystemComponent {

}
