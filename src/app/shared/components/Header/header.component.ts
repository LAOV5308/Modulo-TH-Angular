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
//import { CoreService } from './core/core.service';

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
    NgFor
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {


  constructor(public dialog: MatDialog,
    private router: Router,
    //private _dialog: MatDialog,
  ) {}

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
  this.router.navigate(['/empleados']);
}

addempleado(){
  //const dialog = this._dialog.open(ConfirmDialogComponent);
}

departamentos(){
  this.router.navigate(['/departamentos']);
}

}
