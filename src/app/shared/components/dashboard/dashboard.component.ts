import { Component } from '@angular/core';

import { MatCard, MatCardHeader, MatCardModule } from '@angular/material/card';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCard, MatCardHeader, MatCardModule,
    BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  
  public barChartLabels: string[] = ['2018', '2019', '2020', '2021', '2022', '2023', '2024'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartDataset<'bar'>[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Produccion' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Diseño y Desarrollo' },
    { data: [30, 18, 60, 14, 45, 17, 50], label: 'Controloria' }
  ];

}
