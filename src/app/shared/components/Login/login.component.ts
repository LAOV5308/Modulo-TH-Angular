import { Component, OnInit , NgZone } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NgIf, NgFor } from '@angular/common';
import { Empleado } from '../../../../../backend/models/empleado.model';

import { Router, RouterModule } from '@angular/router';// Importante para manejar la navegación
import { window } from 'rxjs';
import { DataService } from '../../../../../backend/ConexionDB/data.service';
import { EmpleadosService } from '../../../../../backend/ConexionDB/empleados.service';
import { AuthService } from '../../../auth/ServicesAuth/auth.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { RecaptchaModule } from 'ng-recaptcha';

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
    RecaptchaModule
  ],
  providers:[EmpleadosService, AuthService]
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
  loginForm: FormGroup;
  errorMessage: string | null = null;
  recaptchaResolved: boolean = false;
  recaptchaToken: string | null = null;

  constructor(private empleadosService: EmpleadosService, private router: Router,
    private _authService: AuthService,
    private fb: FormBuilder,
  ) { 
    this.loginForm = this.fb.group({
      NombreUsuario: ['', Validators.required],
      Password: ['', Validators.required]
    });

  }


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
 

 showNotification() {
  this.show = true;
  setTimeout(() => this.show = false, 1000); // Notificación se oculta después de 3 segundos
 setTimeout(() => this.entrar(), 1500);
  
}

entrar(){
  this.router.navigate(['/system']);
}

onSubmit(): void {
  if (this.loginForm.valid && this.recaptchaResolved) {
    //if (this.loginForm.valid) {
    const { NombreUsuario, Password } = this.loginForm.value;

    this._authService.login(NombreUsuario, Password).subscribe({
      next: () => {
        
        //console.log(data);

        //console.log(this._authService.isLoggedIn());
        this.router.navigate(['/system']);
      },
      error: (err) => {
        this.errorMessage = 'Login failed. Por Favor Checa tu Nombre de Usuario y Contraseña';
        //this.recaptchaResolved = false; // Reset the captcha if login fails

      }
    });
  }
}

}
