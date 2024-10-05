import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { AuthService } from '../../../../../backend/services/auth.service';
import { MatDialog } from '@angular/material/dialog';

import { StyleClassModule } from 'primeng/styleclass';
import { Usuario } from '../../../../../backend/models/user.model';

@Component({
  standalone:true,
  selector: 'app-system1',
  imports:[MatButtonModule,CommonModule,StyleClassModule,
    RouterOutlet,
    MatIcon,MatToolbarModule,
    ConfirmDialogComponent,
    MatCheckboxModule,
    FormsModule,
    SidebarModule, ButtonModule, RippleModule, AvatarModule,
    NgIf, RouterModule],
    providers:[AuthService],
  templateUrl: './system1.component.html',
  styleUrls: ['./system1.component.css']
})
export class System1Component implements OnInit {

  //nombre: number | null = '';
  nombre!: string | null;
  IdUser!: number | null;
  sidebarVisible1: boolean = true;
  usuario:Usuario[] =[];

  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

    closeCallback(e: any): void {
        this.sidebarRef.close(e);
    }

    sidebarVisible: boolean = false;

  constructor(public dialog: MatDialog,
    private usuarioService: AuthService) { }

  ngOnInit() {
    this.nombre = this.usuarioService.getNombreUser();

    this.IdUser = this.usuarioService.getIdUser();

    this.usuarioService.getUser(this.IdUser).subscribe({
      next:(data: any) =>{
        this.usuario = data;
      },
      error:(error : any) =>{
        console.log(error);
      },
    })
  }


  close(){
this.sidebarVisible = !this.sidebarVisible;
  }

  logout(){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Aquí puedes agregar la lógica para manejar el cierre de sesión
        this.usuarioService.logout();
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

}
