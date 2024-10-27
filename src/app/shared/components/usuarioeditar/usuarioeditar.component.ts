import { CommonModule, NgFor, NgIf } from '@angular/common';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Component, OnInit,Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../../backend/services/auth.service';
import {
  MatDialog,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CheckboxModule } from 'primeng/checkbox';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import { Role, Usuario } from '../../../../../backend/models/user.model';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';



@Component({
  selector: 'app-usuarioeditar',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgIf, NgFor,
    CommonModule, FormsModule, ReactiveFormsModule,MatButtonModule,RouterLink,CheckboxModule, MatCheckboxModule, MatFormFieldModule,
    MatInputModule, MatExpansionModule, MatTabsModule, MatIconModule, TableModule, ButtonModule,
    ToastModule, ConfirmDialogModule, MatSelectModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  providers:[AuthService, ConfirmationService, MessageService],
  templateUrl: './usuarioeditar.component.html',
  styleUrl: './usuarioeditar.component.css'
})
export class UsuarioeditarComponent implements OnInit{
  IdUser!: number;
  User: Usuario[]=[];
  NombreUsuario!: string;
  IdRole!: number;
  Password!: string;
  PasswordConfirmar!:string;
  roles: Role[] = [];
  IdUserActive!: number | null;
  cambiarContrasena: boolean = false;

  constructor(public dialogRef: MatDialogRef<UsuarioeditarComponent>,private usuariosService: AuthService, private confirmationService: ConfirmationService, private messageService: MessageService,
    private route: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: {IdUser: number}){}

  ngOnInit(): void {
    /*this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('IdUser')){
        this.IdUser = Number(paramMap.get('IdUser'));
      }
    });*/



    this.IdUser = this.data.IdUser;

    //console.log(this.IdUser);


    this.usuariosService.getRoles().subscribe({
      next:(data: any)=>{
        this.roles = data;
      },
      error:(error: any)=>{
        console.log(this.roles);
      },
    })
    
    

    this.usuariosService.getUser(this.IdUser).subscribe({
      next:(data: any) => {
        //console.log(data);
        this.User = data;

        this.NombreUsuario = this.User[0].NombreUsuario;
        this.IdRole = this.User[0].IdRole;

      },
      error:(error: any) => {

      },
    })

  }


  actualizar(){
    if(this.IdRole || this.NombreUsuario){

      if(!this.cambiarContrasena){
        this.usuariosService.updateUserSinContrasena(this.IdUser,this.NombreUsuario, this.IdRole).subscribe({
          next:(resp: any) =>{
            //console.log(resp);
            this.messageService.add({ severity: 'success', summary: 'Actualizado', detail: 'Usuario Actualizado con Exito', life: 900});
            this.cambiarContrasena = false;
          },
          error:(error: any) =>{
            console.log(error);
          },
        })

        /*this.confirmationService.confirm({
          message: '¿Mantener con la Contraseña Actual Del Usuario?',
          header: 'Confirmacion',
          icon: 'pi pi-exclamation-triangle',
          acceptIcon:"none",
          rejectIcon:"none",
          rejectButtonStyleClass:"p-button-text",
          accept: () => {
            
          },
          reject: () => {
          }
          });
          */
       }else{
              if(this.Password != this.PasswordConfirmar){
                alert('No coinciden contraseñas');
              }else{
                this.usuariosService.updateUser(this.IdUser,this.NombreUsuario, this.IdRole, this.Password).subscribe({
                  next:(resp: any) =>{
                    //console.log(resp);
                    this.messageService.add({ severity: 'success', summary: 'Actualizado', detail: 'Usuario Actualizado con Exito', life: 900});
                    this.cambiarContrasena = false;
                  },
                  error:(error: any) =>{
                    console.log(error);
                  },
                })
              }
            }
    }else{
      this.messageService.add({ severity: 'error', summary: 'Faltan Campos', detail: 'Faltan Campos De Nombre de Usuario o Rol'})
    }
    

    
  }


  cerrarDialogo(){
    this.dialogRef.close();
  }

  /*this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
  this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });*/

}
