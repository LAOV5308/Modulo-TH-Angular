import { Component, OnInit } from '@angular/core';
import { Empleado } from '../../../backend/models/empleado.model';
import { HttpClientModule, provideHttpClient, withFetch  } from '@angular/common/http';
import { EmpleadosService } from '../../../backend/ConexionDB/empleados.service';
import { NgFor, DatePipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';


@Component({
  selector: 'app-datos',
  standalone: true,
  imports: [HttpClientModule,
    NgFor, DatePipe, MatButton, MatExpansionModule
  ],
  providers: [EmpleadosService],
  templateUrl: './datos.component.html',
  styleUrl: './datos.component.css'
})
export class DatosComponent implements OnInit{
  empleados: Empleado[] = [];

  constructor(private empleadosService: EmpleadosService) { }

  ngOnInit() {
    this.empleadosService.getEmpleados().subscribe({
      next: (data) => {
        this.empleados = data;
      },
      error: (error) => {
        console.error('Error al cargar los empleados', error);
      }
    });
  }

  hola(){
    window.alert("Hola Mundo ++");
  }
  editar(){
    window.alert("Editar");
  }
  eliminar(){
    window.alert("Elimina");
    console.log("Eliminar");
  }
}
