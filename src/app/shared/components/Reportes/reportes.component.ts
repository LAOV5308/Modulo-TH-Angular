import { Component, OnInit, ViewChild, Inject } from '@angular/core';
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
import { DatosComponent } from '../empleados/Datos/datos.component';

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



import {MatDatepickerModule, MatDatepickerIntl} from '@angular/material/datepicker';

import {DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS} from '@angular/material/core';
import 'moment/locale/es';
import { BajasService } from '../../../../../backend/services/bajas.service';
import { Baja } from '../../../../../backend/models/baja.model';

import { Calificaciones } from '../../../../../backend/models/capacitacion.model';
import { map, Observable } from 'rxjs';
import { DepartamentosService } from '../../../../../backend/services/departamentos.service';
import { Departamento } from '../../../../../backend/models/departamento.model';
import { Usuario } from '../../../../../backend/models/user.model';
import { AuthService } from '../../../../../backend/services/auth.service';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [NgxDocViewerModule,FormsModule, MatInputModule, MatSelectModule, MatFormFieldModule,NgFor,NgIf,ReactiveFormsModule,
    MatIconModule, MatButtonModule, MatToolbarModule,MatMenuModule, TableModule, CommonModule, IconFieldModule, InputIconModule, InputTextModule,
    DropdownModule, ToastModule, RippleModule,MatDatepickerModule, NgIf, MatTooltipModule
  ],

  providers:[EmpleadosService, VacacionesService, MessageService, IncidenciasService, CapacitacionService, 
    provideMomentDateAdapter(),
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'}, // Español por defecto
    BajasService,
    DepartamentosService
  ],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})


export class ReportesComponent implements OnInit{
  //doc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  empleados: Empleado[]=[];
  empleadosActive: Empleado[]=[];
  empleadosInactive: Empleado[]=[];
  calificaciones: Calificaciones[] = [];
  bajas: Baja[]=[];
  showempleados: boolean = false;
  showVacaciones: boolean = false;
  showIncidencias: boolean = false;
  showCapacitacion: boolean = false;
  showCapacitaciones: boolean = false;
  opcionSeleccionada: string | undefined;
  opciones:string[]=['-', 'Empleados', 'Empleados Activos', 'Empleados Bajas'];
  FormEmpleados: FormGroup;
  FormVacaciones: FormGroup;
  selectedEmpleados!: Empleado;
  vacacionesEmpleado: FechaVacacion[]=[];
  vacacionesEmpleadoPeriodo: Vacacion[]=[];
  periodoSeleccionado: string = '2024';
  periodos: string[]=['2022','2023', '2024', '2025', '2026'];
  departamentos: Departamento[] = [];
  departamentoSeleccionado: string = '';
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
  IdUser!: number | null;
  usuario:Usuario[] =[];



verEmpleados(){
  //console.log(this.selectedEmpleados);
}

periodo(){

}

filterGlobal(event: Event, field: string) {
  const inputElement = event.target as HTMLInputElement;
  this.dt.filterGlobal(inputElement.value, field);
}



  constructor(private empleadosService:EmpleadosService, private _fb: FormBuilder,public dialog: MatDialog, private vacacionesService: VacacionesService, private messageService: MessageService,
    private incidenciasService: IncidenciasService, private capacitacionesService: CapacitacionService, private bajasService: BajasService, private departamentosService: DepartamentosService,
    private _adapter: DateAdapter<any>,
    private _intl: MatDatepickerIntl,
    @Inject(MAT_DATE_LOCALE) private _locale: string,private usuarioService: AuthService
  ){





    this.FormEmpleados = this._fb.group({
      Opcion:['']
    });

    this.FormVacaciones = this._fb.group({
      Opcion:['']
    });

  }



  getDateFormatString(): string {
    return 'DD/MM/YYYY'; // Formato de fecha español por defecto
  }


  openDialog() {
    const dialogRef = this.dialog.open(DatosComponent, {
      height: '400px',
      width: '600px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });
  }

  openEmpleados(){
    this.departamentoSeleccionado = '';
    this.FormEmpleados.setValue({
      Opcion:['']
    });
    this.opcionSeleccionada = undefined;
    this.ngOnInit();
this.showempleados = true;
//Ocultar
this.showVacaciones = false;
this.showIncidencias = false;
this.showCapacitacion = false;
this.showCapacitaciones = false;

  }

  openVacaciones(){
    this.ngOnInit();
   
    this.showVacaciones = true;
//Ocultar
this.showempleados = false;
this.showIncidencias = false;
this.showCapacitacion = false;
this.showCapacitaciones = false;
  }


  openIncidencias(){
    this.ngOnInit();
    this.showIncidencias = true;
//Ocultar
this.showempleados = false;
this.showVacaciones = false;
this.showCapacitacion = false;
this.showCapacitaciones = false;
  }

  openCapacitacion(){
    this.departamentoSeleccionado = '';
    this.ngOnInit();
    this.showCapacitacion = true;
    //OCULTAR
    this.showIncidencias = false;
    this.showempleados = false;
    this.showVacaciones = false;
    this.showCapacitaciones = false;
  }

  openCapacitaciones(){
    this.departamentoSeleccionado = '';
    this.ngOnInit();
    this.showCapacitaciones = true;
    //OCULTAR
    this.showIncidencias = false;
    this.showempleados = false;
    this.showVacaciones = false;
    this.showCapacitacion = false;
  }



  ngOnInit(): void {
    //this.reiniciarEmpleados();
    this._locale = 'es-ES'; // Establecer español por defecto
    this._adapter.setLocale(this._locale); 

    
    ///AQUI OBTENGO TODOS LOS DATOS
    this.departamentosService.getDepartamentos().subscribe({
      next:(data)=>{
        this.departamentos = data;
      },
      error:(err: any)=>{
      }
    })

    
    this.empleadosService.getEmpleadosAll().subscribe({
      next:(data)=>{
        this.empleados = data;
      },
      error:(err: any)=>{
      }
    })

    this.empleadosService.getEmpleados().subscribe({
      next:(data)=>{
        this.empleadosActive = data;
      },
      error:(err: any)=>{
      }
    })

    this.empleadosService.getEmpleadosInactive().subscribe({
      next:(data)=>{
        this.empleadosInactive = data;
      },
      error:(err: any)=>{
      }
    })

    this.bajasService.getAllBajas().subscribe({
      next:(data)=>{
        this.bajas = data;
      },
      error:(err: any)=>{
      }
    })

    this.departamentosService.getDepartamentos().subscribe({
      next:(data)=>{
        this.departamentos = data;
        
      },
      error:(err: any)=>{
      }
    })



    this.IdUser = this.usuarioService.getIdUser();

    this.usuarioService.getUser(this.IdUser).subscribe({
      next:(data: any) =>{
        this.usuario = data;
        //console.log(this.usuario);
      },
      error:(error : any) =>{
        console.log(error);
      },
    })


  }


  reiniciarEmpleados(){
    this.empleadosService.getEmpleadosAll().subscribe({
      next:(data)=>{
        this.empleados = data;
          //AQUI PARA FILTRAR
      if(this.departamentoSeleccionado){
        this.empleados = this.empleados.filter(
          empleado => empleado.NombreDepartamento === this.departamentoSeleccionado
        );
      }
        this.filtro(true);
      },
      error:(err: any)=>{
      }
    })

    this.empleadosService.getEmpleados().subscribe({
      next:(data)=>{
        this.empleadosActive = data;

         //AQUI PARA FILTRAR
      if(this.departamentoSeleccionado){
        this.empleadosActive = this.empleadosActive.filter(
          empleado => empleado.NombreDepartamento === this.departamentoSeleccionado
        );
      }


        this.filtro(true);
      },
      error:(err: any)=>{
      }
    })

    this.empleadosService.getEmpleadosInactive().subscribe({
      next:(data)=>{
        this.empleadosInactive = data;
          //AQUI PARA FILTRAR
      if(this.departamentoSeleccionado){
        this.empleadosInactive = this.empleadosInactive.filter(
          empleado => empleado.NombreDepartamento === this.departamentoSeleccionado
        );
      }
        this.filtro(true);
      },
      error:(err: any)=>{
      }
    })

    this.bajasService.getAllBajas().subscribe({
      next:(data)=>{
        this.bajas = data;
          //AQUI PARA FILTRAR
      if(this.departamentoSeleccionado){
        this.bajas = this.bajas.filter(
          bajas => bajas.NombreDepartamento === this.departamentoSeleccionado
        );
      }
        
        this.filtro(true);
      },
      error:(err: any)=>{
      }
    })


    //this.filtro(true);

  }



  filtro(consulta: boolean){
    


if(this.FormEmpleados.value.Opcion){

  this.opcionSeleccionada = this.FormEmpleados.value.Opcion;
  //console.log(this.opcionSeleccionada);
  //console.log(this.departamentoSeleccionado);

  /*
  //console.log(this.Form.value.Opcion);
  alert(this.Form.value.Opcion);*/


  
switch (this.FormEmpleados.value.Opcion) {
  case 'Empleados':
    this.imprimirEmpleados(consulta);
    break;
  case 'Empleados Activos':
    this.imprimirEmpleadosActive(consulta);

    break;
  case 'Empleados Bajas':
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

   //Todos Los empleados

    // Obtener la fecha y hora actual
    const now = new Date();
    const dateStr = now.toLocaleDateString();
    const timeStr = now.toLocaleTimeString();

    const doc = new jsPDF({
      orientation: 'landscape',  // Establecer orientación horizontal
    });
    doc.setFontSize(10);
    doc.text(`Fecha de impresión: ${dateStr}`, 220, 6);
    doc.text(`Hora de impresión: ${timeStr}`, 220, 10);
    // Agregar título
    doc.setFontSize(16);
    if(this.departamentoSeleccionado){
      doc.text('Lista de Todos los Empleados - Departamento: '+this.departamentoSeleccionado, 14, 22);
    }else{
      doc.text('Lista de Todos los Empleados', 14, 22);
    }
    doc.setFontSize(14);
    doc.text('Cantidad Total: '+this.empleados.length+' Empleados', 200, 28);

    doc.setFontSize(16);
    // Definir columnas de la tabla
    const columns = ['No. Nomina','Nombre Completo', 'Genero','Puesto', 'Departamento', 'Edad', 'CURP','RFC','Fecha Ingreso','Antiguedad','Estatus'];
    //const columns = ['No. Nomina','Nombre Completo', 'Genero','Puesto', 'Departamento', 'Edad', 'CURP','RFC','Fecha Ingreso', 'Antiguedad'];

    // Extraer datos de empleados
    const rows = this.empleados.map(empleado => [
      empleado.NoNomina,
      `${empleado.Nombre} ${empleado.Apellidos}`, // Nombre Completo
      empleado.Sexo,
      empleado.NombrePuesto,                     // Puesto
      empleado.NombreDepartamento,                // Departamento
    empleado.Edad,
    empleado.CURP,
    empleado.RFC,
    new Date(empleado.Ingreso).toLocaleDateString('es-ES'),
    empleado.EstadoEmpleado ? this.calcularAntiguedad(empleado.Antiguedad): 'Baja',
    empleado.EstadoEmpleado ? 'Activo' : 'Baja'  // Condición para EstadoEmpleado
    ]);

    // Generar la tabla
    (doc as any).autoTable({
      head: [columns],
      body: rows,
      startY: 30, // Posición inicial de la tabla en el eje Y
    });

    

    doc.setFontSize(10); // Cambia el tamaño de la letra (por ejemplo, 10)
    // Agregar la fecha y hora en la parte inferior del documento
    /*doc.text(`Fecha de impresión: ${dateStr}`, 10, 180);
    doc.text(`Hora de impresión: ${timeStr}`, 10, 190);*/

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
      const now = new Date();
      const dateStr = now.toLocaleDateString();
      const timeStr = now.toLocaleTimeString();

      const doc = new jsPDF({
        orientation: 'landscape',  // Establecer orientación horizontal
      });

      doc.setFontSize(10);
    doc.text(`Fecha de impresión: ${dateStr}`, 220, 6);
    doc.text(`Hora de impresión: ${timeStr}`, 220, 10);

      // Agregar título
      doc.setFontSize(16);
      if(this.departamentoSeleccionado){
        doc.text('Lista de Todos los Empleados Activos - Departamento: '+this.departamentoSeleccionado, 14, 22);
      }else{
        doc.text('Lista de Todos los Empleados Activos', 14, 22);
      }
  
      doc.setFontSize(14);
    doc.text('Cantidad Total: '+this.empleadosActive.length+' Empleados', 200, 28);

    doc.setFontSize(16);
      // Definir columnas de la tabla
      const columns = ['No. Nomina','Nombre Completo', 'Genero','Puesto', 'Departamento', 'Edad', 'CURP','RFC','Fecha Ingreso', 'Antiguedad'];
  
      // Extraer datos de empleados
      const rows = this.empleadosActive.map(empleado => [
        empleado.NoNomina,
        `${empleado.Nombre} ${empleado.Apellidos}`,
        empleado.Sexo,  // Nombre Completo
        empleado.NombrePuesto,                     // Puesto
        empleado.NombreDepartamento,                // Departamento
      empleado.Edad,
      empleado.CURP,
      empleado.RFC,
      new Date(empleado.Ingreso).toLocaleDateString('es-ES'),
      this.calcularAntiguedad(empleado.Antiguedad)
      ]);
  
      // Generar la tabla
      (doc as any).autoTable({
        head: [columns],
        body: rows,
        startY: 30, // Posición inicial de la tabla en el eje Y
      });
  
      // Obtener la fecha y hora actual
      
      doc.setFontSize(10); // Cambia el tamaño de la letra (por ejemplo, 10)
      // Agregar la fecha y hora en la parte inferior del documento
  
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
      const now = new Date();
      const dateStr = now.toLocaleDateString();
      const timeStr = now.toLocaleTimeString();

      const doc = new jsPDF({
        orientation: 'landscape',  // Establecer orientación horizontal
      });
      doc.setFontSize(10);
      doc.text(`Fecha de impresión: ${dateStr}`, 220, 6);
      doc.text(`Hora de impresión: ${timeStr}`, 220, 10);


      // Agregar título
      doc.setFontSize(16);
      if(this.departamentoSeleccionado){
        doc.text('Lista de Empleados Dados de Bajas - Departamento: '+this.departamentoSeleccionado, 14, 22);
      }else{
        doc.text('Lista de Empleados Dados de Bajas', 14, 22);
      }

      doc.setFontSize(14);
    doc.text('Cantidad Total: '+this.empleadosInactive.length+' Empleados', 200, 28);
    doc.setFontSize(16);
  
      // Definir columnas de la tabla
      const columns = ['No. Nomina','Nombre Completo', 'Puesto', 'Departamento', 'Edad', 'Fecha Ingreso', 'Fecha Salida', 'Antiguedad','Finiquito', 'Fondo de Ahorro', 'Motivo'];
  
      // Extraer datos de empleados
      const rows = this.bajas.map(empleado => [
        empleado.NoNomina,
        `${empleado.Nombre} ${empleado.Apellidos}`, // Nombre Completo
        empleado.NombrePuesto,                     // Puesto
        empleado.NombreDepartamento,                // Departamento
      empleado.Edad,
      new Date(empleado.FechaIngreso).toLocaleDateString('es-ES'),
      new Date(empleado.FechaSalida).toLocaleDateString('es-ES'),
      this.calcularAntiguedad(empleado.Antiguedad),
      empleado.Finiquito,
      empleado.FondoAhorro,
      empleado.Motivo

      ]);
  
      // Generar la tabla
      (doc as any).autoTable({
        head: [columns],
        body: rows,
        startY: 30, // Posición inicial de la tabla en el eje Y
      });
  
  
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

  //console.log(this.periodoSeleccionado);

this.vacacionesService.getVacacionesPorPeriodo(this.selectedEmpleados.NoNomina, this.periodoSeleccionado).subscribe({
  next:(data)=>{
    this.vacacionesEmpleadoPeriodo = data;

  this.vacacionesService.getFechasVacacionesPerido(this.selectedEmpleados.NoNomina, this.periodoSeleccionado).subscribe({
    next:(data)=>{
      ////console.log(data);
      this.vacacionesEmpleado = data;
      ////console.log(this.vacacionesEmpleado);



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
      doc.setFont('helvetica', 'bold');
      doc.setFont('helvetica');
      
      // Extraer datos de empleados
      
      
      // Añadir un espacio antes de la tabla
      doc.text('Vacaciones:', 14, 78);
      if(this.vacacionesEmpleadoPeriodo.length == 0){
        doc.text('NO CUENTA CON DIAS', 140, 66);
      }else{

        const columns1 = ['Periodo', 'Dias Totales', 'Dias Disponibles', 'Dias Utilizados'];
        const rows1 = [[this.periodoSeleccionado,this.vacacionesEmpleadoPeriodo[0].DiasVacaciones,this.vacacionesEmpleadoPeriodo[0].DiasDisponibles,this.vacacionesEmpleadoPeriodo[0].DiasUtilizados]];

(doc as any).autoTable({
        head: [columns1],
        body: rows1,
        startY: 60, // Iniciar la tabla después de la información del empleado
        margin: { top: 10, left: 14, right: 14 },
        styles: { fontSize: 10, cellPadding: 3 }, // Personalizar el estilo de la tabla
        theme: 'striped', // Estilo de tabla con líneas alternas
        headStyles: { fillColor: [211,211,211] }, // Color de encabezado de tabla
      }); 

        /*doc.text(`Dias Totales: ${this.vacacionesEmpleadoPeriodo[0].DiasVacaciones}`, 140, 60);
      doc.text(`Dias Disponibles: ${this.vacacionesEmpleadoPeriodo[0].DiasDisponibles}`, 140, 66);
      doc.text(`Dias Utilizados: ${this.vacacionesEmpleadoPeriodo[0].DiasUtilizados}`, 140, 72);*/


      }
     
      
      // Definir columnas de la tabla
      //const columns = ['Fecha Inicio', 'Fecha Fin', 'Días Tomados', 'Días Restantes'];
      const columns = ['Fecha', 'Periodo', 'Comentarios', 'Timbrado'];
      
      
      //console.log(this.vacacionesEmpleado)
      
      // Simulación de datos de vacaciones (esto debe ser tu lógica)
      const rows = this.vacacionesEmpleado.map(vacacion => [
        //new Date(vacacion.Fecha).toLocaleDateString('es-ES'),
        vacacion.Fecha.toString().split('T')[0].split('-').reverse().join('/'),
        vacacion.Periodo,
        vacacion.Comentarios,
        vacacion.Timbrada ? 'Timbrada': '-'
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




  },
  error:(error: any)=>{
    console.log('Error' + error);
  }
})



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
        //console.log(this.incidencias);
        var diasTotales = 0;


        const doc = new jsPDF({
          orientation: 'landscape'
        });
          // Configurar el estilo del encabezado
          doc.setFontSize(20);
          doc.setFont('helvetica', 'bold');
          doc.text('Lista de Incidencias Por Colaborador', 14, 20);
          
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
          
          this.incidencias.forEach(element => {
            diasTotales = diasTotales+element.DiasSubsidios;
            
          });
    
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

          

            // Obtener la posición Y final de la tabla
            const finalY = (doc as any).autoTable.previous.finalY;

            // Añadir el texto del total de días justo debajo de la tabla
            doc.text(`Total: ${diasTotales} Días De Subsidios`, 110, finalY + 10); // Añadir 10 px debajo de la tabla

          
          // Obtener la fecha y hora actual
          const now = new Date();
          const dateStr = now.toLocaleDateString();
          const timeStr = now.toLocaleTimeString();
          doc.setFontSize(10); // Cambia el tamaño de la letra (por ejemplo, 10)
          // Agregar la fecha y hora en la parte inferior del documento
          doc.text(`Fecha de impresión: ${dateStr}`, 10, 190);
          doc.text(`Hora de impresión: ${timeStr}`, 10, 195);
          
          
          
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

        //console.log(this.capacitacionesEmpleado);

        const doc = new jsPDF({
          orientation: 'landscape'
        });
          // Configurar el estilo del encabezado
          doc.setFontSize(20);
          doc.setFont('helvetica', 'bold');
          doc.text('Lista de Capacitaciones Por Empleado', 14, 20);
          
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
          const columns = ['Nombre Capacitacion','FechaCapacitacion','Total Horas' ,'Origen', 'Asistencia', 'Calificacion', 'Comentario'];
          
    
          // Simulación de datos de vacaciones (esto debe ser tu lógica)
          const rows =  this.capacitacionesEmpleado.map(capacitacion => [
            //new Date(vacacion.Fecha).toLocaleDateString('es-ES'),
            capacitacion.NombreCapacitacion,
            capacitacion.FechaInicio.toString().split('T')[0].split('-').reverse().join('/'),
            capacitacion.Horas,
            capacitacion.Origen,
            capacitacion.Asistencia ? 'Asistio' : '-',
            capacitacion.Evaluacion ? capacitacion.Calificacion ? capacitacion.Calificacion:'---': 'N/A',
            capacitacion.Evaluacion ? capacitacion.Comentario ? capacitacion.Comentario:'---': 'N/A',
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
        //console.log(this.capacitacionesConsultadas);
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

  //console.log(this.capacitacionSeleccionada.IdProgramacionCapacitacion);

  if(this.capacitacionSeleccionada == undefined){
    this.messageService.add({ severity: 'error', summary: 'Cuidado', detail: 'No se Encuentra seleccionado ningun Empleado',key: 'tl' });
  }else{
    
  this.capacitacionesService.getsingleProgramaciones(this.capacitacionSeleccionada.IdProgramacionCapacitacion).subscribe({
    next:(data)=>{
          // Obtener la fecha y hora actual
          const now = new Date();
          const dateStr = now.toLocaleDateString();
          const timeStr = now.toLocaleTimeString();

      this.capacitacionesSuscritas = data;

      //AQUI PARA FILTRAR
      if(this.departamentoSeleccionado){
        this.capacitacionesSuscritas = this.capacitacionesSuscritas.filter(
          capacitacion => capacitacion.NombreDepartamento === this.departamentoSeleccionado
        );
      }
      
      ////console.log(this.capacitacionesSuscritas);
      //this.capacitacionesEmpleado = data;


      const doc = new jsPDF({
        orientation: 'landscape'
      });


      doc.setFontSize(10);
    doc.text(`Fecha de impresión: ${dateStr}`, 220, 6);
    doc.text(`Hora de impresión: ${timeStr}`, 220, 10);
        // Configurar el estilo del encabezado
        doc.setFontSize(17);
        doc.setFont('helvetica', 'bold');
        if(this.departamentoSeleccionado){
          doc.text(`Lista de Participantes Capacitacion: ${this.capacitacionSeleccionada.NombreCapacitacion} - Departamento: ${this.departamentoSeleccionado}`, 14, 20);
          
        }else{
          doc.text(`Lista de Participantes Capacitacion: ${this.capacitacionSeleccionada.NombreCapacitacion}`, 14, 20);
        }
        
        
        // Información del empleado en el encabezado
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`Nombre Capacitacion: ${this.capacitacionSeleccionada.NombreCapacitacion}`, 14, 30);
        doc.text(`Duración de La Capacitación: ${this.capacitacionSeleccionada.Horas} Horas`, 14, 36);
        doc.text(`Persona Imparte: ${this.capacitacionSeleccionada.PersonaImparte? this.capacitacionSeleccionada.PersonaImparte: ' '}`, 14, 42);
        doc.text(`Dia Estimado: ${this.capacitacionSeleccionada.FechaInicio.toString().split('T')[0].split('-').reverse().join('/')}`, 14, 48);

    
        // Extraer datos de empleados
        
        // Añadir un espacio antes de la tabla
        doc.text('Participantes:', 14, 58);
        
        // Definir columnas de la tabla
        //const columns = ['Fecha Inicio', 'Fecha Fin', 'Días Tomados', 'Días Restantes'];
        
        
  


        // Simulación de datos de vacaciones (esto debe ser tu lógica)
        if(!this.capacitacionSeleccionada.Evaluacion){
          const columns = ['No. Nomina','Nombre','Puesto' ,'Departamento', 'Asistencia', 'Horas', 'Evaluacion'];
          const rows =  this.capacitacionesSuscritas.map(capacitacion => [
            //new Date(vacacion.Fecha).toLocaleDateString('es-ES'),
            capacitacion.NoNomina,
            `${capacitacion.Nombre} ${capacitacion.Apellidos}`,
            capacitacion.NombrePuesto,
            capacitacion.NombreDepartamento,
            capacitacion.Asistencia ? 'Asistio' : '-' ,
            this.capacitacionSeleccionada.Horas,
            'N/A'
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
        }else{
          const columns = ['No. Nomina','Nombre','Puesto' ,'Departamento', 'Asistencia', 'Horas', 'Calificación', 'Comentarios', 'Evaluacion'];
          const rows =  this.capacitacionesSuscritas.map(capacitacion => [
            //new Date(vacacion.Fecha).toLocaleDateString('es-ES'),
            capacitacion.NoNomina,
            `${capacitacion.Nombre} ${capacitacion.Apellidos}`,
            capacitacion.NombrePuesto,
            capacitacion.NombreDepartamento,
            capacitacion.Asistencia ? 'Asistio' : '-' ,
            this.capacitacionSeleccionada.Horas,
            capacitacion.Calificacion ? capacitacion.Calificacion:'---',
            capacitacion.Comentario ? capacitacion.Comentario:'---',
            capacitacion.Estatus ? 'Aprobo' : 'No Aprobo'
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


        }
        
        
        
        
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


calcularAntiguedad(dias: number): string {
  const diasPorAno = 365;
  const diasPorMes = 30;

  // Calcular los años
  const anos = Math.floor(dias / diasPorAno);

  // Calcular los meses restantes
  const meses = Math.floor((dias % diasPorAno) / diasPorMes);

  // Generar el resultado en el formato deseado
  let resultado = '';
  if (anos > 0) {
    resultado += `${anos} Año${anos > 1 ? 's' : ''}`; // Plural si es más de 1 año
  }
  if (meses > 0) {
    if (anos > 0) {
      resultado += ', ';
    }
    resultado += `${meses} Mes${meses > 1 ? 'es' : ''}`; // Plural si es más de 1 mes
  }

  return resultado || 'Menos de 1 mes'; // Si no hay años ni meses
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
