import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DatosCapacitacionesComponent } from './datos-capacitaciones/datos-capacitaciones.component';



@Component({
  selector: 'app-capacitaciones',
  standalone: true,
  imports: [MatButtonModule, DatosCapacitacionesComponent],
  templateUrl: './capacitaciones.component.html',
  styleUrl: './capacitaciones.component.css'
})
export class CapacitacionesComponent {

}
