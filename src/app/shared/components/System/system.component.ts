import { Component, OnInit , HostListener,  Output, EventEmitter, ViewChild   } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';

import { HttpClientModule } from '@angular/common/http';  // Asegúrate de importar HttpClientModule

import { DatosComponent } from '../../../../../frontend/Datos/datos/datos.component';
import { DataService } from '../../../../../backend/ConexionDB/data.service';
import { HeaderComponent } from '../header/header.component';
import { CreateEmpleadoComponent } from '../empleados/create-empleado/create-empleado.component';
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
    FormsModule

  ],
  providers:[AuthService],
  templateUrl: './system.component.html',
  styleUrl: './system.component.css'
})
export class SystemComponent implements OnInit{
  @ViewChild('drawer') drawer!: MatDrawer;
  nombre: string | null = '';
  sidebarVisible: boolean = true;
  @Output() sidebarToggle = new EventEmitter<void>();

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

