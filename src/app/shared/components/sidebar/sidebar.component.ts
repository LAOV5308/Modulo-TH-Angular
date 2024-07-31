import { Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../header/header.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../auth/ServicesAuth/auth.service';
import {MatSidenavModule} from '@angular/material/sidenav';


import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { Sidebar } from 'primeng/sidebar';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatIconModule, HeaderComponent, MatMenuModule, MatButtonModule, NgIf, RouterModule, MatSidenavModule,
    SidebarModule, ButtonModule, RippleModule, AvatarModule, StyleClassModule
  ],
  providers:[AuthService],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private authService: AuthService){}

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


  empleados(){}

}
