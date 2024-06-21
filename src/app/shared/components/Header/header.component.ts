import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Router, RouterModule } from '@angular/router';// Importante para manejar la navegación
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatosComponent } from '../../../../../frontend/Datos/datos/datos.component';

import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {MatMenuModule} from '@angular/material/menu';
//import { CoreService } from './core/core.service';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';  // Asegúrate de importar HttpClientModule
import { AuthService } from '../../../auth/ServicesAuth/auth.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    RouterModule,
    MatDialogModule,
    ConfirmDialogComponent,
    MatIcon,
    NgIf,
    NgFor,
    DatosComponent,
    FormsModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    HttpClientModule
  ],
  providers:[AuthService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {


  constructor(public dialog: MatDialog,
    private router: Router,
    private authService: AuthService
    //private _dialog: MatDialog,
  ) {}

  navbarCollapsed = false;
  
  @Output() sidebarToggle = new EventEmitter<void>();

  toggleSidebar() {
    this.sidebarToggle.emit();
  }

toggleNavbar() {
    this.navbarCollapsed = !this.navbarCollapsed;
  }
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        window.alert('El usuario eligió cerrar sesión');
        this.router.navigate(['/home']);
        // Aquí puedes agregar la lógica para manejar el cierre de sesión
      } else {
        window.alert('El usuario canceló la acción');
      }
    });
}

isLoggedIn = false; // Asumimos que el usuario no está logueado inicialmente

  login(): void {
    // Aquí iría la lógica para iniciar sesión
    this.isLoggedIn = true;
  }

  logout(): void {
    // Aquí iría la lógica para cerrar sesión
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
    //this.isLoggedIn = false;
  }

  register(): void {
    // Aquí iría la lógica para registrar un nuevo usuario
  }
  addUser(): void {
    // Lógica para añadir un nuevo usuario
    alert('Agregar usuario');
  }

empleados(){
  //window.alert('Empleados');
  this.router.navigate(['/empleados']);
}

addempleado(){
  this.router.navigate(['/addEmpleado']);
  //const dialog = this._dialog.open(ConfirmDialogComponent);
}

departamentos(){
  this.router.navigate(['/departamentos']);
}

puestos(){
  this.router.navigate(['/puestos']);
}

}
