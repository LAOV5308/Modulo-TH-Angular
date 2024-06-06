import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../header/header.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatIconModule, HeaderComponent, MatMenuModule, MatButtonModule, NgIf],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  submenus: { [key: string]: boolean } = {
    empleados: false,
    // Agrega otros submenús aquí si es necesario
  };

  toggleSubmenu(menu: string) {
    this.submenus[menu] = !this.submenus[menu];
  }


  empleados(){}

}
