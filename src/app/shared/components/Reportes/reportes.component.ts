import { Component, OnInit, ViewChild } from '@angular/core';
import {jsPDF} from 'jspdf';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import {NgxDocViewerModule} from 'ngx-doc-viewer';
import { EmpleadosService } from '../../../../../backend/services/empleados.service';
import { Empleado } from '../../../../../backend/models/empleado.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgFor,NgIf } from '@angular/common';
import 'jspdf-autotable';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DatosComponent } from '../../../../../frontend/Datos/datos.component';

import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Table } from 'primeng/table';
import { VacacionesService } from '../../../../../backend/services/vacaciones.service';
import { FechaVacacion, Vacacion } from '../../../../../backend/models/vacacion.model';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { IncidenciasService } from '../../../../../backend/services/incidencias.service';
import { Incidencia } from '../../../../../backend/models/incidencia.model';
import { CapacitacionService } from '../../../../../backend/services/capacitacion.service';
import { CapacitacionesEmpleado, CapacitacionesSuscripciones, CapacitacionProgramada } from '../../../../../backend/models/capacitacion.model';



import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import 'moment/locale/es';



@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [NgxDocViewerModule,FormsModule, MatInputModule, MatSelectModule, MatFormFieldModule,NgFor,NgIf,ReactiveFormsModule,
    MatIconModule, MatButtonModule, MatToolbarModule,MatMenuModule, TableModule, CommonModule, IconFieldModule, InputIconModule, InputTextModule,
    DropdownModule, ToastModule, RippleModule,MatDatepickerModule
  ],

  providers:[EmpleadosService,VacacionesService, MessageService, IncidenciasService, CapacitacionService, provideNativeDateAdapter(),{provide: MAT_DATE_LOCALE, useValue: 'es-ES'}],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent implements OnInit{
  //doc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  empleados: Empleado[]=[];
  empleadosActive: Empleado[]=[];
  empleadosInactive: Empleado[]=[];
  showempleados: boolean = false;
  showVacaciones: boolean = false;
  showIncidencias: boolean = false;
  showCapacitacion: boolean = false;
  showCapacitaciones: boolean = false;
  opcionSeleccionada: string | undefined;
  opciones:string[]=['-', 'Empleados', 'Empleados Activos', 'Empleados Inactivos'];
  FormEmpleados: FormGroup;
  FormVacaciones: FormGroup;
  selectedEmpleados!: Empleado;
  vacacionesEmpleado: FechaVacacion[]=[];
  vacacionesEmpleadoPeriodo: Vacacion[]=[];
  periodoSeleccionado: string = '2024';
  periodos: string[]=['2022','2023', '2024', '2025', '2026'];
  incidencias: Incidencia[]=[];
  capacitacionesEmpleado: CapacitacionesEmpleado[]=[];
  capacitacionesConsultadas: CapacitacionProgramada[]=[];
  capacitacionSeleccionada!: CapacitacionProgramada;
  capacitacionesSuscritas: CapacitacionesSuscripciones[]=[];
  //Consulta Capacitacion
  fechainicio: Date | undefined;
  fechafin: Date | undefined;
  btnSeleccionarCapacitacion: boolean = true;


  @ViewChild('dt') dt!: Table; // Referencia a la tabla

  

imprimir(){
  alert('Prueba');
}

verEmpleados(){
  console.log(this.selectedEmpleados);
}

periodo(){

}

filterGlobal(event: Event, field: string) {
  const inputElement = event.target as HTMLInputElement;
  this.dt.filterGlobal(inputElement.value, field);
}



  constructor(private empleadosService:EmpleadosService, private _fb: FormBuilder,public dialog: MatDialog, private vacacionesService: VacacionesService, private messageService: MessageService,
    private incidenciasService: IncidenciasService, private capacitacionesService: CapacitacionService
  ){
    this.FormEmpleados = this._fb.group({
      Opcion:['']
    });

    this.FormVacaciones = this._fb.group({
      Opcion:['']
    });

  }

  openDialog() {
    const dialogRef = this.dialog.open(DatosComponent, {
      height: '400px',
      width: '600px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openEmpleados(){
this.showempleados = true;
//Ocultar
this.showVacaciones = false;
this.showIncidencias = false;
this.showCapacitacion = false;
this.showCapacitaciones = false;

  }

  openVacaciones(){
    this.showVacaciones = true;
//Ocultar
this.showempleados = false;
this.showIncidencias = false;
this.showCapacitacion = false;
this.showCapacitaciones = false;
  }


  openIncidencias(){
    this.showIncidencias = true;
//Ocultar
this.showempleados = false;
this.showVacaciones = false;
this.showCapacitacion = false;
this.showCapacitaciones = false;
  }

  openCapacitacion(){
    this.showCapacitacion = true;
    //OCULTAR
    this.showIncidencias = false;
    this.showempleados = false;
    this.showVacaciones = false;
    this.showCapacitaciones = false;
  }

  openCapacitaciones(){
    this.showCapacitaciones = true;
    //OCULTAR
    this.showIncidencias = false;
    this.showempleados = false;
    this.showVacaciones = false;
    this.showCapacitacion = false;
  }


  ngOnInit(): void {
    this.empleadosService.getEmpleadosAll().subscribe({
      next:(data)=>{
        this.empleados = data;
        console.log(this.empleados);
      },
      error:(err: any)=>{
      }
    })

    this.empleadosService.getEmpleados().subscribe({
      next:(data)=>{
        this.empleadosActive = data;
        console.log(this.empleadosActive);
      },
      error:(err: any)=>{
      }
    })

    this.empleadosService.getEmpleadosInactive().subscribe({
      next:(data)=>{
        this.empleadosInactive = data;
        console.log(this.empleadosInactive);
      },
      error:(err: any)=>{
      }
    })



  }

  filtro(consulta: boolean){
    

if(this.FormEmpleados.value.Opcion){

  this.opcionSeleccionada = this.FormEmpleados.value.Opcion;
  console.log(this.opcionSeleccionada);
  /*
  console.log(this.Form.value.Opcion);
  alert(this.Form.value.Opcion);*/


  
switch (this.FormEmpleados.value.Opcion) {
  case 'Empleados':
    this.imprimirEmpleados(consulta);
    break;
  case 'Empleados Activos':
    this.imprimirEmpleadosActive(consulta);

    break;
  case 'Empleados Inactivos':
    this.imprimirEmpleadosInactive(consulta);
    break;
  default:
    this.opcionSeleccionada = undefined;
    (document.querySelector('iframe') as HTMLIFrameElement).src = 'about:blank';
    break;

}

}




  }

  reiniciarpdf(){
    (document.querySelector('iframe') as HTMLIFrameElement).src = 'about:blank';
  }


  //Imprimir Empleados 
  imprimirEmpleados(preview: boolean){
    const doc = new jsPDF({
      orientation: 'landscape',  // Establecer orientación horizontal
    });
    // Agregar título
    doc.setFontSize(16);
    doc.text('Lista de Todos los Empleados', 14, 22);

    // Definir columnas de la tabla
    const columns = ['No. Nomina','Nombre Completo', 'Puesto', 'Departamento', 'Edad', 'Estatus'];

    // Extraer datos de empleados
    const rows = this.empleados.map(empleado => [
      empleado.NoNomina,
      `${empleado.Nombre} ${empleado.Apellidos}`, // Nombre Completo
      empleado.NombrePuesto,                     // Puesto
      empleado.NombreDepartamento,                // Departamento
    empleado.Edad,
    empleado.EstadoEmpleado ? 'Activo' : 'Baja'  // Condición para EstadoEmpleado
    ]);

    // Generar la tabla
    (doc as any).autoTable({
      head: [columns],
      body: rows,
      startY: 30, // Posición inicial de la tabla en el eje Y
    });

    // Obtener la fecha y hora actual
    const now = new Date();
    const dateStr = now.toLocaleDateString();
    const timeStr = now.toLocaleTimeString();

    doc.setFontSize(10); // Cambia el tamaño de la letra (por ejemplo, 10)
    // Agregar la fecha y hora en la parte inferior del documento
    doc.text(`Fecha de impresión: ${dateStr}`, 10, 180);
    doc.text(`Hora de impresión: ${timeStr}`, 10, 190);

    if (preview) {
      const pdfBlob = doc.output('bloburl');
    // Convertimos el objeto URL a una cadena de texto
    (document.querySelector('iframe') as HTMLIFrameElement).src = pdfBlob.toString();

    } else {
       // Formatear la fecha para el nombre del archivo
       const day = String(now.getDate()).padStart(2, '0');
       const month = String(now.getMonth() + 1).padStart(2, '0'); // Los meses son de 0 a 11
       const year = now.getFullYear();
       const fileName = `empleados_${day}_${month}_${year}.pdf`;
      // Guardar el PDF con nombre personalizado
    doc.save(fileName);
    }
  
  }


    //Imprimir Empleados 
    imprimirEmpleadosActive(preview: boolean){
      const doc = new jsPDF({
        orientation: 'landscape',  // Establecer orientación horizontal
      });
      // Agregar título
      doc.setFontSize(16);
      doc.text('Lista de Empleados Active', 14, 22);
  
      // Definir columnas de la tabla
      const columns = ['No. Nomina','Nombre Completo', 'Puesto', 'Departamento', 'Edad', 'Fecha Ingreso'];
  
      // Extraer datos de empleados
      const rows = this.empleadosActive.map(empleado => [
        empleado.NoNomina,
        `${empleado.Nombre} ${empleado.Apellidos}`, // Nombre Completo
        empleado.NombrePuesto,                     // Puesto
        empleado.NombreDepartamento,                // Departamento
      empleado.Edad,
      new Date(empleado.Ingreso).toLocaleDateString('es-ES')
      ]);
  
      // Generar la tabla
      (doc as any).autoTable({
        head: [columns],
        body: rows,
        startY: 30, // Posición inicial de la tabla en el eje Y
      });
  
      // Obtener la fecha y hora actual
      const now = new Date();
      const dateStr = now.toLocaleDateString();
      const timeStr = now.toLocaleTimeString();
      doc.setFontSize(10); // Cambia el tamaño de la letra (por ejemplo, 10)
      // Agregar la fecha y hora en la parte inferior del documento
      doc.text(`Fecha de impresión: ${dateStr}`, 10, 180);
      doc.text(`Hora de impresión: ${timeStr}`, 10, 190);
  
      if (preview) {
        const pdfBlob = doc.output('bloburl');
      // Convertimos el objeto URL a una cadena de texto
      (document.querySelector('iframe') as HTMLIFrameElement).src = pdfBlob.toString();
  
      } else {
         // Formatear la fecha para el nombre del archivo
         const day = String(now.getDate()).padStart(2, '0');
         const month = String(now.getMonth() + 1).padStart(2, '0'); // Los meses son de 0 a 11
         const year = now.getFullYear();
         const fileName = `empleados_${day}_${month}_${year}.pdf`;
        // Guardar el PDF con nombre personalizado
      doc.save(fileName);
      }
    
    }




    imprimirEmpleadosInactive(preview: boolean){
      const doc = new jsPDF({
        orientation: 'landscape',  // Establecer orientación horizontal
      });
      // Agregar título
      doc.setFontSize(16);
      doc.text('Lista de Empleados Dados de Bajas', 14, 22);
  
      // Definir columnas de la tabla
      const columns = ['No. Nomina','Nombre Completo', 'Puesto', 'Departamento', 'Edad', 'Fecha Ingreso'];
  
      // Extraer datos de empleados
      const rows = this.empleadosInactive.map(empleado => [
        empleado.NoNomina,
        `${empleado.Nombre} ${empleado.Apellidos}`, // Nombre Completo
        empleado.NombrePuesto,                     // Puesto
        empleado.NombreDepartamento,                // Departamento
      empleado.Edad,
      new Date(empleado.Ingreso).toLocaleDateString('es-ES')
      ]);
  
      // Generar la tabla
      (doc as any).autoTable({
        head: [columns],
        body: rows,
        startY: 30, // Posición inicial de la tabla en el eje Y
      });
  
      // Obtener la fecha y hora actual
      const now = new Date();
      const dateStr = now.toLocaleDateString();
      const timeStr = now.toLocaleTimeString();
      doc.setFontSize(10); // Cambia el tamaño de la letra (por ejemplo, 10)
      // Agregar la fecha y hora en la parte inferior del documento
      doc.text(`Fecha de impresión: ${dateStr}`, 10, 180);
      doc.text(`Hora de impresión: ${timeStr}`, 10, 190);
  
      if (preview) {
        const pdfBlob = doc.output('bloburl');
      // Convertimos el objeto URL a una cadena de texto
      (document.querySelector('iframe') as HTMLIFrameElement).src = pdfBlob.toString();
  
      } else {
         // Formatear la fecha para el nombre del archivo
         const day = String(now.getDate()).padStart(2, '0');
         const month = String(now.getMonth() + 1).padStart(2, '0'); // Los meses son de 0 a 11
         const year = now.getFullYear();
         const fileName = `empleados_bajas_${day}_${month}_${year}.pdf`;
        // Guardar el PDF con nombre personalizado
      doc.save(fileName);
      }
    
    }







  /*pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  <pdf-viewer [src]="pdfSrc"
  [render-text]="true"
  [original-size]="false"
  style="width: 400px; height: 500px"
></pdf-viewer>*/

  impresion() {
    const doc = new jsPDF();

    // Agregar texto en la parte superior del documento
    doc.text('Hola Mundo de Impresion', 10, 10);

    const img1 = new Image();
    const img2 = new Image();
    img1.src = 'assets/famo.png'; // Ruta de tu primera imagen local
    img2.src = 'assets/logo.png'; // Ruta de tu segunda imagen local

    img1.onload = () => {
      // Agregar la primera imagen al PDF en la esquina superior izquierda
      doc.addImage(img1, 'PNG', 10, 10, 30, 20); // Coordenadas x, y y dimensiones width, height

      img2.onload = () => {
        // Agregar la segunda imagen al PDF en la esquina superior derecha
        doc.addImage(img2, 'PNG', 170, 10, 30, 30); // Coordenadas x, y y dimensiones width, height

        // Obtener la fecha y hora actual
        const now = new Date();
        const dateStr = now.toLocaleDateString();
        const timeStr = now.toLocaleTimeString();

        // Agregar la fecha y hora en la parte inferior del documento
        doc.text(`Fecha de impresión: ${dateStr}`, 10, 280);
        doc.text(`Hora de impresión: ${timeStr}`, 10, 290);

        // Formatear la fecha para el nombre del archivo
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Los meses son de 0 a 11
        const year = now.getFullYear();

        const fileName = `archivo1_${day}_${month}_${year}.pdf`;

        // Guardar el PDF con el nombre dinámico
        doc.save(fileName);

      };
    };
  }

  

imprimirvacaciones(){
if(this.selectedEmpleados == undefined){
  this.messageService.add({ severity: 'error', summary: 'Cuidado', detail: 'No se Encuentra seleccionado ningun Empleado',key: 'tl' });
}else{

this.vacacionesService.getVacacionesPorPeriodo(this.selectedEmpleados.NoNomina, this.periodoSeleccionado).subscribe({
  next:(data)=>{
    this.vacacionesEmpleadoPeriodo = data;
    console.log(this.vacacionesEmpleadoPeriodo);
  },
  error:(error: any)=>{
    console.log('Error' + error);
  }
})

  this.vacacionesService.getFechasVacacionesPerido(this.selectedEmpleados.NoNomina, this.periodoSeleccionado).subscribe({
    next:(data)=>{
      console.log(data);
      this.vacacionesEmpleado = data;
      console.log(this.vacacionesEmpleado);



      const doc = new jsPDF();

      // Configurar el estilo del encabezado
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text('Lista de Vacaciones', 14, 20);
      
      // Información del empleado en el encabezado
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Nombre Completo: ${this.selectedEmpleados.Nombre} ${this.selectedEmpleados.Apellidos}`, 14, 30);
      doc.text(`No. Nómina: ${this.selectedEmpleados.NoNomina}`, 14, 36);
      doc.text(`Puesto: ${this.selectedEmpleados.NombrePuesto}`, 14, 42);
      doc.text(`Departamento: ${this.selectedEmpleados.NombreDepartamento}`, 14, 48);
      doc.text(`Periodo Seleccionado: ${this.periodoSeleccionado}`, 14, 54);
      if(this.vacacionesEmpleadoPeriodo.length == 0){
        doc.text('NO CUENTA CON DIAS', 14, 66);
      }else{
        doc.text(`Dias Totales: ${this.vacacionesEmpleadoPeriodo[0].DiasVacaciones}`, 14, 60);
      doc.text(`Dias Disponibles: ${this.vacacionesEmpleadoPeriodo[0].DiasDisponibles}`, 14, 66);
      doc.text(`Dias Utilizados: ${this.vacacionesEmpleadoPeriodo[0].DiasUtilizados}`, 14, 72);
      }
      
      // Extraer datos de empleados
      
      
      // Añadir un espacio antes de la tabla
      doc.text('Vacaciones:', 14, 78);
      
      // Definir columnas de la tabla
      //const columns = ['Fecha Inicio', 'Fecha Fin', 'Días Tomados', 'Días Restantes'];
      const columns = ['Fecha', 'Periodo', 'Comentarios'];
      
      
      console.log(this.vacacionesEmpleado)
      

      

      // Simulación de datos de vacaciones (esto debe ser tu lógica)
      const rows = this.vacacionesEmpleado.map(vacacion => [
        //new Date(vacacion.Fecha).toLocaleDateString('es-ES'),
        vacacion.Fecha.toString().split('T')[0].split('-').reverse().join('/'),
        vacacion.Periodo,
        vacacion.Comentarios
        //new Date(vacacion.FechaFin).toLocaleDateString('es-ES'),
        
    ]);
      
       // Extraer datos de empleados
          
      /*const rows = [
        [
        this.selectedEmpleados.NoNomina,
        `${this.selectedEmpleados.Nombre} ${this.selectedEmpleados.Apellidos}`, // Nombre Completo
        this.selectedEmpleados.NombrePuesto,                     // Puesto
        this.selectedEmpleados.NombreDepartamento,                // Departamento
        this.selectedEmpleados.Edad,
      new Date(this.selectedEmpleados.Ingreso).toLocaleDateString('es-ES')
      ]
      ];*/
      
      
      // Generar la tabla
      (doc as any).autoTable({
        head: [columns],
        body: rows,
        startY: 80, // Iniciar la tabla después de la información del empleado
        margin: { top: 10, left: 14, right: 14 },
        styles: { fontSize: 10, cellPadding: 3 }, // Personalizar el estilo de la tabla
        theme: 'striped', // Estilo de tabla con líneas alternas
        headStyles: { fillColor: [22, 160, 133] }, // Color de encabezado de tabla
      });
      
      // Obtener la fecha y hora actual
      const now = new Date();
      const dateStr = now.toLocaleDateString();
      const timeStr = now.toLocaleTimeString();
      doc.setFontSize(10); // Cambia el tamaño de la letra (por ejemplo, 10)
      // Agregar la fecha y hora en la parte inferior del documento
      doc.text(`Fecha de impresión: ${dateStr}`, 10, 280);
      doc.text(`Hora de impresión: ${timeStr}`, 10, 290);
      
      
      
      const pdfBlob = doc.output('bloburl');
      // Convertimos el objeto URL a una cadena de texto
      (document.querySelector('iframe') as HTMLIFrameElement).src = pdfBlob.toString();
      



    },
    error:(err: any)=>{
    }
  });


}
    

/*this.selectedEmpleados.forEach(element => {
  this.vacacionesService.getFechasVacaciones(element.NoNomina).subscribe({
    next:(data)=>{
      console.log(data);
    },
    error:(err: any)=>{
    }
  });
});*/

/*const doc = new jsPDF({
  orientation: 'landscape',  // Establecer orientación horizontal
});*/

/*
if (true) {
  const pdfBlob = doc.output('bloburl');
// Convertimos el objeto URL a una cadena de texto
(document.querySelector('iframe') as HTMLIFrameElement).src = pdfBlob.toString();

} else {
   // Formatear la fecha para el nombre del archivo
   const day = String(now.getDate()).padStart(2, '0');
   const month = String(now.getMonth() + 1).padStart(2, '0'); // Los meses son de 0 a 11
   const year = now.getFullYear();
   const fileName = `empleados_bajas_${day}_${month}_${year}.pdf`;
  // Guardar el PDF con nombre personalizado
doc.save(fileName);
}*/


  }

  imprimirIncidencias(){
    if(this.selectedEmpleados == undefined){
      this.messageService.add({ severity: 'error', summary: 'Cuidado', detail: 'No se Encuentra seleccionado ningun Empleado',key: 'tl' });
    }else{
    
    this.incidenciasService.getIncidenciasPorEmpleado(this.selectedEmpleados.NoNomina).subscribe({
      next:(data)=>{
        this.incidencias = data;
        console.log(this.incidencias);


        const doc = new jsPDF({
          orientation: 'landscape'
        });
          // Configurar el estilo del encabezado
          doc.setFontSize(20);
          doc.setFont('helvetica', 'bold');
          doc.text('Lista de Incidencias', 14, 20);
          
          // Información del empleado en el encabezado
          doc.setFontSize(12);
          doc.setFont('helvetica', 'normal');
          doc.text(`Nombre Completo: ${this.selectedEmpleados.Nombre} ${this.selectedEmpleados.Apellidos}`, 14, 30);
          doc.text(`No. Nómina: ${this.selectedEmpleados.NoNomina}`, 14, 36);
          doc.text(`Puesto: ${this.selectedEmpleados.NombrePuesto}`, 14, 42);
          doc.text(`Departamento: ${this.selectedEmpleados.NombreDepartamento}`, 14, 48);

      
          // Extraer datos de empleados
          
          
          // Añadir un espacio antes de la tabla
          doc.text('Incidencias:', 14, 58);
          
          // Definir columnas de la tabla
          //const columns = ['Fecha Inicio', 'Fecha Fin', 'Días Tomados', 'Días Restantes'];
          const columns = ['Motivo', 'FechaInicio', 'FechaFin', 'DiasSubsidios', 'Categoria', 'FolioAlta', 'FolioBaja', 'Estado'];
          
    
          // Simulación de datos de vacaciones (esto debe ser tu lógica)
          const rows =  this.incidencias.map(incidencia => [
            //new Date(vacacion.Fecha).toLocaleDateString('es-ES'),
            incidencia.Motivo,
            incidencia.FechaInicio.toString().split('T')[0].split('-').reverse().join('/'),
            incidencia.FechaFin.toString().split('T')[0].split('-').reverse().join('/'),
            incidencia.DiasSubsidios,
            incidencia.CategoriaIncidencia,
            incidencia.FolioAlta,
            incidencia.FolioBaja,
            incidencia.Estatus ? 'Cerrado' : 'Abierto' 

            //new Date(vacacion.FechaFin).toLocaleDateString('es-ES'),
            
        ]);
          
           // Extraer datos de empleados
              
          /*const rows = [
            [
            this.selectedEmpleados.NoNomina,
            `${this.selectedEmpleados.Nombre} ${this.selectedEmpleados.Apellidos}`, // Nombre Completo
            this.selectedEmpleados.NombrePuesto,                     // Puesto
            this.selectedEmpleados.NombreDepartamento,                // Departamento
            this.selectedEmpleados.Edad,
          new Date(this.selectedEmpleados.Ingreso).toLocaleDateString('es-ES')
          ]
          ];*/
          
          
          // Generar la tabla
          
          (doc as any).autoTable({
            head: [columns],
            body: rows,
            startY: 62, // Iniciar la tabla después de la información del empleado
            margin: { top: 10, left: 14, right: 14 },
            styles: { fontSize: 10, cellPadding: 3 }, // Personalizar el estilo de la tabla
            theme: 'striped', // Estilo de tabla con líneas alternas
            headStyles: { fillColor: [22, 160, 133] }, // Color de encabezado de tabla
          });
          
          // Obtener la fecha y hora actual
          const now = new Date();
          const dateStr = now.toLocaleDateString();
          const timeStr = now.toLocaleTimeString();
          doc.setFontSize(10); // Cambia el tamaño de la letra (por ejemplo, 10)
          // Agregar la fecha y hora en la parte inferior del documento
          doc.text(`Fecha de impresión: ${dateStr}`, 10, 280);
          doc.text(`Hora de impresión: ${timeStr}`, 10, 290);
          
          
          
          const pdfBlob = doc.output('bloburl');
          // Convertimos el objeto URL a una cadena de texto
          (document.querySelector('iframe') as HTMLIFrameElement).src = pdfBlob.toString();


      },
      error:(error: any)=>{
        console.log('Error' + error);
      }
    })
    
    /*
      this.vacacionesService.getFechasVacacionesPerido(this.selectedEmpleados.NoNomina, this.periodoSeleccionado).subscribe({
        next:(data)=>{
          console.log(data);
          this.vacacionesEmpleado = data;
          console.log(this.vacacionesEmpleado);
    
    
    
          const doc = new jsPDF();
    
          // Configurar el estilo del encabezado
          doc.setFontSize(20);
          doc.setFont('helvetica', 'bold');
          doc.text('Lista de Vacaciones', 14, 20);
          
          // Información del empleado en el encabezado
          doc.setFontSize(12);
          doc.setFont('helvetica', 'normal');
          doc.text(`Nombre Completo: ${this.selectedEmpleados.Nombre} ${this.selectedEmpleados.Apellidos}`, 14, 30);
          doc.text(`No. Nómina: ${this.selectedEmpleados.NoNomina}`, 14, 36);
          doc.text(`Puesto: ${this.selectedEmpleados.NombrePuesto}`, 14, 42);
          doc.text(`Departamento: ${this.selectedEmpleados.NombreDepartamento}`, 14, 48);
          doc.text(`Periodo Seleccionado: ${this.periodoSeleccionado}`, 14, 54);
          if(this.vacacionesEmpleadoPeriodo.length == 0){
            doc.text('NO CUENTA CON DIAS', 14, 66);
          }else{
            doc.text(`Dias Totales: ${this.vacacionesEmpleadoPeriodo[0].DiasVacaciones}`, 14, 60);
          doc.text(`Dias Disponibles: ${this.vacacionesEmpleadoPeriodo[0].DiasDisponibles}`, 14, 66);
          doc.text(`Dias Utilizados: ${this.vacacionesEmpleadoPeriodo[0].DiasUtilizados}`, 14, 72);
          }
          
          // Extraer datos de empleados
          
          
          // Añadir un espacio antes de la tabla
          doc.text('Vacaciones:', 14, 78);
          
          // Definir columnas de la tabla
          //const columns = ['Fecha Inicio', 'Fecha Fin', 'Días Tomados', 'Días Restantes'];
          const columns = ['Fecha', 'Periodo', 'Comentarios'];
          
          
          console.log(this.vacacionesEmpleado)
          
    
          
    
          // Simulación de datos de vacaciones (esto debe ser tu lógica)
          const rows = this.vacacionesEmpleado.map(vacacion => [
            //new Date(vacacion.Fecha).toLocaleDateString('es-ES'),
            vacacion.Fecha.toString().split('T')[0].split('-').reverse().join('/'),
            vacacion.Periodo,
            vacacion.Comentarios
            //new Date(vacacion.FechaFin).toLocaleDateString('es-ES'),
            
        ]);*/
          
           // Extraer datos de empleados
              
          /*const rows = [
            [
            this.selectedEmpleados.NoNomina,
            `${this.selectedEmpleados.Nombre} ${this.selectedEmpleados.Apellidos}`, // Nombre Completo
            this.selectedEmpleados.NombrePuesto,                     // Puesto
            this.selectedEmpleados.NombreDepartamento,                // Departamento
            this.selectedEmpleados.Edad,
          new Date(this.selectedEmpleados.Ingreso).toLocaleDateString('es-ES')
          ]
          ];*/
          
          
          // Generar la tabla
          /*Aqui
          (doc as any).autoTable({
            head: [columns],
            body: rows,
            startY: 80, // Iniciar la tabla después de la información del empleado
            margin: { top: 10, left: 14, right: 14 },
            styles: { fontSize: 10, cellPadding: 3 }, // Personalizar el estilo de la tabla
            theme: 'striped', // Estilo de tabla con líneas alternas
            headStyles: { fillColor: [22, 160, 133] }, // Color de encabezado de tabla
          });
          
          // Obtener la fecha y hora actual
          const now = new Date();
          const dateStr = now.toLocaleDateString();
          const timeStr = now.toLocaleTimeString();
          doc.setFontSize(10); // Cambia el tamaño de la letra (por ejemplo, 10)
          // Agregar la fecha y hora en la parte inferior del documento
          doc.text(`Fecha de impresión: ${dateStr}`, 10, 280);
          doc.text(`Hora de impresión: ${timeStr}`, 10, 290);
          
          
          
          const pdfBlob = doc.output('bloburl');
          // Convertimos el objeto URL a una cadena de texto
          (document.querySelector('iframe') as HTMLIFrameElement).src = pdfBlob.toString();
          
    
    
    
        },
        error:(err: any)=>{
        }
      });*/
    
    
    }
  }
    


  imprimirCapacitaciones(){
    if(this.selectedEmpleados == undefined){
      this.messageService.add({ severity: 'error', summary: 'Cuidado', detail: 'No se Encuentra seleccionado ningun Empleado',key: 'tl' });
    }else{

    this.capacitacionesService.getCapacitacionEmpleado(this.selectedEmpleados.NoNomina).subscribe({
      next:(data)=>{
        this.capacitacionesEmpleado = data;


        const doc = new jsPDF({
          orientation: 'landscape'
        });
          // Configurar el estilo del encabezado
          doc.setFontSize(20);
          doc.setFont('helvetica', 'bold');
          doc.text('Lista de Capacitaciones', 14, 20);
          
          // Información del empleado en el encabezado
          doc.setFontSize(12);
          doc.setFont('helvetica', 'normal');
          doc.text(`Nombre Completo: ${this.selectedEmpleados.Nombre} ${this.selectedEmpleados.Apellidos}`, 14, 30);
          doc.text(`No. Nómina: ${this.selectedEmpleados.NoNomina}`, 14, 36);
          doc.text(`Puesto: ${this.selectedEmpleados.NombrePuesto}`, 14, 42);
          doc.text(`Departamento: ${this.selectedEmpleados.NombreDepartamento}`, 14, 48);

      
          // Extraer datos de empleados
          
          
          // Añadir un espacio antes de la tabla
          doc.text('Capacitaciones:', 14, 58);
          
          // Definir columnas de la tabla
          //const columns = ['Fecha Inicio', 'Fecha Fin', 'Días Tomados', 'Días Restantes'];
          const columns = ['Nombre Capacitacion','FechaCapacitacion','Total Horas' ,'Origen', 'Frecuencia', 'Asistencia'];
          
    
          // Simulación de datos de vacaciones (esto debe ser tu lógica)
          const rows =  this.capacitacionesEmpleado.map(capacitacion => [
            //new Date(vacacion.Fecha).toLocaleDateString('es-ES'),
            capacitacion.NombreCapacitacion,
            capacitacion.FechaInicio.toString().split('T')[0].split('-').reverse().join('/'),
            capacitacion.Horas,
            capacitacion.Origen,
            capacitacion.Frecuencia,
            capacitacion.Asistencia ? 'Asistio' : '-' 

            //new Date(vacacion.FechaFin).toLocaleDateString('es-ES'),
            
        ]);
          
           // Extraer datos de empleados
              
          
          
          
          // Generar la tabla
          
          (doc as any).autoTable({
            head: [columns],
            body: rows,
            startY: 62, // Iniciar la tabla después de la información del empleado
            margin: { top: 10, left: 14, right: 14 },
            styles: { fontSize: 10, cellPadding: 3 }, // Personalizar el estilo de la tabla
            theme: 'striped', // Estilo de tabla con líneas alternas
            headStyles: { fillColor: [101, 153, 255] }, // Color de encabezado de tabla
          });
          
          // Obtener la fecha y hora actual
          const now = new Date();
          const dateStr = now.toLocaleDateString();
          const timeStr = now.toLocaleTimeString();
          doc.setFontSize(10); // Cambia el tamaño de la letra (por ejemplo, 10)
          // Agregar la fecha y hora en la parte inferior del documento
          doc.text(`Fecha de impresión: ${dateStr}`, 10, 280);
          doc.text(`Hora de impresión: ${timeStr}`, 10, 290);
          
          
          
          const pdfBlob = doc.output('bloburl');
          // Convertimos el objeto URL a una cadena de texto
          (document.querySelector('iframe') as HTMLIFrameElement).src = pdfBlob.toString();
        

      },
      error:(error: any)=>{
        console.log('Error', error);
      }
    })



/*
    this.incidenciasService.getIncidenciasPorEmpleado(this.selectedEmpleados.NoNomina).subscribe({
      next:(data)=>{
        this.incidencias = data;
        console.log(this.incidencias);


        const doc = new jsPDF({
          orientation: 'landscape'
        });
          // Configurar el estilo del encabezado
          doc.setFontSize(20);
          doc.setFont('helvetica', 'bold');
          doc.text('Lista de Incidencias', 14, 20);
          
          // Información del empleado en el encabezado
          doc.setFontSize(12);
          doc.setFont('helvetica', 'normal');
          doc.text(`Nombre Completo: ${this.selectedEmpleados.Nombre} ${this.selectedEmpleados.Apellidos}`, 14, 30);
          doc.text(`No. Nómina: ${this.selectedEmpleados.NoNomina}`, 14, 36);
          doc.text(`Puesto: ${this.selectedEmpleados.NombrePuesto}`, 14, 42);
          doc.text(`Departamento: ${this.selectedEmpleados.NombreDepartamento}`, 14, 48);

      
          // Extraer datos de empleados
          
          
          // Añadir un espacio antes de la tabla
          doc.text('Capacitaciones:', 14, 58);
          
          // Definir columnas de la tabla
          //const columns = ['Fecha Inicio', 'Fecha Fin', 'Días Tomados', 'Días Restantes'];
          const columns = ['Motivo', 'FechaInicio', 'FechaFin', 'DiasSubsidios', 'Categoria', 'FolioAlta', 'FolioBaja', 'Estado'];
          
    
          // Simulación de datos de vacaciones (esto debe ser tu lógica)
          const rows =  this.incidencias.map(incidencia => [
            //new Date(vacacion.Fecha).toLocaleDateString('es-ES'),
            incidencia.Motivo,
            incidencia.FechaInicio.toString().split('T')[0].split('-').reverse().join('/'),
            incidencia.FechaFin.toString().split('T')[0].split('-').reverse().join('/'),
            incidencia.DiasSubsidios,
            incidencia.CategoriaIncidencia,
            incidencia.FolioAlta,
            incidencia.FolioBaja,
            incidencia.Estatus ? 'Cerrado' : 'Abierto' 

            //new Date(vacacion.FechaFin).toLocaleDateString('es-ES'),
            
        ]);
          
           // Extraer datos de empleados
              
          
          
          
          // Generar la tabla
          
          (doc as any).autoTable({
            head: [columns],
            body: rows,
            startY: 62, // Iniciar la tabla después de la información del empleado
            margin: { top: 10, left: 14, right: 14 },
            styles: { fontSize: 10, cellPadding: 3 }, // Personalizar el estilo de la tabla
            theme: 'striped', // Estilo de tabla con líneas alternas
            headStyles: { fillColor: [22, 160, 133] }, // Color de encabezado de tabla
          });
          
          // Obtener la fecha y hora actual
          const now = new Date();
          const dateStr = now.toLocaleDateString();
          const timeStr = now.toLocaleTimeString();
          doc.setFontSize(10); // Cambia el tamaño de la letra (por ejemplo, 10)
          // Agregar la fecha y hora en la parte inferior del documento
          doc.text(`Fecha de impresión: ${dateStr}`, 10, 280);
          doc.text(`Hora de impresión: ${timeStr}`, 10, 290);
          
          
          
          const pdfBlob = doc.output('bloburl');
          // Convertimos el objeto URL a una cadena de texto
          (document.querySelector('iframe') as HTMLIFrameElement).src = pdfBlob.toString();


      },
      error:(error: any)=>{
        console.log('Error' + error);
      }
    })*/
    
    /*
      this.vacacionesService.getFechasVacacionesPerido(this.selectedEmpleados.NoNomina, this.periodoSeleccionado).subscribe({
        next:(data)=>{
          console.log(data);
          this.vacacionesEmpleado = data;
          console.log(this.vacacionesEmpleado);
    
    
    
          const doc = new jsPDF();
    
          // Configurar el estilo del encabezado
          doc.setFontSize(20);
          doc.setFont('helvetica', 'bold');
          doc.text('Lista de Vacaciones', 14, 20);
          
          // Información del empleado en el encabezado
          doc.setFontSize(12);
          doc.setFont('helvetica', 'normal');
          doc.text(`Nombre Completo: ${this.selectedEmpleados.Nombre} ${this.selectedEmpleados.Apellidos}`, 14, 30);
          doc.text(`No. Nómina: ${this.selectedEmpleados.NoNomina}`, 14, 36);
          doc.text(`Puesto: ${this.selectedEmpleados.NombrePuesto}`, 14, 42);
          doc.text(`Departamento: ${this.selectedEmpleados.NombreDepartamento}`, 14, 48);
          doc.text(`Periodo Seleccionado: ${this.periodoSeleccionado}`, 14, 54);
          if(this.vacacionesEmpleadoPeriodo.length == 0){
            doc.text('NO CUENTA CON DIAS', 14, 66);
          }else{
            doc.text(`Dias Totales: ${this.vacacionesEmpleadoPeriodo[0].DiasVacaciones}`, 14, 60);
          doc.text(`Dias Disponibles: ${this.vacacionesEmpleadoPeriodo[0].DiasDisponibles}`, 14, 66);
          doc.text(`Dias Utilizados: ${this.vacacionesEmpleadoPeriodo[0].DiasUtilizados}`, 14, 72);
          }
          
          // Extraer datos de empleados
          
          
          // Añadir un espacio antes de la tabla
          doc.text('Vacaciones:', 14, 78);
          
          // Definir columnas de la tabla
          //const columns = ['Fecha Inicio', 'Fecha Fin', 'Días Tomados', 'Días Restantes'];
          const columns = ['Fecha', 'Periodo', 'Comentarios'];
          
          
          console.log(this.vacacionesEmpleado)
          
    
          
    
          // Simulación de datos de vacaciones (esto debe ser tu lógica)
          const rows = this.vacacionesEmpleado.map(vacacion => [
            //new Date(vacacion.Fecha).toLocaleDateString('es-ES'),
            vacacion.Fecha.toString().split('T')[0].split('-').reverse().join('/'),
            vacacion.Periodo,
            vacacion.Comentarios
            //new Date(vacacion.FechaFin).toLocaleDateString('es-ES'),
            
        ]);*/
          
           // Extraer datos de empleados
              
          /*const rows = [
            [
            this.selectedEmpleados.NoNomina,
            `${this.selectedEmpleados.Nombre} ${this.selectedEmpleados.Apellidos}`, // Nombre Completo
            this.selectedEmpleados.NombrePuesto,                     // Puesto
            this.selectedEmpleados.NombreDepartamento,                // Departamento
            this.selectedEmpleados.Edad,
          new Date(this.selectedEmpleados.Ingreso).toLocaleDateString('es-ES')
          ]
          ];*/
          
          
          // Generar la tabla
          /*Aqui
          (doc as any).autoTable({
            head: [columns],
            body: rows,
            startY: 80, // Iniciar la tabla después de la información del empleado
            margin: { top: 10, left: 14, right: 14 },
            styles: { fontSize: 10, cellPadding: 3 }, // Personalizar el estilo de la tabla
            theme: 'striped', // Estilo de tabla con líneas alternas
            headStyles: { fillColor: [22, 160, 133] }, // Color de encabezado de tabla
          });
          
          // Obtener la fecha y hora actual
          const now = new Date();
          const dateStr = now.toLocaleDateString();
          const timeStr = now.toLocaleTimeString();
          doc.setFontSize(10); // Cambia el tamaño de la letra (por ejemplo, 10)
          // Agregar la fecha y hora en la parte inferior del documento
          doc.text(`Fecha de impresión: ${dateStr}`, 10, 280);
          doc.text(`Hora de impresión: ${timeStr}`, 10, 290);
          
          
          
          const pdfBlob = doc.output('bloburl');
          // Convertimos el objeto URL a una cadena de texto
          (document.querySelector('iframe') as HTMLIFrameElement).src = pdfBlob.toString();
          
    
    
    
        },
        error:(err: any)=>{
        }
      });*/
    
    
    }
  }
    

  
consultarCapacitaciones(){
  this.btnSeleccionarCapacitacion = true;
  if(this.fechainicio == undefined || this.fechafin == undefined){
   
  }else{
    this.capacitacionesService.getConsultaCapacitaciones(this.fechainicio, this.fechafin).subscribe({
      next:(data: any) =>{
        this.capacitacionesConsultadas = data;
        console.log(this.capacitacionesConsultadas);
          this.btnSeleccionarCapacitacion = false;
        


      },
      error:(error: any) =>{
        console.log('Error', error);
      },
    })

  }
//alert(this.fechainicio + ' '+ this.fechafin);

}
imprimirConsultaProgramaciones(){

  console.log(this.capacitacionSeleccionada.IdProgramacionCapacitacion);

  if(this.capacitacionSeleccionada == undefined){
    this.messageService.add({ severity: 'error', summary: 'Cuidado', detail: 'No se Encuentra seleccionado ningun Empleado',key: 'tl' });
  }else{
    
  this.capacitacionesService.getsingleProgramaciones(this.capacitacionSeleccionada.IdProgramacionCapacitacion).subscribe({
    next:(data)=>{

      this.capacitacionesSuscritas = data;
      console.log(this.capacitacionesSuscritas);
      //this.capacitacionesEmpleado = data;


      const doc = new jsPDF({
        orientation: 'landscape'
      });
        // Configurar el estilo del encabezado
        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        doc.text(`Lista de Participantes: ${this.capacitacionSeleccionada.NombreCapacitacion}`, 14, 20);
        
        // Información del empleado en el encabezado
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`Nombre Capacitacion: ${this.capacitacionSeleccionada.NombreCapacitacion}`, 14, 30);
        doc.text(`Horas: ${this.capacitacionSeleccionada.Horas}`, 14, 36);
        doc.text(`Persona Imparte: ${this.capacitacionSeleccionada.PersonaImparte}`, 14, 42);
        doc.text(`Dia Estimado: ${this.capacitacionSeleccionada.FechaInicio.toString().split('T')[0].split('-').reverse().join('/')}`, 14, 48);

    
        // Extraer datos de empleados
        
        // Añadir un espacio antes de la tabla
        doc.text('Participantes:', 14, 58);
        
        // Definir columnas de la tabla
        //const columns = ['Fecha Inicio', 'Fecha Fin', 'Días Tomados', 'Días Restantes'];
        const columns = ['No. Nomina','Nombre','Puesto' ,'Departamento', 'Asistencia'];
        
  
        // Simulación de datos de vacaciones (esto debe ser tu lógica)
        const rows =  this.capacitacionesSuscritas.map(capacitacion => [
          //new Date(vacacion.Fecha).toLocaleDateString('es-ES'),
          capacitacion.NoNomina,
          `${capacitacion.Nombre} ${capacitacion.Apellidos}`,
          capacitacion.NombrePuesto,
          capacitacion.NombreDepartamento,
          capacitacion.Asistencia ? 'Asistio' : '-' 

          //new Date(vacacion.FechaFin).toLocaleDateString('es-ES'),
          
      ]);
        
        // Generar la tabla
        
        (doc as any).autoTable({
          head: [columns],
          body: rows,
          startY: 62, // Iniciar la tabla después de la información del empleado
          margin: { top: 10, left: 14, right: 14 },
          styles: { fontSize: 10, cellPadding: 3 }, // Personalizar el estilo de la tabla
          theme: 'striped', // Estilo de tabla con líneas alternas
          headStyles: { fillColor:  this.capacitacionSeleccionada.Color}, // Color de encabezado de tabla
        });
        
        // Obtener la fecha y hora actual
        const now = new Date();
        const dateStr = now.toLocaleDateString();
        const timeStr = now.toLocaleTimeString();
        doc.setFontSize(10); // Cambia el tamaño de la letra (por ejemplo, 10)
        // Agregar la fecha y hora en la parte inferior del documento
        doc.text(`Fecha de impresión: ${dateStr}`, 10, 280);
        doc.text(`Hora de impresión: ${timeStr}`, 10, 290);
        
        
        
        const pdfBlob = doc.output('bloburl');
        // Convertimos el objeto URL a una cadena de texto
        (document.querySelector('iframe') as HTMLIFrameElement).src = pdfBlob.toString();


    },
    error:(error: any)=>{
      console.log('Error', error);
    }
  })


  
  }


}



  /*generatePDF(preview: boolean) {
    const doc = new jsPDF();
    doc.setFontSize(40);
    doc.setFont('helvetica', 'bold');
    doc.text(this.characterData.name, 60, 30);
    doc.setFont('helvetica', 'normal');
    doc.text(this.characterData.surname, 60, 42);
    doc.setFontSize(20);
    doc.text(`Fuerza: ${this.characterData.strength}`, 10, 60);
    doc.text(`Magia: ${this.characterData.magic}`, 10, 70);
    doc.text(`Velocidad: ${this.characterData.velocity}`, 10, 80);

    if (preview) {
      const pdfBlob = doc.output('bloburl');
    // Convertimos el objeto URL a una cadena de texto
    (document.querySelector('iframe') as HTMLIFrameElement).src = pdfBlob.toString();
    } else {
      doc.save(`${this.characterData.name}-${this.characterData.surname}.pdf`);
    }
  }*/


}
