import { Component, OnInit } from '@angular/core';
import { DataService } from '../../backend/ConexionDB/data.service';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NgIf, NgFor } from '@angular/common';
import { EmpleadosService } from '../../backend/ConexionDB/empleados.service';
import { Empleado } from '../../backend/models/empleado.model';
import { HttpClientModule} from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';// Importante para manejar la navegación
import { window } from 'rxjs';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    NgIf,
    NgFor,
    HttpClientModule
  
  ],
  providers:[EmpleadosService]
  ,
  animations: [
    trigger('slideNotification', [
      state('void', style({
        transform: 'translateX(100%)',
        opacity: 0
      })),
      state('*', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('void => *', [
        animate('300ms ease-out')
      ]),
      transition('* => void', [
        animate('300ms ease-in')
      ])
    ])
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  empleados: Empleado[] = [];

  constructor(private empleadosService: EmpleadosService, private router: Router) { }
  ngOnInit() {
    this.empleadosService.getEmpleados().subscribe({
      next: (data) => {
        this.empleados = data;
      },
      error: (error) => {
        console.error('Error al cargar los empleados', error);
      }
    });
  }

  show = false;
hola(){
  const passwordElement = document.getElementById("password") as HTMLInputElement;
  const Password = passwordElement.value;
  const usernameElement = document.getElementById("username") as HTMLInputElement;
  const UserName = usernameElement.value;

this.empleados.forEach(element => {
  if(UserName==element.TipoIngreso && Password==element.TipoIngreso){
    //alert('Ya si entro');
    this.showNotification();
    //this.router.navigate(['/system']);
    //alert(UserName + ' ---- '+Password);
  }

})




}
 

 showNotification() {
  this.show = true;
  setTimeout(() => this.show = false, 1000); // Notificación se oculta después de 3 segundos
 setTimeout(() => this.entrar(), 1500);
  
}

entrar(){

  this.router.navigate(['/system']);

  
}




}
