import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../../../../../../backend/services/empleados.service';
import { Empleado } from '../../../../../../backend/models/empleado.model';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Router, RouterModule } from '@angular/router';// Importante para manejar la navegación


import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-consultar-empleado',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatGridListModule, MatIconModule, MatButtonModule, RouterModule],
  providers: [EmpleadosService],
  templateUrl: './consultar-empleado.component.html',
  styleUrl: './consultar-empleado.component.css'
})
export class ConsultarEmpleadoComponent implements OnInit{
  empleado : Empleado[]=[];
  NoNomina: number = 0;

  constructor(private _empleadosService: EmpleadosService,
    public route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {

    this.route.paramMap.subscribe((paramMap: ParamMap) =>{
      //console.log(paramMap.has('NoNomina'));
    if(paramMap.has('NoNomina')){
      this.NoNomina = Number(paramMap.get('NoNomina'));
      }
    });
   // console.log(this.NoNomina);
    
    this._empleadosService.getEmpleado(this.NoNomina).subscribe({
      next: (data) => {
        
        //this.employeeForm.patchValue(data);
        //console.log(data);
        this.empleado = data;
        //this.empleados.push(data);
      },
      error: (error) => {
        console.error('Error al cargar los departamentos', error);
      }
      
    });
    
  }

  sumarUnDia(fecha: Date): Date {
    let nuevaFecha = new Date(fecha);
    nuevaFecha.setDate(nuevaFecha.getDate() + 1);
    return nuevaFecha;
}

  dias(dias: number): string {
    const diasPorAño = 365;
    const diasPorMes = 30;
    // Calcula los años y meses
    const años = Math.floor(dias / diasPorAño);
    const meses = Math.floor((dias % diasPorAño) / diasPorMes);
  
    // Construye el resultado dependiendo de los años y meses
    let resultado = '';
  
    if (años > 0) {
      resultado += `${años} Año${años > 1 ? 's' : ''}`;
    }
  
    if (meses > 0) {
      if (años > 0) {
        resultado += ' ';
      }
      resultado += `${meses} Mes${meses > 1 ? 'es' : ''}`;
    }
  
    return resultado || '0 Meses'; // En caso de que los días sean 0
  }

}
