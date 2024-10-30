import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { DatosPuestosComponent } from './datos-puestos/datos-puestos.component';




@Component({
  selector: 'app-puesto-component',
  standalone: true,
  imports: [DatosPuestosComponent, MatButtonModule,
    MatCardModule
  ],
  templateUrl: './puesto-component.component.html',
  styleUrl: './puesto-component.component.css'
})
export class PuestoComponentComponent {

}
