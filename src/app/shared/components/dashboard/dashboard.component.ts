import { Component } from '@angular/core';

import { MatCard, MatCardHeader, MatCardModule } from '@angular/material/card';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MeterGroupModule } from 'primeng/metergroup';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCard, MatCardHeader, MatCardModule,
    BaseChartDirective, MeterGroupModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  value = [
    { label: 'Mujeres', color: '#be70e6', value: 65, icon: 'pi pi-venus' },
    { label: 'Hombres', color: '#50b8c5', value: 43, icon: 'pi pi-mars' },
];

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
