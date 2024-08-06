import { Component, OnInit } from '@angular/core';

import { MatCard, MatCardHeader, MatCardModule } from '@angular/material/card';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MeterGroupModule } from 'primeng/metergroup';
import { EmpleadosService } from '../../../../../backend/ConexionDB/empleados.service';
import { Empleado } from '../../../../../backend/models/empleado.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCard, MatCardHeader, MatCardModule,
    BaseChartDirective, MeterGroupModule],
    providers:[EmpleadosService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  empleados: Empleado[] = [];
  CantidadEmpleados: number = 0;
  Masculino!: number;
  Femenino!: number;
  value:any=[];


  constructor(private empleadosService: EmpleadosService){
    
  }

  ngOnInit(): void {
    this.Masculino = 0;
    this.Femenino = 0;
    this.empleadosService.getEmpleados().subscribe({
      next: (data) => {
        this.empleados = data;
        this.CantidadEmpleados = this.empleados.length;
        this.empleados.forEach(element => {
          if(element.Sexo == 'Masculino'){
            this.Masculino++;
          }
          if(element.Sexo == 'Femenino'){
            this.Femenino++;
          }
          
        });


      },
      error: (err) => {
        console.log('Error'+err);
      }

    });

    this.value = [
      { label: 'Hombres', color: '#50b8c5', value: this.calcular(this.CantidadEmpleados,this.Masculino), icon: 'pi pi-mars' },
      { label: 'Mujeres', color: '#be70e6', value: this.calcular(this.CantidadEmpleados,this.Femenino), icon: 'pi pi-venus' },
  ];

  }

  calcular(total:number, cantidad:number): number{
    return (100/total)*cantidad
  }

  public barChartOptions: ChartOptions = {
    responsive: false,
  };
  
  public barChartLabels: string[] = ['2018', '2019', '2020', '2021', '2022', '2023', '2024'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartDataset<'bar'>[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Produccion' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Diseño y Desarrollo' },
    { data: [30, 18, 60, 14, 45, 17, 50], label: 'Controloria' },
    { data: [13, 2, 50, 34, 23, 47, 34], label: 'Ingenieria' }
  ];

}
