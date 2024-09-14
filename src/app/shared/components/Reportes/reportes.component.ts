import { Component, OnInit } from '@angular/core';
import {jsPDF} from 'jspdf';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import {NgxDocViewerModule} from 'ngx-doc-viewer';
import { EmpleadosService } from '../../../../../backend/ConexionDB/empleados.service';
import { Empleado } from '../../../../../backend/models/empleado.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgFor,NgIf } from '@angular/common';
import 'jspdf-autotable';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [NgxDocViewerModule,FormsModule, MatInputModule, MatSelectModule, MatFormFieldModule,NgFor,NgIf,ReactiveFormsModule],
  providers:[EmpleadosService],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent implements OnInit{
  doc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  empleados: Empleado[]=[];
  empleadosActive: Empleado[]=[];
  empleadosInactive: Empleado[]=[];
  opcionSeleccionada: string | undefined;
  opciones:string[]=['-','Empleados', 'Empleados Activos', 'Empleados Inactivos'];
  Form: FormGroup;

  constructor(private empleadosService:EmpleadosService, private _fb: FormBuilder,){
    this.Form = this._fb.group({
      Opcion:['']
    });
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
    

if(this.Form.value.Opcion){

  this.opcionSeleccionada = this.Form.value.Opcion;
  console.log(this.opcionSeleccionada);
  /*
  console.log(this.Form.value.Opcion);
  alert(this.Form.value.Opcion);*/


  
switch (this.Form.value.Opcion) {
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



  characterData = {
    name: 'Gandalf',
    surname: 'El gris',
    description: 'Llevaba un sombrero azul alto y puntiagudo...',
    type: 'wizard',
    strength: 40,
    magic: 90,
    velocity: 60,
  };




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
