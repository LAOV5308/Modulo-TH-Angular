import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../../backend/services/auth.service';
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
import { Router } from '@angular/router';// Importante para manejar la navegación

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,MatButtonModule,RouterLink,CheckboxModule, MatCheckboxModule, MatFormFieldModule,
    MatInputModule, MatExpansionModule, MatTabsModule, MatIconModule, TableModule, ButtonModule,
    ToastModule, ConfirmDialogModule
  ],
  providers:[AuthService, ConfirmationService, MessageService ],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit{

  NombreRole: string = '';
  DescripcionRole: string = '';
  IdRole!: number;
  roles:Role[] = [];
  usuarios: Usuario[] = [];
  


 checkTalentoHumano!: boolean;
 checkCapacitaciones!: boolean;
 checkCatalogo!: boolean;
 checkReporte!: boolean;
 checkNormativa!: boolean;

  selectedtalentoHumano: any[] = [];
  selectedCapacitaciones: any[] = [];
  selectedCatalogo: any[] = [];
  selectedReporte: any[] = [];
  selectedNormativa: any[] = [];

  talentoHumano: any[] = [
      { name: 'Consultar Empleados', key: 'ConsultarEmpleados' },
      { name: 'Historial Empleados', key: 'HistorialEmpleados' },
      { name: 'Incidencias', key: 'Incidencias' },
      { name: 'Vacaciones', key: 'Vacaciones' },
      { name: 'DashBoard', key: 'Dashboard' }
  ];

  capacitaciones: any[] = [
    { name: 'Consultar Capacitaciones', key: 'ConsultarCapacitaciones' },
  ];

  catalogos: any[] = [
    { name: 'Departamentos', key: 'Departamentos' },
    { name: 'Puestos', key: 'Puestos' },
    { name: 'Usuarios', key: 'Usuarios' },
  ];

  reportes: any[] = [
    { name: 'Reportes', key: 'Reportes' },
  ];

  normativas: any[] = [
    { name: 'Faltas', key: 'Faltas' },
    { name: 'Reportes Normativa', key: 'ReportesNormativa' },
  ];


  



  constructor(private usuariosService: AuthService, private confirmationService: ConfirmationService, private messageService: MessageService,
    private router: Router
  ){
   

  }

  ngOnInit(): void {
    this.usuariosService.getRoles().subscribe({
      next:(data: any) =>{
        this.roles = data;
        console.log(this.roles);
      },
      error:(error: any) =>{
        console.log(error);

      }
    })

    this.usuariosService.getUsers().subscribe({
      next:(data: any) =>{
        this.usuarios = data;
      },
      error:(error: any) =>{
        console.log(error);

      }
    })
    
  }

  nodoTH(){
    if(this.checkTalentoHumano){
      this.selectedtalentoHumano = this.talentoHumano;
    }else{
      this.selectedtalentoHumano = [];
    }
  }
  nodoCapacitaciones(){
    if(this.checkCapacitaciones){
      this.selectedCapacitaciones = this.capacitaciones;
    }else{
      this.selectedCapacitaciones = [];
    }
  }

  nodoCatalogo(){
    if(this.checkCatalogo){
      this.selectedCatalogo = this.catalogos;
    }else{
      this.selectedCatalogo = [];
    }
  }
  nodoReportes(){
    if(this.checkReporte){
      this.selectedReporte = this.reportes;
    }else{
      this.selectedReporte = [];
    }
  };

  nodeNormativa(){
    if(this.checkNormativa){
      this.selectedNormativa = this.normativas;
    }else{
      this.selectedNormativa = [];
    }
  }



  seleccion(){
    this.checkTalentoHumano = this.selectedtalentoHumano.length === this.talentoHumano.length;
    this.checkCapacitaciones = this.selectedCapacitaciones.length === this.capacitaciones.length;
    this.checkCatalogo = this.selectedCatalogo.length == this.catalogos.length;
    this.checkReporte = this.selectedReporte.length == this.reportes.length;
    this.checkNormativa = this.selectedNormativa.length == this.normativas.length;
  }

  agregar(){
    if(!this.NombreRole || !this.DescripcionRole){
      this.messageService.add({ severity: 'warn', summary: 'Campos Faltantes', detail: 'Faltan Campos Faltantes (Nombre Usuario y/o Descripción)' });
    }else{
      if((this.selectedtalentoHumano.length + this.selectedCapacitaciones.length+this.selectedCatalogo.length+this.selectedReporte.length+this.selectedNormativa.length) == 0){
        this.messageService.add({ severity: 'warn', summary: 'Permisos', detail: 'No se han Seleccionado Permisos' });
     }else{
      
    this.usuariosService.addRole(this.NombreRole, this.DescripcionRole).subscribe({
      next:(data: any) => {
        this.IdRole = data.IdRole;

        this.selectedtalentoHumano.forEach(element => {
          this.usuariosService.addPermisos(this.IdRole, element.key).subscribe({
            next:(data: any) => {console.log(data)},
            error:(error: any) => {
              console.log(error);
            }
          })
        });

        this.selectedCapacitaciones.forEach(element => {
          this.usuariosService.addPermisos(this.IdRole, element.key).subscribe({
            next:(data: any) => {console.log(data)},
            error:(error: any) => {
              console.log(error);
            }
          })
        });


        this.selectedCatalogo.forEach(element => {
          this.usuariosService.addPermisos(this.IdRole, element.key).subscribe({
            next:(data: any) => {console.log(data)},
            error:(error: any) => {
              console.log(error);
            }
          })
        });


        this.selectedReporte.forEach(element => {
          this.usuariosService.addPermisos(this.IdRole, element.key).subscribe({
            next:(data: any) => {console.log(data)},
            error:(error: any) => {
              console.log(error);
            }
          })
        });

        this.selectedNormativa.forEach(element => {
          this.usuariosService.addPermisos(this.IdRole, element.key).subscribe({
            next:(data: any) => {console.log(data)},
            error:(error: any) => {
              console.log(error);
            }
          })
        });






        this.messageService.add({ severity: 'success', summary: 'Agregado', detail: 'Role Agregado Con exito' });
        this.reiniciar();

      },
      error:(error: any) => {
        console.log(error);
      },
    })

     }

    }

    
  }

  
  editar(IdRole: number){
    this.router.navigate(['system/updaterole/'+IdRole]);
  }
  

  eliminar(IdRole: number){

    if(this.usuarios.find(usuario => usuario.IdRole === IdRole)){
      this.messageService.add({ severity: 'warn', summary: 'No Acceder', detail: 'Existen Usuarios con este Role' });
    }else{
      this.confirmationService.confirm({
        message: '¿Estas seguro que quieres eliminar?',
        header: 'Eliminación',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon:"pi pi-ban",
        rejectIcon:"pi pi-chevron-circle-right",
        rejectButtonStyleClass:"p-button-text",
        accept: () => {
          this.usuariosService.deleteRole(IdRole).subscribe({
            next:(data: any) =>{
              this.reiniciar();
              this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'Eliminado Correctamente' });
            },
            error:(error: any) =>{
              console.log(error);
            }
          })
            
        },
        reject: () => {
           
        }
    });
    }


    

    
  }

  
  reiniciar(){
this.ngOnInit();
    this.IdRole = 0;
    this.DescripcionRole = '';
    this.NombreRole = '';
    this.selectedtalentoHumano = [];
    this.selectedCapacitaciones = [];
    this.selectedCatalogo = [];
    this.selectedReporte = [];
    this.checkTalentoHumano = false;
    this.checkCapacitaciones = false;
    this.checkCapacitaciones = false;
    this.checkReporte = false;
  }



}
