import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from '@angular/material/core';


import { MatCard, MatCardHeader, MatCardModule } from '@angular/material/card';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import {Chart, Colors } from 'chart.js';

import { ChartModule } from 'primeng/chart';
import { BaseChartDirective } from 'ng2-charts';
import { MeterGroupModule } from 'primeng/metergroup';
import { EmpleadosService } from '../../../../../backend/services/empleados.service';
import { Empleado } from '../../../../../backend/models/empleado.model';
import { Departamento } from '../../../../../backend/models/departamento.model';
import { DepartamentosService } from '../../../../../backend/services/departamentos.service';
import { DashboardService } from '../../../../../backend/services/dashboard.service';
import { D_Bajas, D_CambiosPorDepartamento, D_CapacitacionesPeriodo, D_ContratacionesPeriodo, D_Departamentos, D_Edades, D_EstadoCivil, D_IncidenciasPeriodo, D_IncidenciasPorDepartamento, D_RangoAntiguedad, D_SalidasEdades, D_SumaIncidenciasPorDepartamento, D_HorasCapacitacionDepartamento } from '../../../../../backend/models/dashboard.model';
import { IncidenciasService } from '../../../../../backend/services/incidencias.service';
import { Incidencia } from '../../../../../backend/models/incidencia.model';

import ChartDataLabels from 'chartjs-plugin-datalabels';
import { DropdownModule } from 'primeng/dropdown';
import {MatGridListModule} from '@angular/material/grid-list';
import { DividerModule } from 'primeng/divider';
import { Baja } from '../../../../../backend/models/baja.model';
import { BajasService } from '../../../../../backend/services/bajas.service';
import { CapacitacionService } from '../../../../../backend/services/capacitacion.service';
import { Capacitacion } from '../../../../../backend/models/capacitacion.model';

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


import {jsPDF} from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { MatSelectModule } from '@angular/material/select';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule,MatCard, MatCardHeader, MatCardModule,
    BaseChartDirective, MeterGroupModule, ChartModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatDatepickerModule,
    DropdownModule, MatGridListModule, DividerModule, AsyncPipe, MatMenuModule, MatIconModule, MatButtonModule,MatSelectModule,NgFor, NgIf,
    ToastModule
  ],
    providers:[EmpleadosService, DepartamentosService, DashboardService, IncidenciasService,CapacitacionService,MessageService,
      { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }, provideNativeDateAdapter()
    ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  capacitaciones: Capacitacion[]=[];
  capacitacionesDepartamento: D_HorasCapacitacionDepartamento[]=[];
  empleadosActive: Empleado[] = [];
  empleadosInactive: Empleado[] = [];
  CantidadEmpleados: number = 0;
  BajasEmpleados: number = 0;
  bajasDashboard: D_Bajas[]=[];
  bajas: Baja[]=[];
  Masculino!: number;
  Femenino!: number;
  Otro!:number;
  value:any=[];
  departamentos: D_Departamentos[] = [];
  bajasDepartamentos: D_Departamentos[]=[];
  estadocivil: D_EstadoCivil[]=[];
  promedioedad: string='';
  
  promedioantiguedad: string='';
  promedioantiguedadBaja: string='';
  incidencias: Incidencia[]=[];
  incidenciasPeriodo: D_IncidenciasPeriodo[]=[];
  capacitacionesPeriodo: D_CapacitacionesPeriodo[]=[];
  contratacionesPeriodo: D_ContratacionesPeriodo[]=[];
  salidasPeriodoRango: D_SalidasEdades[]=[];
  sumaDiasSubsidiosPorDepartamento: D_SumaIncidenciasPorDepartamento[]=[];
  cambiosDepartamento: D_CambiosPorDepartamento[]=[];

  rangosAntiguedadActive: D_RangoAntiguedad[]=[];
  rangosAntiguedadSalidas: D_RangoAntiguedad[]=[];
  incidenciasPorDepartamento: D_IncidenciasPorDepartamento[]=[];
  edades: D_Edades[]=[];
  periodoSeleccionado: string = '2024';
  anoSeleccionado: string = '2024';
  mesSeleccionado!: string;
  periodos: string[]=['2022','2023', '2024', '2025', '2026'];
  fechaInicio!: Date;
  fechaFin!: Date;
  horasTotales!: number;

  //Opciones de Eleccion de Meses
  meses: string[] = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ];


  //Opciones de Eleccion de Meses
  anos: string[] = [
    '2022',
    '2023',
    '2024',
    '2025',
    '2026'
  ];


  //NombresDepartamentos:string[] = [];

  data: any;

    options: any;
    datadoughnut: any;
    databar: any;
    databarEdades: any;
    databarEdadesBajas: any;
    databarRangosAntiguedadActive: any;
    databarRangosAntiguedadInactive: any;
    databarIncidenciasPorDepartamento: any;

    //DataLine se encarga de Periodo Por mes
    dataline: any;
    datalineCapacitaciones: any;
    datalineContrataciones: any;
    datalineSalidasFechas: any;
    datalineDiasIncidencias: any;

    //Grafica de Polar
    datapolar: any;
    datapolarCambios: any;

    //Grafica de Pastel
    datapieCapacitaciones:any;


  constructor(private empleadosService: EmpleadosService, private departamentosService: DepartamentosService, private dashboardservice: DashboardService,
    private incidenciasService: IncidenciasService, private bajasService: BajasService, private capacitacionService: CapacitacionService,private messageService: MessageService
  ){
   // Register the Colors plugin
Chart.register(Colors);
Chart.register(ChartDataLabels);  // Registrar el plugin
Chart.defaults.set('plugins.datalabels', {
  color: '#0000000'
});

  }

  ngOnInit(): void {
    this.Masculino = 0;
    this.Femenino = 0;
    this.Otro = 0;

    this.consulta();
    


    //Bar Chart
  /*this.databar = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: '#42A5F5',
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: 'My Second dataset',
            backgroundColor: '#FFA726',
            data: [28, 48, 40, 19, 86, 27, 90]
        }
    ]
};*/

    

    this.empleadosService.getEmpleados().subscribe({
      next: (data) => {
        this.empleadosActive = data;
        //Es valor string;
        this.promedioedad= this.promedioEdad(this.empleadosActive).toFixed(1);
        this.promedioantiguedad = this.promedioAntiguedad(this.empleadosActive).toFixed(1);
        

        console.log(this.empleadosActive);
        this.CantidadEmpleados = this.empleadosActive.length;

        this.empleadosActive.forEach(element => {

          //Genero
          switch(element.Sexo){
            case 'Masculino':
              this.Masculino++;
              break;
              case 'Femenino':
              this.Femenino++;
              break;
              case 'Otro':
              this.Otro++;
              break;
          }
          
        });
        this.value = [
          { label: 'Hombres', color: '#50b8c5', value: this.calcular(this.CantidadEmpleados,this.Masculino), icon: 'pi pi-mars' },
          { label: 'Mujeres', color: '#be70e6', value: this.calcular(this.CantidadEmpleados,this.Femenino), icon: 'pi pi-venus' },
          { label: 'Otro', color: '#8654d7', value: this.calcular(this.CantidadEmpleados,this.Otro), icon: 'pi pi-slack' },
      ];


      },
      error: (err) => {
        console.log('Error'+err);
      }

    });


    this.dashboardservice.getEmpleadosporEdadesBajas().subscribe({
      next:(data: any)=>{
        this.bajasDashboard = data;
        this.promedioEdad
        //this.edades = edades;

// Crea un dataset para cada entrada en el estado civil
const datasets = this.bajasDashboard.map((dept, index) => ({
  label: dept.RangoEdad,  // Etiqueta para cada dataset
  data: [dept.CantidadEdades],  // Solo un valor para este dataset
}));

//const data = this.estadocivil.map(dept => dept.CantidadEstadoCivil);

        //Databar Chart
      this.databarEdadesBajas = {
      labels: ['Edades Empleados Activos'],
      datasets: datasets,
          options: {
            plugins: {
                colors: {
                    enabled: true
                }
            }
        }
      };

      },
      error:(error: any)=>{
        console.log(error);
      }
    });


    this.dashboardservice.getRangosAntiguedadActive().subscribe({
      next:(rangoAntiguedad: any)=>{
        this.rangosAntiguedadActive = rangoAntiguedad;
        //this.edades = edades;
        console.log(this.rangosAntiguedadActive);

// Crea un dataset para cada entrada en el estado civil
const datasets = this.rangosAntiguedadActive.map((dept, index) => ({
  label: dept.RangoAntiguedad,  // Etiqueta para cada dataset
  data: [dept.CantidadAntiguedades],  // Solo un valor para este dataset
}));

//const data = this.estadocivil.map(dept => dept.CantidadEstadoCivil);

        //Databar Chart
      this.databarRangosAntiguedadActive = {
      labels: ['Antiguedad Empleados Activos'],
      datasets: datasets,
          options: {
            plugins: {
                colors: {
                    enabled: true
                }
            }
        }
      };

      },
      error:(error: any)=>{
        console.log(error);
      }
    });



    this.dashboardservice.getRangosAntiguedadSalidas().subscribe({
      next:(rangoAntiguedad: any)=>{
        this.rangosAntiguedadSalidas = rangoAntiguedad;
        //this.edades = edades;
        console.log(this.rangosAntiguedadSalidas);

// Crea un dataset para cada entrada en el estado civil
const datasets = this.rangosAntiguedadSalidas.map((dept, index) => ({
  label: dept.RangoAntiguedad,  // Etiqueta para cada dataset
  data: [dept.CantidadAntiguedades],  // Solo un valor para este dataset
}));

//const data = this.estadocivil.map(dept => dept.CantidadEstadoCivil);

        //Databar Chart
      this.databarRangosAntiguedadInactive = {
      labels: ['Antiguedad Salidas'],
      datasets: datasets,
          options: {
            plugins: {
                colors: {
                    enabled: true
                }
            }
        }
      };

      },
      error:(error: any)=>{
        console.log(error);
      }
    });



    
    this.bajasService.getAllBajas().subscribe({
      next:(bajas: any)=>{
        this.bajas = bajas;
        console.log(this.bajas);
        ;
         this.promedioantiguedadBaja= this.promedioAntiguedadBajas(this.bajas).toFixed(1);

      },
      error:(error: any)=>{
        console.log(error);
      },
    });

    this.dashboardservice.getbajasDepartamento().subscribe({
      next:(bajas: any)=>{
        this.bajasDepartamentos = bajas;
        console.log(this.bajasDepartamentos);

        
// Inicializa el arreglo de labels y data
const labels = this.bajasDepartamentos.map(dept => dept.NombreDepartamento);
const data = this.bajasDepartamentos.map(dept => dept.CantidadEmpleados);

        //Datapolar Chart
    this.datapolar = {
      labels: labels,
      datasets: [
          {
              data: data,
          }],
          options: {
            plugins: {
                colors: {
                    enabled: true
                }
            }
        }
      };

      },
      error:(error: any)=>{
        console.log(error);
      },
    });

    

    this.empleadosService.getEmpleadosInactive().subscribe({
      next:(data: any)=>{
        this.BajasEmpleados = data.length;
      },
      error:(error: any)=>{
        console.log(error);
      },
    })

    

    this.dashboardservice.getEmpleadosPorDepartamento().subscribe({
      next: (departamentos: any) => {

        this.departamentos = departamentos;
        console.log(this.departamentos);

// Inicializa el arreglo de labels y data
const labels = this.departamentos.map(dept => dept.NombreDepartamento);
const data = this.departamentos.map(dept => dept.CantidadEmpleados);

        //Doughnut Chart
    this.datadoughnut = {
      labels: labels,
      datasets: [
          {
              data: data,
          }],
          options: {
            plugins: {
                colors: {
                    enabled: true
                }
            }
        }
      };

      },
      error: (err) => {
        console.log('Error'+err);
      }

    });


    //Graficas de DataBar
    this.dashboardservice.getEmpleadosporEstadoCivil().subscribe({
      next: (estadocivil: any) => {
        this.estadocivil = estadocivil;
        console.log(this.estadocivil);

// Crea un dataset para cada entrada en el estado civil
const datasets = this.estadocivil.map((dept, index) => ({
  label: dept.EstadoCivil,  // Etiqueta para cada dataset
  data: [dept.CantidadEstadoCivil],  // Solo un valor para este dataset
}));

//const data = this.estadocivil.map(dept => dept.CantidadEstadoCivil);

        //Databar Chart
      this.databar = {
      labels: ['Estado Civil'],
      datasets: datasets,
          options: {
            plugins: {
                colors: {
                    enabled: true
                }
            }
        }
      };

      },
      error: (err) => {
        console.log('Error'+err);
      }

    });


    //Graficas de DataBar Edades
    this.dashboardservice.getEmpleadosporEdades().subscribe({
      next: (edades: any) => {
        this.edades = edades;

// Crea un dataset para cada entrada en el estado civil
const datasets = this.edades.map((dept, index) => ({
  label: dept.RangoEdad,  // Etiqueta para cada dataset
  data: [dept.CantidadEdades],  // Solo un valor para este dataset
}));

//const data = this.estadocivil.map(dept => dept.CantidadEstadoCivil);

        //Databar Chart
      this.databarEdades = {
      labels: ['Edades'],
      datasets: datasets,
          options: {
            plugins: {
                colors: {
                    enabled: true
                }
            }
        }
      };

      },
      error: (err) => {
        console.log('Error'+err);
      }

    });


    this.dashboardservice.getIncidencias(this.periodoSeleccionado).subscribe({
      next: (data: any) => {
        this.incidenciasPeriodo = data;
        console.log(this.incidenciasPeriodo);
    
        // Inicializa un objeto para almacenar los datos por motivo
        const motivoData:any = {};
    
        // Recorre las incidencias y organiza los datos por motivo y mes
        this.incidenciasPeriodo.forEach(incidencia => {
          const mes = incidencia.Mes - 1; // Restamos 1 porque los arrays empiezan en 0 (Enero = 0)
          const motivo = incidencia.Motivo;
    
          // Si el motivo no existe en motivoData, inicializarlo con un array de 12 ceros
          if (!motivoData[motivo]) {
            motivoData[motivo] = new Array(12).fill(0);
          }
    
          // Asignar la cantidad de incidencias al mes correspondiente
          motivoData[motivo][mes] = incidencia.CantidadIncidencias;
        });
    
        // Crear datasets a partir de motivoData
        const datasets = Object.keys(motivoData).map(motivo => ({
          label: motivo,  // Etiqueta para cada dataset (Motivo de la incidencia)
          data: motivoData[motivo],  // Los datos organizados por mes
          tension: 0.4,
          fill: false  // Evitar que la línea se llene
        }));
    
        // Configura el gráfico de líneas
        this.dataline = {
          labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
          datasets: datasets,
          options: {
            plugins: {
              colors: {
                enabled: true
              }
            }
          }
        };
    
        console.log(datasets);
      },
      error: (err) => {
        console.log('Error' + err);
      }
    });


    this.dashboardservice.getCapacitaciones(this.periodoSeleccionado).subscribe({
      next: (data: any) => {
        this.capacitacionesPeriodo = data;
        console.log(this.capacitacionesPeriodo);
    
        // Inicializa un objeto para almacenar los datos por motivo
        const motivoData:any = {};
    
        // Recorre las incidencias y organiza los datos por motivo y mes
        this.capacitacionesPeriodo.forEach(capacitacion => {
          const mes = capacitacion.Mes - 1; // Restamos 1 porque los arrays empiezan en 0 (Enero = 0)
          const nombre = capacitacion.NombreCapacitacion;
    
          // Si el motivo no existe en motivoData, inicializarlo con un array de 12 ceros
          if (!motivoData[nombre]) {
            motivoData[nombre] = new Array(12).fill(0);
          }
    
          // Asignar la cantidad de incidencias al mes correspondiente
          motivoData[nombre][mes] = capacitacion.CantidadCapacitaciones;
        });
    
        // Crear datasets a partir de motivoData
        const datasets = Object.keys(motivoData).map(motivo => ({
          label: motivo,  // Etiqueta para cada dataset (Motivo de la incidencia)
          data: motivoData[motivo],  // Los datos organizados por mes
          tension: 0.4,
          fill: false  // Evitar que la línea se llene
        }));
    
        // Configura el gráfico de líneas
        this.datalineCapacitaciones = {
          labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
          datasets: datasets,
          options: {
            plugins: {
              colors: {
                enabled: true
              }
            }
          }
        };
    
        console.log(datasets);
      },
      error: (err) => {
        console.log('Error' + err);
      }
    });


    this.dashboardservice.getContrataciones(this.periodoSeleccionado).subscribe({
      next: (data: any) => {
        this.contratacionesPeriodo = data;
    
        // Inicializa un objeto para almacenar los datos por motivo
        const motivoData:any = {};
    
        // Recorre las incidencias y organiza los datos por motivo y mes
        this.contratacionesPeriodo.forEach(contratacion => {
          const mes = contratacion.Mes - 1; // Restamos 1 porque los arrays empiezan en 0 (Enero = 0)
          const nombre = contratacion.NombreDepartamento;
    
          // Si el motivo no existe en motivoData, inicializarlo con un array de 12 ceros
          if (!motivoData[nombre]) {
            motivoData[nombre] = new Array(12).fill(0);
          }
    
          // Asignar la cantidad de incidencias al mes correspondiente
          motivoData[nombre][mes] = contratacion.CantidadContrataciones;
        });
    
        // Crear datasets a partir de motivoData
        const datasets = Object.keys(motivoData).map(motivo => ({
          label: motivo,  // Etiqueta para cada dataset (Motivo de la incidencia)
          data: motivoData[motivo],  // Los datos organizados por mes
          tension: 0.4,
          fill: false  // Evitar que la línea se llene
        }));
    
        // Configura el gráfico de líneas
        this.datalineContrataciones = {
          labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
          datasets: datasets,
          options: {
            plugins: {
              colors: {
                enabled: true
              }
            }
          }
        };
    
        console.log(datasets);
      },
      error: (err) => {
        console.log('Error' + err);
      }
    });
    

    this.incidenciasService.getIncidenciasAll().subscribe({
      next: (data: any) => {
        
       /* this.incidencias = data;
        console.log(this.incidencias);

        const datasets = this.incidencias.map((incidencia, index) => ({
          label: incidencia.Motivo,  // Etiqueta para cada dataset
          data: [incidencia.DiasSubsidios, Math.floor (Math.random ()*18) + 1, Math.floor (Math.random ()*18) + 1,Math.floor (Math.random ()*18) + 1],  // Solo un valor para este dataset
          tension: 0.4
        }));

        console.log(datasets);
        //Line Chart
this.dataline = {
  labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  datasets: datasets /*[
      {
          label: 'Maternidad',
          data: [6, 5, 8, 8, 5, 5, 6, 5, 8, 8, 5, 4],
          fill: false,
          borderColor: '#42A5F5',
          tension: 0.4
      },
      {
          label: 'Trayecto',
          data: [2, 4, 4, 1, 8, 2, 2, 4, 4, 1, 8, 9],
          fill: false,
          borderColor: '#FFA726',
          tension: 0.4
      }
  ]*/
//};

      },
      error: (err) => {
        console.log('Error'+err);
      }
    });


    //Obtener Incidencias Por Departamento
    this.dashboardservice.getIncidenciasPorDepartamento().subscribe({
      next: (data: any) => {
        this.incidenciasPorDepartamento = data;


    // Extraer los nombres únicos de los departamentos
    const labels = [...new Set(this.incidenciasPorDepartamento.map(inc => inc.NombreDepartamento))];

    // Extraer los motivos únicos
    const motivosUnicos = [...new Set(this.incidenciasPorDepartamento.map(inc => inc.Motivo))];


      // Crear los datasets por cada motivo
      const datasets = motivosUnicos.map(motivo => {
        return {
          label: motivo,  // Etiqueta del dataset (Motivo de la incidencia)
          data: labels.map(departamento => {
            // Encontrar la cantidad de motivos para cada departamento
            const incidencia = this.incidenciasPorDepartamento.find(
              inc => inc.NombreDepartamento === departamento && inc.Motivo === motivo
            );
            return incidencia ? incidencia.CantidadMotivos : 0;  // Si hay incidencia, se toma la cantidad, sino 0
          })
        };
      });

        // Configurar la gráfica de barras
        this.databarIncidenciasPorDepartamento = {
          labels: labels,
          datasets: datasets,
          options: {
            plugins: {
              colors: {
                enabled: true
              }
            }
          }
        };
    
      },
      error: (err) => {
        console.log('Error' + err);
      }
    });


    //Obtener Salidas por Edades por mes
    this.dashboardservice.getSalidasEdadesPeriodo(this.periodoSeleccionado).subscribe({
      next: (data: any) => {
        this.salidasPeriodoRango = data;
        //console.log(this.salidasPeriodoRango);
    
        // Inicializa un objeto para almacenar los datos por motivo
        const motivoData:any = {};
    
        // Recorre las incidencias y organiza los datos por motivo y mes
        this.salidasPeriodoRango.forEach(salida => {
          const mes = salida.Mes - 1; // Restamos 1 porque los arrays empiezan en 0 (Enero = 0)
          const nombre = salida.RangoEdad;
    
          // Si el motivo no existe en motivoData, inicializarlo con un array de 12 ceros
          if (!motivoData[nombre]) {
            motivoData[nombre] = new Array(12).fill(0);
          }
    
          // Asignar la cantidad de incidencias al mes correspondiente
          motivoData[nombre][mes] = salida.CantidadEdades;
        });
    
        // Crear datasets a partir de motivoData
        const datasets = Object.keys(motivoData).map(motivo => ({
          label: motivo,  // Etiqueta para cada dataset (Motivo de la incidencia)
          data: motivoData[motivo],  // Los datos organizados por mes
          tension: 0.4,
          fill: false  // Evitar que la línea se llene
        }));
    
        // Configura el gráfico de líneas
        this.datalineSalidasFechas = {
          labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
          datasets: datasets,
          options: {
            plugins: {
              colors: {
                enabled: true
              }
            }
          }
        };
    
        console.log(datasets);
      },
      error: (err) => {
        console.log('Error' + err);
      }
    });




    //Obtener la suma de Dias de Subsidios por Departamento
    this.dashboardservice.getSumaDiasIncidenciasPorDepartamento(this.periodoSeleccionado).subscribe({
      next: (data: any) => {
        this.sumaDiasSubsidiosPorDepartamento = data;
        //console.log(this.salidasPeriodoRango);
    
        // Inicializa un objeto para almacenar los datos por motivo
        const motivoData:any = {};
    
        // Recorre las incidencias y organiza los datos por motivo y mes
        this.sumaDiasSubsidiosPorDepartamento.forEach(dia => {
          const mes = dia.Mes - 1; // Restamos 1 porque los arrays empiezan en 0 (Enero = 0)
          const nombre = dia.NombreDepartamento;
    
          // Si el motivo no existe en motivoData, inicializarlo con un array de 12 ceros
          if (!motivoData[nombre]) {
            motivoData[nombre] = new Array(12).fill(0);
          }
    
          // Asignar la cantidad de incidencias al mes correspondiente
          motivoData[nombre][mes] = dia.TotalDiasSubsidios;
        });
    
        // Crear datasets a partir de motivoData
        const datasets = Object.keys(motivoData).map(motivo => ({
          label: motivo,  // Etiqueta para cada dataset (Motivo de la incidencia)
          data: motivoData[motivo],  // Los datos organizados por mes
          tension: 0.4,
          fill: false  // Evitar que la línea se llene
        }));
    
        // Configura el gráfico de líneas
        this.datalineDiasIncidencias = {
          labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
          datasets: datasets,
          options: {
            plugins: {
              colors: {
                enabled: true
              }
            }
          }
        };
    
        console.log(datasets);
      },
      error: (err) => {
        console.log('Error' + err);
      }
    });


//CAPACITACIONES  
/*
    this.capacitacionService.getCapacitaciones().subscribe({
      next: (capacitaciones: any) => {
        this.capacitaciones = capacitaciones;
        console.log(this.capacitaciones);

// Inicializa el arreglo de labels y data
const labels = this.capacitaciones.map(dept => dept.NombreCapacitacion);
const data = this.capacitaciones.map(dept => dept.Horas);

        //Datapie Chart
    this.datapieCapacitaciones = {
      labels: labels,
      datasets: [
          {
              data: data,
          }],
          options: {
            plugins: {
                colors: {
                    enabled: true
                }
            }
        }
      };

      },
      error: (err) => {
        console.log('Error'+err);
      }

    });*/

    this.dashboardservice.getCambiosDepartamento().subscribe({
      next:(cambios: any)=>{
        this.cambiosDepartamento = cambios;

        
// Inicializa el arreglo de labels y data
const labels = this.cambiosDepartamento.map(dept => dept.NombreDepartamentoAnterior);
const data = this.cambiosDepartamento.map(dept => dept.CantidadCambios);

        //Datapolar Chart
    this.datapolarCambios = {
      labels: labels,
      datasets: [
          {
              data: data,
          }],
          options: {
            plugins: {
                colors: {
                    enabled: true
                }
            }
        }
      };

      },
      error:(error: any)=>{
        console.log(error);
      },
    });
    

  }



  //Metodo del Periodo
  periodo(){

    this.dashboardservice.getIncidencias(this.periodoSeleccionado).subscribe({
      next: (data: any) => {
        this.incidenciasPeriodo = data;
        console.log(this.incidenciasPeriodo);
    
        // Inicializa un objeto para almacenar los datos por motivo
        const motivoData:any = {};
    
        // Recorre las incidencias y organiza los datos por motivo y mes
        this.incidenciasPeriodo.forEach(incidencia => {
          const mes = incidencia.Mes - 1; // Restamos 1 porque los arrays empiezan en 0 (Enero = 0)
          const motivo = incidencia.Motivo;
    
          // Si el motivo no existe en motivoData, inicializarlo con un array de 12 ceros
          if (!motivoData[motivo]) {
            motivoData[motivo] = new Array(12).fill(0);
          }
    
          // Asignar la cantidad de incidencias al mes correspondiente
          motivoData[motivo][mes] = incidencia.CantidadIncidencias;
        });
    
        // Crear datasets a partir de motivoData
        const datasets = Object.keys(motivoData).map(motivo => ({
          label: motivo,  // Etiqueta para cada dataset (Motivo de la incidencia)
          data: motivoData[motivo],  // Los datos organizados por mes
          tension: 0.4,
          fill: false  // Evitar que la línea se llene
        }));
    
        // Configura el gráfico de líneas
        this.dataline = {
          labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
          datasets: datasets,
          options: {
            plugins: {
              colors: {
                enabled: true
              }
            }
          }
        };
    
        console.log(datasets);
      },
      error: (err) => {
        console.log('Error' + err);
      }
    });


    this.dashboardservice.getCapacitaciones(this.periodoSeleccionado).subscribe({
      next: (data: any) => {
        this.capacitacionesPeriodo = data;
        console.log(this.capacitacionesPeriodo);
    
        // Inicializa un objeto para almacenar los datos por motivo
        const motivoData:any = {};
    
        // Recorre las incidencias y organiza los datos por motivo y mes
        this.capacitacionesPeriodo.forEach(capacitacion => {
          const mes = capacitacion.Mes - 1; // Restamos 1 porque los arrays empiezan en 0 (Enero = 0)
          const nombre = capacitacion.NombreCapacitacion;
    
          // Si el motivo no existe en motivoData, inicializarlo con un array de 12 ceros
          if (!motivoData[nombre]) {
            motivoData[nombre] = new Array(12).fill(0);
          }
    
          // Asignar la cantidad de incidencias al mes correspondiente
          motivoData[nombre][mes] = capacitacion.CantidadCapacitaciones;
        });
    
        // Crear datasets a partir de motivoData
        const datasets = Object.keys(motivoData).map(motivo => ({
          label: motivo,  // Etiqueta para cada dataset (Motivo de la incidencia)
          data: motivoData[motivo],  // Los datos organizados por mes
          tension: 0.4,
          fill: false  // Evitar que la línea se llene
        }));
    
        // Configura el gráfico de líneas
        this.datalineCapacitaciones = {
          labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
          datasets: datasets,
          options: {
            plugins: {
              colors: {
                enabled: true
              }
            }
          }
        };
    
        console.log(datasets);
      },
      error: (err) => {
        console.log('Error' + err);
      }
    });

    this.dashboardservice.getContrataciones(this.periodoSeleccionado).subscribe({
      next: (data: any) => {
        this.contratacionesPeriodo = data;
    
        // Inicializa un objeto para almacenar los datos por motivo
        const motivoData:any = {};
    
        // Recorre las incidencias y organiza los datos por motivo y mes
        this.contratacionesPeriodo.forEach(contratacion => {
          const mes = contratacion.Mes - 1; // Restamos 1 porque los arrays empiezan en 0 (Enero = 0)
          const nombre = contratacion.NombreDepartamento;
    
          // Si el motivo no existe en motivoData, inicializarlo con un array de 12 ceros
          if (!motivoData[nombre]) {
            motivoData[nombre] = new Array(12).fill(0);
          }
    
          // Asignar la cantidad de incidencias al mes correspondiente
          motivoData[nombre][mes] = contratacion.CantidadContrataciones;
        });
    
        // Crear datasets a partir de motivoData
        const datasets = Object.keys(motivoData).map(motivo => ({
          label: motivo,  // Etiqueta para cada dataset (Motivo de la incidencia)
          data: motivoData[motivo],  // Los datos organizados por mes
          tension: 0.4,
          fill: false  // Evitar que la línea se llene
        }));
    
        // Configura el gráfico de líneas
        this.datalineContrataciones = {
          labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
          datasets: datasets,
          options: {
            plugins: {
              colors: {
                enabled: true
              }
            }
          }
        };
    
        console.log(datasets);
      },
      error: (err) => {
        console.log('Error' + err);
      }
    });


    //Obtener Salidas por Edades por mes
    this.dashboardservice.getSalidasEdadesPeriodo(this.periodoSeleccionado).subscribe({
      next: (data: any) => {
        this.salidasPeriodoRango = data;
        //console.log(this.salidasPeriodoRango);
    
        // Inicializa un objeto para almacenar los datos por motivo
        const motivoData:any = {};
    
        // Recorre las incidencias y organiza los datos por motivo y mes
        this.salidasPeriodoRango.forEach(salida => {
          const mes = salida.Mes - 1; // Restamos 1 porque los arrays empiezan en 0 (Enero = 0)
          const nombre = salida.RangoEdad;
    
          // Si el motivo no existe en motivoData, inicializarlo con un array de 12 ceros
          if (!motivoData[nombre]) {
            motivoData[nombre] = new Array(12).fill(0);
          }
    
          // Asignar la cantidad de incidencias al mes correspondiente
          motivoData[nombre][mes] = salida.CantidadEdades;
        });
    
        // Crear datasets a partir de motivoData
        const datasets = Object.keys(motivoData).map(motivo => ({
          label: motivo,  // Etiqueta para cada dataset (Motivo de la incidencia)
          data: motivoData[motivo],  // Los datos organizados por mes
          tension: 0.4,
          fill: false  // Evitar que la línea se llene
        }));
    
        // Configura el gráfico de líneas
        this.datalineSalidasFechas = {
          labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
          datasets: datasets,
          options: {
            plugins: {
              colors: {
                enabled: true
              }
            }
          }
        };
    
        console.log(datasets);
      },
      error: (err) => {
        console.log('Error' + err);
      }
    });

    //Obtener la suma de Dias de Subsidios por Departamento
    this.dashboardservice.getSumaDiasIncidenciasPorDepartamento(this.periodoSeleccionado).subscribe({
      next: (data: any) => {
        this.sumaDiasSubsidiosPorDepartamento = data;
        //console.log(this.salidasPeriodoRango);
    
        // Inicializa un objeto para almacenar los datos por motivo
        const motivoData:any = {};
    
        // Recorre las incidencias y organiza los datos por motivo y mes
        this.sumaDiasSubsidiosPorDepartamento.forEach(dia => {
          const mes = dia.Mes - 1; // Restamos 1 porque los arrays empiezan en 0 (Enero = 0)
          const nombre = dia.NombreDepartamento;
    
          // Si el motivo no existe en motivoData, inicializarlo con un array de 12 ceros
          if (!motivoData[nombre]) {
            motivoData[nombre] = new Array(12).fill(0);
          }
    
          // Asignar la cantidad de incidencias al mes correspondiente
          motivoData[nombre][mes] = dia.TotalDiasSubsidios;
        });
    
        // Crear datasets a partir de motivoData
        const datasets = Object.keys(motivoData).map(motivo => ({
          label: motivo,  // Etiqueta para cada dataset (Motivo de la incidencia)
          data: motivoData[motivo],  // Los datos organizados por mes
          tension: 0.4,
          fill: false  // Evitar que la línea se llene
        }));
    
        // Configura el gráfico de líneas
        this.datalineDiasIncidencias = {
          labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
          datasets: datasets,
          options: {
            plugins: {
              colors: {
                enabled: true
              }
            }
          }
        };
    
        console.log(datasets);
      },
      error: (err) => {
        console.log('Error' + err);
      }
    });


  }


consulta(){
  this.horasTotales = 0;
  if (!this.mesSeleccionado){
      const ano = parseInt(this.anoSeleccionado, 10);
      this.fechaInicio = new Date(ano, 0, 1);
    this.fechaFin = new Date(ano, 11, 31);

    this.dashboardservice.getSumaHorasCapacitacionPorDepartamento(this.fechaInicio,this.fechaFin).subscribe({
      next: (capacitacionesD: any) => {
        this.capacitacionesDepartamento = capacitacionesD;
        console.log(this.capacitacionesDepartamento);
        this.capacitacionesDepartamento.forEach(element => {
          this.horasTotales = this.horasTotales + element.TotalHoras
        });
  // Inicializa el arreglo de labels y data
  const labels = this.capacitacionesDepartamento.map(dept => dept.NombreDepartamento);
  const data = this.capacitacionesDepartamento.map(dept => dept.TotalHoras);
  
        //Datapie Chart
    this.datapieCapacitaciones = {
      labels: labels,
      datasets: [
          {
              data: data,
          }],
          options: {
            plugins: {
                colors: {
                    enabled: true
                }
            }
        }
      };
  
      },
      error: (err) => {
        console.log('Error'+err);
      }
  
    });

    //return; // No hagas la consulta hasta que ambos valores estén seleccionados
    
  }
  else{
    const ano = parseInt(this.anoSeleccionado, 10); // Convertir el año a número
  switch (this.mesSeleccionado) {
    case 'Enero':
      this.fechaInicio = new Date(ano, 0, 1);  // Enero es el mes 0 en JavaScript
      this.fechaFin = new Date(ano, 0, 31);    // Último día de enero
      break;
    case 'Febrero':
      this.fechaInicio = new Date(ano, 1, 1);
      this.fechaFin = new Date(ano, 1, this.isLeapYear(ano) ? 29 : 28);  // Manejar años bisiestos
      break;
    case 'Marzo':
      this.fechaInicio = new Date(ano, 2, 1);
      this.fechaFin = new Date(ano, 2, 31);
      break;
    case 'Abril':
      this.fechaInicio = new Date(ano, 3, 1);
      this.fechaFin = new Date(ano, 3, 30);
      break;
    case 'Mayo':
      this.fechaInicio = new Date(ano, 4, 1);
      this.fechaFin = new Date(ano, 4, 31);
      break;
    case 'Junio':
      this.fechaInicio = new Date(ano, 5, 1);
      this.fechaFin = new Date(ano, 5, 30);
      break;
    case 'Julio':
      this.fechaInicio = new Date(ano, 6, 1);
      this.fechaFin = new Date(ano, 6, 31);
      break;
    case 'Agosto':
      this.fechaInicio = new Date(ano, 7, 1);
      this.fechaFin = new Date(ano, 7, 31);
      break;
    case 'Septiembre':
      this.fechaInicio = new Date(ano, 8, 1);
      this.fechaFin = new Date(ano, 8, 30);
      break;
    case 'Octubre':
      this.fechaInicio = new Date(ano, 9, 1);
      this.fechaFin = new Date(ano, 9, 31);
      break;
    case 'Noviembre':
      this.fechaInicio = new Date(ano, 10, 1);
      this.fechaFin = new Date(ano, 10, 30);
      break;
    case 'Diciembre':
      this.fechaInicio = new Date(ano, 11, 1);
      this.fechaFin = new Date(ano, 11, 31);
      break;
  }

  // Después de asignar las fechas, puedes realizar la consulta a tu servicio
  console.log('Fecha Inicio:', this.fechaInicio);
  console.log('Fecha Fin:', this.fechaFin);


  this.dashboardservice.getSumaHorasCapacitacionPorDepartamento(this.fechaInicio,this.fechaFin).subscribe({
    next: (capacitacionesD: any) => {
      this.capacitacionesDepartamento = capacitacionesD;
      console.log(this.capacitacionesDepartamento);

      this.capacitacionesDepartamento.forEach(element => {
        this.horasTotales = this.horasTotales + element.TotalHoras
      });
// Inicializa el arreglo de labels y data
const labels = this.capacitacionesDepartamento.map(dept => dept.NombreDepartamento);
const data = this.capacitacionesDepartamento.map(dept => dept.TotalHoras);

      //Datapie Chart
  this.datapieCapacitaciones = {
    labels: labels,
    datasets: [
        {
            data: data,
        }],
        options: {
          plugins: {
              colors: {
                  enabled: true
              }
          }
      }
    };

    },
    error: (err) => {
      console.log('Error'+err);
    }

  });


  }
};

isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

  /*onDataSelect(event: any){
    console.log(event);
    const datasetIndex = event.element._datasetIndex;
    const dataIndex = event.element._index;
    console.log(datasetIndex);
    const selectedData = this.databar.datasets[datasetIndex].data[dataIndex];
    const selectedLabel = this.datadoughnut.labels[dataIndex];
    console.log(selectedLabel);
  }*/

  calcular(total:number, cantidad:number): number{
    return (100/total)*cantidad
  }

  promedioEdad(empleados: Empleado[]):number{
    var Promedio=0;
    var SumaEdad=0;
    
    empleados.forEach(element => {
      SumaEdad = SumaEdad + element.Edad;
    });
    Promedio = (SumaEdad/empleados.length);
    return Promedio;
  };

  promedioAntiguedadBajas(bajas: Baja[]):number{
    var Promedio=0;
    var SumaAntiguedad=0;
    const Año = 365;
    
    bajas.forEach(element => {
      SumaAntiguedad = SumaAntiguedad + element.Antiguedad;
    });

    Promedio = ((SumaAntiguedad/bajas.length)/365);
    return Promedio;
  };

  promedioAntiguedad(empleados: Empleado[]):number{
    var Promedio=0;
    var Sumaantiguedad=0;
    const Año = 365;
    
    empleados.forEach(element => {
      Sumaantiguedad = Sumaantiguedad + element.Antiguedad;
    });
    Promedio = ((Sumaantiguedad/empleados.length)/Año);
    return Promedio;
  }






  impresionEmpleados(chartId: string) {
    const chartElement = document.getElementById(chartId);
  if (chartElement) {
    html2canvas(chartElement).then(canvas => {
      const doc = new jsPDF({
        orientation: 'landscape',  // Establecer orientación horizontal
      });

      doc.text('DETALLES DE LOS EMPLEADOS', 100, 50);
      const img1 = new Image();
      const img2 = new Image();
      img1.src = 'assets/famo.png'; // Ruta de tu primera imagen local
      img2.src = 'assets/logo.png'; // Ruta de tu segunda imagen local
       // Agregar la primera imagen al PDF en la esquina superior izquierda
    doc.addImage(img1, 'PNG', 10, 10, 30, 20); // Coordenadas x, y y dimensiones width, height
    // Agregar la segunda imagen al PDF en la esquina superior derecha
    doc.addImage(img2, 'PNG', 250, 10, 30, 30); // Coordenadas x, y y dimensiones width, height
    const imgData = canvas.toDataURL('image/png');
    doc.addImage(imgData, 'PNG', 10, 80, 260, 50); // Ajusta las coordenadas y tamaño
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
    const fileName = `empleados_${day}_${month}_${year}.pdf`;
    // Guardar el PDF con el nombre dinámico
    doc.save(fileName)

    });
  } else {
    console.error('No se encontró el gráfico para imprimir.');
  }
  }


  //Impresion Edades
  impresionEdades(chartId: string) {
    const chartElement = document.getElementById(chartId);
  if (chartElement) {
    html2canvas(chartElement).then(canvas => {
      const doc = new jsPDF({
        orientation: 'landscape',  // Establecer orientación horizontal
      });

      doc.text('EDADES DE LOS EMPLEADOS', 100, 50);
      const img1 = new Image();
      const img2 = new Image();
      img1.src = 'assets/famo.png'; // Ruta de tu primera imagen local
      img2.src = 'assets/logo.png'; // Ruta de tu segunda imagen local
       // Agregar la primera imagen al PDF en la esquina superior izquierda
    doc.addImage(img1, 'PNG', 10, 10, 30, 20); // Coordenadas x, y y dimensiones width, height
    // Agregar la segunda imagen al PDF en la esquina superior derecha
    doc.addImage(img2, 'PNG', 250, 10, 30, 30); // Coordenadas x, y y dimensiones width, height
    const imgData = canvas.toDataURL('image/png');
    doc.addImage(imgData, 'PNG', 15, 70, 250, 100); // Ajusta las coordenadas y tamaño
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
    const fileName = `edadesempleados_${day}_${month}_${year}.pdf`;
    // Guardar el PDF con el nombre dinámico
    doc.save(fileName)

    });
  } else {
    console.error('No se encontró el gráfico para imprimir.');
  }
  }


  //ImpresiondelasAntiguedades
  //Impresion Edades
  impresionAntiguedades(chartId: string) {
    const chartElement = document.getElementById(chartId);
  if (chartElement) {
    html2canvas(chartElement).then(canvas => {
      const doc = new jsPDF({
        orientation: 'landscape',  // Establecer orientación horizontal
      });

      doc.text('ANTIGUEDADES DE LOS EMPLEADOS', 100, 50);
      const img1 = new Image();
      const img2 = new Image();
      img1.src = 'assets/famo.png'; // Ruta de tu primera imagen local
      img2.src = 'assets/logo.png'; // Ruta de tu segunda imagen local
       // Agregar la primera imagen al PDF en la esquina superior izquierda
    doc.addImage(img1, 'PNG', 10, 10, 30, 20); // Coordenadas x, y y dimensiones width, height
    // Agregar la segunda imagen al PDF en la esquina superior derecha
    doc.addImage(img2, 'PNG', 250, 10, 30, 30); // Coordenadas x, y y dimensiones width, height
    const imgData = canvas.toDataURL('image/png');
    doc.addImage(imgData, 'PNG', 15, 70, 250, 100); // Ajusta las coordenadas y tamaño
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
    const fileName = `antiguedadesempleados_${day}_${month}_${year}.pdf`;
    // Guardar el PDF con el nombre dinámico
    doc.save(fileName)

    });
  } else {
    console.error('No se encontró el gráfico para imprimir.');
  }
  }


   //Impresion de Antiguedades de las Salidas
   impresionSalidasAntiguedades(chartId: string) {
    const chartElement = document.getElementById(chartId);
  if (chartElement) {
    html2canvas(chartElement).then(canvas => {
      const doc = new jsPDF({
        orientation: 'landscape',  // Establecer orientación horizontal
      });
      doc.text('ANTIGUEDADES DE LAS SALIDAS DE LOS EMPLEADOS', 100, 50);
      const img1 = new Image();
      const img2 = new Image();
      img1.src = 'assets/famo.png'; // Ruta de tu primera imagen local
      img2.src = 'assets/logo.png'; // Ruta de tu segunda imagen local
       // Agregar la primera imagen al PDF en la esquina superior izquierda
    doc.addImage(img1, 'PNG', 10, 10, 30, 20); // Coordenadas x, y y dimensiones width, height
    // Agregar la segunda imagen al PDF en la esquina superior derecha
    doc.addImage(img2, 'PNG', 250, 10, 30, 30); // Coordenadas x, y y dimensiones width, height
    const imgData = canvas.toDataURL('image/png');
    doc.addImage(imgData, 'PNG', 15, 70, 230, 100); // Ajusta las coordenadas y tamaño
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
    const fileName = `AntiguedadesSalidasEmpleados_${day}_${month}_${year}.pdf`;
    // Guardar el PDF con el nombre dinámico
    doc.save(fileName)

    });
  } else {
    console.error('No se encontró el gráfico para imprimir.');
  }
  }



  //Impresion Empleados Por Departamento
  impresionEmpleadosPorDepartamento(chartId: string) {
    const chartElement = document.getElementById(chartId);
  if (chartElement) {
    html2canvas(chartElement).then(canvas => {
      const doc = new jsPDF({
        orientation: 'landscape',  // Establecer orientación horizontal
      });
      doc.text('CANTIDAD DE EMPLEADOS POR DEPARTAMENTO', 100, 50);
      const img1 = new Image();
      const img2 = new Image();
      img1.src = 'assets/famo.png'; // Ruta de tu primera imagen local
      img2.src = 'assets/logo.png'; // Ruta de tu segunda imagen local
       // Agregar la primera imagen al PDF en la esquina superior izquierda
    doc.addImage(img1, 'PNG', 10, 10, 30, 20); // Coordenadas x, y y dimensiones width, height
    // Agregar la segunda imagen al PDF en la esquina superior derecha
    doc.addImage(img2, 'PNG', 250, 10, 30, 30); // Coordenadas x, y y dimensiones width, height
    const imgData = canvas.toDataURL('image/png');
    doc.addImage(imgData, 'PNG', 20, 70, 260, 100); // Ajusta las coordenadas y tamaño
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
    const fileName = `CantidadEmpleadosPorDepartamento_${day}_${month}_${year}.pdf`;
    // Guardar el PDF con el nombre dinámico
    doc.save(fileName)

    });
  } else {
    console.error('No se encontró el gráfico para imprimir.');
  }
  }



  //Impresion Empleados Por Departamento
  impresionBajasPorDepartamento(chartId: string) {
    const chartElement = document.getElementById(chartId);
  if (chartElement) {
    html2canvas(chartElement).then(canvas => {
      const doc = new jsPDF({
        orientation: 'landscape',  // Establecer orientación horizontal
      });
      doc.text('CANTIDAD BAJAS DE EMPLEADOS POR DEPARTAMENTO', 80, 50);
      const img1 = new Image();
      const img2 = new Image();
      img1.src = 'assets/famo.png'; // Ruta de tu primera imagen local
      img2.src = 'assets/logo.png'; // Ruta de tu segunda imagen local
       // Agregar la primera imagen al PDF en la esquina superior izquierda
    doc.addImage(img1, 'PNG', 10, 10, 30, 20); // Coordenadas x, y y dimensiones width, height
    // Agregar la segunda imagen al PDF en la esquina superior derecha
    doc.addImage(img2, 'PNG', 250, 10, 30, 30); // Coordenadas x, y y dimensiones width, height
    const imgData = canvas.toDataURL('image/png');
    doc.addImage(imgData, 'PNG', 20, 70, 270, 100); // Ajusta las coordenadas y tamaño
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
    const fileName = `CantidadEmpleadosBajasPorDepartamento_${day}_${month}_${year}.pdf`;
    // Guardar el PDF con el nombre dinámico
    doc.save(fileName)

    });
  } else {
    console.error('No se encontró el gráfico para imprimir.');
  }
  }


  //Impresion de Empleados Por estado Civil
impresionEmpleadosEstadoCivil(chartId: string) {
    const chartElement = document.getElementById(chartId);
  if (chartElement) {
    html2canvas(chartElement).then(canvas => {
      const doc = new jsPDF({
        orientation: 'landscape',  // Establecer orientación horizontal
      });
      doc.text('ESTADO CIVIL DE LOS EMPLEADOS ACTIVOS', 80, 50);
      const img1 = new Image();
      const img2 = new Image();
      img1.src = 'assets/famo.png'; // Ruta de tu primera imagen local
      img2.src = 'assets/logo.png'; // Ruta de tu segunda imagen local
       // Agregar la primera imagen al PDF en la esquina superior izquierda
    doc.addImage(img1, 'PNG', 10, 10, 30, 20); // Coordenadas x, y y dimensiones width, height
    // Agregar la segunda imagen al PDF en la esquina superior derecha
    doc.addImage(img2, 'PNG', 250, 10, 30, 30); // Coordenadas x, y y dimensiones width, height
    const imgData = canvas.toDataURL('image/png');
    doc.addImage(imgData, 'PNG', 40, 70, 230, 100); // Ajusta las coordenadas y tamaño
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
    const fileName = `EstadoCivilEmpleadosActivos_${day}_${month}_${year}.pdf`;
    // Guardar el PDF con el nombre dinámico
    doc.save(fileName)

    });
  } else {
    console.error('No se encontró el gráfico para imprimir.');
  }
  }
  

  //Cantidad De Incidencias Por Departamento
  impresionIncidenciasPorDepartamento(chartId: string) {
    const chartElement = document.getElementById(chartId);
  if (chartElement) {
    html2canvas(chartElement).then(canvas => {
      const doc = new jsPDF({
        orientation: 'landscape',  // Establecer orientación horizontal
      });
      doc.text('CANTIDAD DE INCIDENCIAS POR DEPARTAMENTO', 80, 50);
      const img1 = new Image();
      const img2 = new Image();
      img1.src = 'assets/famo.png'; // Ruta de tu primera imagen local
      img2.src = 'assets/logo.png'; // Ruta de tu segunda imagen local
       // Agregar la primera imagen al PDF en la esquina superior izquierda
    doc.addImage(img1, 'PNG', 10, 10, 30, 20); // Coordenadas x, y y dimensiones width, height
    // Agregar la segunda imagen al PDF en la esquina superior derecha
    doc.addImage(img2, 'PNG', 250, 10, 30, 30); // Coordenadas x, y y dimensiones width, height
    const imgData = canvas.toDataURL('image/png');
    doc.addImage(imgData, 'PNG', 30, 70, 230, 80); // Ajusta las coordenadas y tamaño
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
    const fileName = `IncidenciasPorDepartamento_${day}_${month}_${year}.pdf`;
    // Guardar el PDF con el nombre dinámico
    doc.save(fileName)

    });
  } else {
    console.error('No se encontró el gráfico para imprimir.');
  }
  }



  //Impresion Empleados Por Departamento
  impresionHorasCapacitaciones(chartId: string) {
    const chartElement = document.getElementById(chartId);
  if (chartElement) {
    html2canvas(chartElement).then(canvas => {
      const doc = new jsPDF({
        orientation: 'landscape',  // Establecer orientación horizontal
      });
      if(this.mesSeleccionado){
        doc.text('CANTIDAD DE HORAS POR CAPACITACIÓN (MES: '+this.mesSeleccionado +' AÑO: '+this.anoSeleccionado+')', 50, 20);
        
      }else{
        doc.text('CANTIDAD DE HORAS POR CAPACITACIÓN (AÑO: '+this.anoSeleccionado+')', 60, 20);
        
      }
      doc.text('Horas Totales: '+this.horasTotales +' Horas ', 200, 65);
      const img1 = new Image();
      const img2 = new Image();
      img1.src = 'assets/famo.png'; // Ruta de tu primera imagen local
      img2.src = 'assets/logo.png'; // Ruta de tu segunda imagen local
       // Agregar la primera imagen al PDF en la esquina superior izquierda
    doc.addImage(img1, 'PNG', 10, 10, 30, 20); // Coordenadas x, y y dimensiones width, height
    // Agregar la segunda imagen al PDF en la esquina superior derecha
    doc.addImage(img2, 'PNG', 250, 5, 30, 30); // Coordenadas x, y y dimensiones width, height
    const imgData = canvas.toDataURL('image/png');
    doc.addImage(imgData, 'PNG', 20, 70, 270, 80); // Ajusta las coordenadas y tamaño
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
    if(this.mesSeleccionado){
      const fileName = `CantidadHorasPorCapacitacionMes${this.mesSeleccionado}_Año${this.anoSeleccionado}_${day}_${month}_${year}.pdf`;
      doc.save(fileName)
    }else{
      const fileName = `CantidadHorasPorCapacitacionAño${this.anoSeleccionado}_${day}_${month}_${year}.pdf`;
      doc.save(fileName)

    }
    
    // Guardar el PDF con el nombre dinámico
    

    });
  } else {
    this.messageService.add({ severity: 'warn', summary: 'Precaución', detail: 'No hay Registros' });
  }
  }


  //Impresion de Cambios de Puestos
  impresionCambiosPuestos(chartId: string) {
    const chartElement = document.getElementById(chartId);
  if (chartElement) {
    html2canvas(chartElement).then(canvas => {
      const doc = new jsPDF({
        orientation: 'landscape',  // Establecer orientación horizontal
      });
      doc.text('CANTIDAD DE CAMBIOS DE PUESTOS POR DEPARTAMENTO', 80, 50);
      const img1 = new Image();
      const img2 = new Image();
      img1.src = 'assets/famo.png'; // Ruta de tu primera imagen local
      img2.src = 'assets/logo.png'; // Ruta de tu segunda imagen local
       // Agregar la primera imagen al PDF en la esquina superior izquierda
    doc.addImage(img1, 'PNG', 10, 10, 30, 20); // Coordenadas x, y y dimensiones width, height
    // Agregar la segunda imagen al PDF en la esquina superior derecha
    doc.addImage(img2, 'PNG', 250, 10, 30, 30); // Coordenadas x, y y dimensiones width, height
    const imgData = canvas.toDataURL('image/png');
    doc.addImage(imgData, 'PNG', 20, 70, 270, 100); // Ajusta las coordenadas y tamaño
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
    const fileName = `CambiosDePuestoPorDepartamento_${day}_${month}_${year}.pdf`;
    // Guardar el PDF con el nombre dinámico
    doc.save(fileName)

    });
  } else {
    console.error('No se encontró el gráfico para imprimir.');
  }
  }



  //PERIODO


  //Impresion de Periodo Incidencias
  impresionPeriodoIncidencias(chartId: string) {
    const chartElement = document.getElementById(chartId);
  if (chartElement) {
    html2canvas(chartElement).then(canvas => {
      const doc = new jsPDF({
        orientation: 'landscape',  // Establecer orientación horizontal
      });
      doc.text('CANTIDAD DE INCIDENCIAS POR MES Y AÑO '+this.periodoSeleccionado, 80, 50);
      const img1 = new Image();
      const img2 = new Image();
      img1.src = 'assets/famo.png'; // Ruta de tu primera imagen local
      img2.src = 'assets/logo.png'; // Ruta de tu segunda imagen local
       // Agregar la primera imagen al PDF en la esquina superior izquierda
    doc.addImage(img1, 'PNG', 10, 10, 30, 20); // Coordenadas x, y y dimensiones width, height
    // Agregar la segunda imagen al PDF en la esquina superior derecha
    doc.addImage(img2, 'PNG', 250, 10, 30, 30); // Coordenadas x, y y dimensiones width, height
    const imgData = canvas.toDataURL('image/png');
    doc.addImage(imgData, 'PNG', 30, 70, 230, 80); // Ajusta las coordenadas y tamaño
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
    const fileName = `CantidadIncidenciasPeriodo${this.periodoSeleccionado}_${day}_${month}_${year}.pdf`;
    // Guardar el PDF con el nombre dinámico
    doc.save(fileName)

    });
  } else {
    console.error('No se encontró el gráfico para imprimir.');
  }
  }


//Impresion de Periodo Capacitaciones
  impresionPeriodoCapacitaciones(chartId: string) {
    const chartElement = document.getElementById(chartId);
  if (chartElement) {
    html2canvas(chartElement).then(canvas => {
      const doc = new jsPDF({
        orientation: 'landscape',  // Establecer orientación horizontal
      });
      doc.text('CANTIDAD DE DIAS DE CAPACITACIONES POR MES Y AÑO '+this.periodoSeleccionado, 50, 50);
      const img1 = new Image();
      const img2 = new Image();
      img1.src = 'assets/famo.png'; // Ruta de tu primera imagen local
      img2.src = 'assets/logo.png'; // Ruta de tu segunda imagen local
       // Agregar la primera imagen al PDF en la esquina superior izquierda
    doc.addImage(img1, 'PNG', 10, 10, 30, 20); // Coordenadas x, y y dimensiones width, height
    // Agregar la segunda imagen al PDF en la esquina superior derecha
    doc.addImage(img2, 'PNG', 250, 10, 30, 30); // Coordenadas x, y y dimensiones width, height
    const imgData = canvas.toDataURL('image/png');
    doc.addImage(imgData, 'PNG', 30, 70, 230, 80); // Ajusta las coordenadas y tamaño
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
    const fileName = `CantidadDiasCapacitacionesPeriodo${this.periodoSeleccionado}_${day}_${month}_${year}.pdf`;
    // Guardar el PDF con el nombre dinámico
    doc.save(fileName)

    });
  } else {
    console.error('No se encontró el gráfico para imprimir');
  }
  }


  //Impresion de Contratacion por Mes y Año
  impresionPeriodoContrataciones(chartId: string) {
    const chartElement = document.getElementById(chartId);
  if (chartElement) {
    html2canvas(chartElement).then(canvas => {
      const doc = new jsPDF({
        orientation: 'landscape',  // Establecer orientación horizontal
      });
      doc.text('CANTIDAD DE CONTRATACIONES POR MES Y AÑO '+this.periodoSeleccionado, 70, 50);
      const img1 = new Image();
      const img2 = new Image();
      img1.src = 'assets/famo.png'; // Ruta de tu primera imagen local
      img2.src = 'assets/logo.png'; // Ruta de tu segunda imagen local
       // Agregar la primera imagen al PDF en la esquina superior izquierda
    doc.addImage(img1, 'PNG', 10, 10, 30, 20); // Coordenadas x, y y dimensiones width, height
    // Agregar la segunda imagen al PDF en la esquina superior derecha
    doc.addImage(img2, 'PNG', 250, 10, 30, 30); // Coordenadas x, y y dimensiones width, height
    const imgData = canvas.toDataURL('image/png');
    doc.addImage(imgData, 'PNG', 30, 70, 230, 80); // Ajusta las coordenadas y tamaño
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
    const fileName = `CantidadContratacionesPeriodo${this.periodoSeleccionado}_${day}_${month}_${year}.pdf`;
    // Guardar el PDF con el nombre dinámico
    doc.save(fileName)

    });
  } else {
    console.error('No se encontró el gráfico para imprimir');
  }
  }

  //Impresion de Contratacion por Mes y Año
  impresionPeriodoEdadesSalidas(chartId: string) {
    const chartElement = document.getElementById(chartId);
  if (chartElement) {
    html2canvas(chartElement).then(canvas => {
      const doc = new jsPDF({
        orientation: 'landscape',  // Establecer orientación horizontal
      });
      doc.text('LAS SALIDAS DE EDADES POR MES Y AÑO '+this.periodoSeleccionado, 70, 50);
      const img1 = new Image();
      const img2 = new Image();
      img1.src = 'assets/famo.png'; // Ruta de tu primera imagen local
      img2.src = 'assets/logo.png'; // Ruta de tu segunda imagen local
       // Agregar la primera imagen al PDF en la esquina superior izquierda
    doc.addImage(img1, 'PNG', 10, 10, 30, 20); // Coordenadas x, y y dimensiones width, height
    // Agregar la segunda imagen al PDF en la esquina superior derecha
    doc.addImage(img2, 'PNG', 250, 10, 30, 30); // Coordenadas x, y y dimensiones width, height
    const imgData = canvas.toDataURL('image/png');
    doc.addImage(imgData, 'PNG', 30, 70, 230, 80); // Ajusta las coordenadas y tamaño
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
    const fileName = `CantidadSalidasEdadesPeriodo${this.periodoSeleccionado}_${day}_${month}_${year}.pdf`;
    // Guardar el PDF con el nombre dinámico
    doc.save(fileName)

    });
  } else {
    console.error('No se encontró el gráfico para imprimir');
  }
  }


  //Impresion de Contratacion por Mes y Año
  impresionPeriodoDeDiasIncidencias(chartId: string) {
    const chartElement = document.getElementById(chartId);
  if (chartElement) {
    html2canvas(chartElement).then(canvas => {
      const doc = new jsPDF({
        orientation: 'landscape',  // Establecer orientación horizontal
      });
      doc.text('DIAS DE INCIDENCIAS POR DEPARTAMENTO POR MES Y AÑO '+this.periodoSeleccionado, 50, 50);
      const img1 = new Image();
      const img2 = new Image();
      img1.src = 'assets/famo.png'; // Ruta de tu primera imagen local
      img2.src = 'assets/logo.png'; // Ruta de tu segunda imagen local
       // Agregar la primera imagen al PDF en la esquina superior izquierda
    doc.addImage(img1, 'PNG', 10, 10, 30, 20); // Coordenadas x, y y dimensiones width, height
    // Agregar la segunda imagen al PDF en la esquina superior derecha
    doc.addImage(img2, 'PNG', 250, 10, 30, 30); // Coordenadas x, y y dimensiones width, height
    const imgData = canvas.toDataURL('image/png');
    doc.addImage(imgData, 'PNG', 30, 70, 230, 80); // Ajusta las coordenadas y tamaño
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
    const fileName = `DiasIncidenciasPorDepartamento${this.periodoSeleccionado}_${day}_${month}_${year}.pdf`;
    // Guardar el PDF con el nombre dinámico
    doc.save(fileName)

    });
  } else {
    console.error('No se encontró el gráfico para imprimir');
  }
  }

  

}
