import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { DatosPuestosComponent } from '../../../../../frontend/datos-puestos/datos-puestos.component';




@Component({
  selector: 'app-puesto-component',
  standalone: true,
  imports: [DatosPuestosComponent, HeaderComponent, MatButtonModule,
    MatCardModule
  ],
  templateUrl: './puesto-component.component.html',
  styleUrl: './puesto-component.component.css'
})
export class PuestoComponentComponent {

}
