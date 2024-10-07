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
import { Router } from '@angular/router';// Importante para manejar la navegación
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { UsuarioeditarComponent } from '../usuarioeditar/usuarioeditar.component';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule,  NgFor, NgIf, MatSelectModule,
    TableModule, TagModule, RatingModule, ButtonModule, ToastModule, ConfirmDialogModule,RouterLink, DialogModule,InputTextModule, MatDialogModule
  ],
  providers:[AuthService, ConfirmationService, MessageService],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit{
  NombreUsuario!: string;
  IdRole!: number;
  Password!: string;
  PasswordConfirmar!:string;
  roles: Role[] = [];
  Usuarios: Usuario[]=[];
  IdUserActive!: number | null;

  constructor(private usuarioService: AuthService, private confirmationService: ConfirmationService, private messageService: MessageService,
    private router: Router, public dialog: MatDialog  
  ){

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
      this.messageService.add({ severity: 'info', summary: 'Campos Faltantes', detail: 'Hay Campos Faltantes', life: 1000});
    }else{
      if(this.Password != this.PasswordConfirmar){
        this.messageService.add({ severity: 'warn', summary: 'No coinciden', detail: 'Las Contraseñas No Coinciden', life: 1000});
      }else{
        if(this.Usuarios.find(usuario => usuario.NombreUsuario === this.NombreUsuario)){
          this.messageService.add({ severity: 'warn', summary: 'Ya existe Usuario', detail: 'Nombre De Usuario Se encuentra Registrado'});
        }else{
          this.usuarioService.register(this.NombreUsuario, this.IdRole, this.Password).subscribe({
            next:(resp: any) =>{
              this.ngOnInit();
              this.reiniciar();
              this.messageService.add({ severity: 'success', summary: 'Satisfactorio', detail: 'Usuario Registrado Con exito', life: 1000});
            },
            error:(error: any) =>{
              console.log(error);
            },
            
          })

        }
        
      }
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

  

  openDialog(IdUser: number) {
    const dialogRef = this.dialog.open(UsuarioeditarComponent, {
      data: { IdUser: IdUser },
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
      this.ngOnInit();
      this.reiniciar();
    });
  }

}
