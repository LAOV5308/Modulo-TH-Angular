import { Component, OnInit, ViewChild } from '@angular/core';
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
    MatListModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  public items: { field: string }[] = [
    { field: 'Option 1' },
    { field: 'Option 2' },
    { field: 'Option 3' }
];

  constructor(public dialog: MatDialog,
    private router: Router,
    //private _dialog: MatDialog,
  ) {}
  navbarCollapsed = true;

  toggleNavbar() {
    this.navbarCollapsed = !this.navbarCollapsed;
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

}
