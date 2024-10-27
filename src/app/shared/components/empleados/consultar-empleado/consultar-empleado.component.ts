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
import {jsPDF} from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';

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

  /*sumarUnDia(fecha: Date): Date {
    let nuevaFecha = new Date(fecha);
    nuevaFecha.setDate(nuevaFecha.getDate() + 1);
    return nuevaFecha;
  }*/

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

  imprimir(Id: string){
    const chartElement = document.getElementById(Id);
  if (chartElement) {
    html2canvas(chartElement).then(canvas => {
      const doc = new jsPDF({
        orientation: 'landscape',  // Establecer orientación horizontal
      });
      const img1 = new Image();
      const img2 = new Image();
      img1.src = 'assets/famo.png'; // Ruta de tu primera imagen local
      img2.src = 'assets/logo.png'; // Ruta de tu segunda imagen local
       // Agregar la primera imagen al PDF en la esquina superior izquierda
    doc.addImage(img1, 'PNG', 10, 10, 20, 10); // Coordenadas x, y y dimensiones width, height
    // Agregar la segunda imagen al PDF en la esquina superior derecha
    doc.addImage(img2, 'PNG', 250, 10, 20, 20); // Coordenadas x, y y dimensiones width, height
    const imgData = canvas.toDataURL('image/png');
    doc.addImage(imgData, 'PNG', 40, 20, 200, 160); // Ajusta las coordenadas y tamaño
    const now = new Date();
    const dateStr = now.toLocaleDateString();
    const timeStr = now.toLocaleTimeString();
    // Agregar la fecha y hora en la parte inferior del documento
    doc.text(`Fecha de impresión: ${dateStr}`, 10, 190);
    doc.text(`Hora de impresión: ${timeStr}`, 10, 200);
    // Formatear la fecha para el nombre del archivo
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Los meses son de 0 a 11
    const year = now.getFullYear();
    const fileName = `Information ${this.NoNomina.toString()}_${day}_${month}_${year}.pdf`;
    // Guardar el PDF con el nombre dinámico
    doc.save(fileName)

    });
  } else {
    console.error('No se encontró el gráfico para imprimir');
  }
  }

}
