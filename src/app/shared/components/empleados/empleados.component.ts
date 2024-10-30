import { Component, OnInit } from '@angular/core';
import { DatosComponent } from './Datos/datos.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { EmpleadosService } from '../../../../../backend/services/empleados.service';


@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [
    DatosComponent,
    MatButtonModule,
    MatCardModule
  ],
  providers:[EmpleadosService],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})
export class EmpleadosComponent implements OnInit{

  constructor(
  ){

  }


  ngOnInit(): void {
    
  }



}
