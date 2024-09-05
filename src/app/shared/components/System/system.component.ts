import { Component, OnInit , HostListener,  Output, EventEmitter, ViewChild   } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';

import { HttpClientModule } from '@angular/common/http';  // Asegúrate de importar HttpClientModule

import { DatosComponent } from '../../../../../frontend/Datos/datos/datos.component';
import { DataService } from '../../../../../backend/ConexionDB/data.service';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { LoginComponent } from '../Login/login.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatDrawer, MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { BooleanInput } from '@angular/cdk/coercion';
import {BreakpointObserver} from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';// Importante para manejar la navegación
import { AuthService } from '../../../auth/ServicesAuth/auth.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import {jsPDF} from 'jspdf';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { Sidebar } from 'primeng/sidebar';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-system',
  standalone: true,
  imports: [MatButtonModule,
    HeaderComponent,
    DatosComponent,
    SidebarComponent,
    RouterOutlet,
    HttpClientModule,
    MatToolbarModule,
    MatIcon,
    MatDrawer,
    MatSidenavModule,
    ConfirmDialogComponent,
    MatCheckboxModule,
    FormsModule,
    SidebarModule, ButtonModule, RippleModule, AvatarModule, StyleClassModule,
    NgIf, RouterModule

  ],
  providers:[AuthService],
  templateUrl: './system.component.html',
  styleUrl: './system.component.css'
})
export class SystemComponent implements OnInit{
  @ViewChild('drawer') drawer!: MatDrawer;
  nombre: string | null = '';
  sidebarVisible1: boolean = true;
  @Output() sidebarToggle = new EventEmitter<void>();

  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

    closeCallback(e: any): void {
        this.sidebarRef.close(e);
    }

    sidebarVisible: boolean = false;

    

  constructor(public dialog: MatDialog,
    private router: Router,
    private authService: AuthService){

  }

  ngOnInit(): void {
    this.nombre = this.authService.getNombreUser();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInsideHeader = (event.target as HTMLElement).closest('mat-toolbar') !== null;
    const clickedInsideDrawer = (event.target as HTMLElement).closest('mat-drawer') !== null;
    if (!clickedInsideHeader && !clickedInsideDrawer && this.drawer.opened) {
      this.drawer.close();
    }
  }

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
        doc.addImage(img2, 'PNG', 140, 10, 30, 30); // Coordenadas x, y y dimensiones width, height

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

  logout(){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Aquí puedes agregar la lógica para manejar el cierre de sesión
        this.authService.logout();
      } else {
        /*
        window.alert('El usuario canceló la acción');*/
      }
    });

  }

  submenus: { [key: string]: boolean } = {
    empleados: false,
    capacitaciones: false,
    catalogo: false,
    reclutamiento: false,
    th: false,
    programarcapacitaciones: false
    // Agrega otros submenús aquí si es necesario
  };

  toggleSubmenu(menu: string) {
    this.submenus[menu] = !this.submenus[menu];

  }

  isAdmin(): boolean {
    return this.authService.getUserRole() === 'Admin';
  }

  isReclutamiento(): boolean {
    const role = this.authService.getUserRole();
    return role === 'Admin' || role === 'Reclutamiento';
  }

  isCapacitaciones(): boolean {
    const role = this.authService.getUserRole();
    return role === 'Admin' || role === 'Capacitacion';
  }

}

/*

readonly breakpoint$ = this.breakpointObserver
  .observe([ '(max-width: 500px)']);

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpoint$.subscribe(() =>
      this.breakpointChanges()
  );
  }

  breakpointChanges(): void {

    if (this.breakpointObserver.isMatched('(max-width: 500px)')) {
      this.drawerMode = "over";
      this.mdcBackdrop = true;
    } else {
      this.drawerMode = "push";
      this.mdcBackdrop = false;
    }
    
  }*/

