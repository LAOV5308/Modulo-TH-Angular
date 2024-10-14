import { Component, OnInit , NgZone } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NgIf, NgFor } from '@angular/common';

import { Router, RouterModule } from '@angular/router';// Importante para manejar la navegación

import { EmpleadosService } from '../../../../../backend/services/empleados.service';
import { AuthService } from '../../../../../backend/services/auth.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { RecaptchaModule } from 'ng-recaptcha';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    NgIf,
    NgFor,
    HttpClientModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
    RecaptchaModule,
    FormsModule,
    PasswordModule,
    InputTextModule,
    ToastModule, ButtonModule, RippleModule, IconFieldModule, InputIconModule, CommonModule,
    TooltipModule
  ],
  providers:[EmpleadosService, AuthService, MessageService]
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
  ///empleados: Empleado[] = [];
  loginForm: FormGroup;
  NombreRol: string = '';
  errorMessage: string | null = null;
  recaptchaResolved: boolean = false;
  recaptchaToken: string | null = null;
  hide: boolean = true;
  value!: string;

  constructor(private empleadosService: EmpleadosService, private router: Router,
    private _authService: AuthService,
    private fb: FormBuilder,private messageService: MessageService
  ) { 
    this.loginForm = this.fb.group({
      NombreUsuario: ['', Validators.required],
      Password: ['', Validators.required]
    });

  }


  ngOnInit() {

  //Eliminar cualquier token del sistema
    if (this.isLocalStorageAvailable()) {
      //localStorage.clear();
      localStorage.removeItem('token');
      //this.router.navigate(['/login']);
    }
    //this.limpiarlocalstorage();
    
    //this._authService.logout();

    //Obtener Empleados
    /*this.empleadosService.getEmpleados().subscribe({
      next: (data) => {
        this.empleados = data;
      },
      error: (error) => {
        console.error('Error al cargar los empleados', error);
      }
    });*/

  }

  onCaptchaResolved(token: string | null) {
    this.recaptchaResolved = true;
    this.recaptchaToken = token;
    //console.log(this.recaptchaToken);
  }




  show = false;

  /*
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

}*/
 
/*
 showNotification() {
  this.show = true;
  setTimeout(() => this.show = false, 1000); // Notificación se oculta después de 3 segundos
 setTimeout(() => this.entrar(), 1500);
  
}


entrar(){
  this.router.navigate(['/system']);
}*/


onSubmit(): void {
  
  
  if(this.loginForm.value.NombreUsuario == '' || this.loginForm.value.Password == '' ){
    this.messageService.add({ severity: 'warn', summary: 'Precaución', detail: 'Completa Los campos', life: 2000 });
  }else{

  //if (this.loginForm.valid && this.recaptchaResolved) {
    if (this.loginForm.valid) {
    const { NombreUsuario, Password } = this.loginForm.value;
   

    this._authService.login(NombreUsuario, Password).subscribe({
      next: () => {
        
        //console.log(data);

        //console.log(this._authService.isLoggedIn());
        //alert(this._authService.getUserRole());
        //LLEVAR DIRECTAMENTE AL SYSTEM

        this.router.navigate(['/system/bienvenida']);
        
        
      },
      error: (err) => {
        //console.log(err);
        this.messageService.add({ severity: 'warn', summary: 'Precaución', detail: 'Contraseña Incorrecta', life: 2000 });
        //this.errorMessage = 'Login failed. Por Favor Checa tu Nombre de Usuario y Contraseña';
        //this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Message Content' });
        //this.recaptchaResolved = false; // Reset the captcha if login fails

      }
    });
    
    }
  
  }
}

togglePasswordVisibility(): void {
  this.hide = !this.hide;
}

showError() {
  //this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Message Content' });
  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error. Por Favor Checa tu Nombre de Usuario y Contraseña', life: 2000 });
}



private isLocalStorageAvailable(): boolean {
  try {
    const test = '__test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}



}
