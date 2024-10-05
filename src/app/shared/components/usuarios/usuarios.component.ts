import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../../backend/services/auth.service';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { Usuario } from '../../../../../backend/models/user.model';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RouterLink } from '@angular/router';
import { Role } from '../../../../../backend/models/user.model';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule,  NgFor, NgIf, MatSelectModule,
    TableModule, TagModule, RatingModule, ButtonModule, ToastModule, ConfirmDialogModule,RouterLink
  ],
  providers:[AuthService, ConfirmationService, MessageService],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit{
  NombreUsuario!: string;
  NombreRoles: string[] = ['Admin', 'Capacitacion'];
  IdRole!: number;
  Password!: string;
  PasswordConfirmar!:string;
  roles: Role[] = [];
  Usuarios: Usuario[]=[];
  IdUserActive!: number | null;

  constructor(private usuarioService: AuthService, private confirmationService: ConfirmationService, private messageService: MessageService){

  }

  ngOnInit(): void {
  this.IdUserActive = this.usuarioService.getIdUser();
  this.usuarioService.getUsers().subscribe({
    next:(data: any)=>{
      this.Usuarios = data;
      console.log(this.Usuarios);
    },
    error:(error: any)=>{

    },

  })


  this.usuarioService.getRoles().subscribe({
    next:(data: any)=>{
      this.roles = data;
    },
    error:(error: any)=>{

    },

  })




  }


  impresion(){
    if(!this.Password || !this.PasswordConfirmar || !this.IdRole || !this.NombreUsuario){
alert('Llena campos');
    }else{
      if(this.Password != this.PasswordConfirmar){
        alert('No coinciden contraseñas');
      }else{
        this.usuarioService.register(this.NombreUsuario, this.IdRole, this.Password).subscribe({
          next:(resp: any) =>{
            console.log(resp.message);
            this.ngOnInit();
            this.reiniciar();
          },
          error:(error: any) =>{
            console.log(error);
          },
          
        })
      }
    }
  }

  editar(IdUsuario: number){
    if(IdUsuario == this.IdUserActive){
      this.messageService.add({ severity: 'error', summary: 'Usuario En Uso', detail: 'Usuario en Uso', life: 3000 });
    }else{
      this.confirmationService.confirm({
        message: 'Quieres Editar el Usuario?',
        header: 'Confirmación',
        icon: 'pi pi-info-circle',
        rejectButtonStyleClass:"p-button-text",
        accept: () => {
          
              this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'Usuario Editado con Exito', life: 3000 });
            

            
        },
        reject: () => {
            //this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
    }

  }
  eliminar(IdUsuario: number){
    if(IdUsuario == this.IdUserActive){
      this.messageService.add({ severity: 'error', summary: 'Usuario En Uso', detail: 'Usuario en Uso', life: 3000 });
    }else{

      this.confirmationService.confirm({
        message: 'Quieres Eliminar Usuario?',
        header: 'Confirmación',
        icon: 'pi pi-info-circle',
        rejectButtonStyleClass:"p-button-text",
        accept: () => {
          this.usuarioService.deleteUser(IdUsuario).subscribe({
            next:(resp: any) =>{
              this.ngOnInit();
              this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'Usuario Eliminado', life: 3000 });
            },
            error:(error: any) =>{
              console.log(error);
            },
            
          })

            
        },
        reject: () => {
            //this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });

      
    }
  }

  reiniciar(){
    this.Password = '';
    this.PasswordConfirmar = '';
    this.IdRole = 0;
    this.NombreUsuario = '';

  }

}
