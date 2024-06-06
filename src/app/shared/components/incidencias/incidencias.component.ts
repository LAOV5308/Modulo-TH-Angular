import { Component } from '@angular/core';
import { DatosIncidenciaComponent } from './datos-incidencia/datos-incidencia.component';

@Component({
  selector: 'app-incidencias',
  standalone: true,
  imports: [DatosIncidenciaComponent],
  templateUrl: './incidencias.component.html',
  styleUrl: './incidencias.component.css'
})
export class IncidenciasComponent {

}
