import { CommonModule, NgFor, NgIf } from '@angular/common';
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
import { Role } from '../../../../../backend/models/user.model';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';// Importante para manejar la navegación


@Component({
  selector: 'app-roleeditar',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgIf, NgFor,
    CommonModule, FormsModule, ReactiveFormsModule,MatButtonModule,RouterLink,CheckboxModule, MatCheckboxModule, MatFormFieldModule,
    MatInputModule, MatExpansionModule, MatTabsModule, MatIconModule, TableModule, ButtonModule,
    ToastModule, ConfirmDialogModule
  ],
  providers:[AuthService, ConfirmationService, MessageService],
  templateUrl: './roleeditar.component.html',
  styleUrl: './roleeditar.component.css'
})
export class RoleeditarComponent implements OnInit {
  Role: Role[] = [];

  NombreRole: string = '';
  DescripcionRole: string = '';
  IdRole!: number;
  
  roles:Role[] = [];


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
    private route: ActivatedRoute, private router: Router
  ){

  }

  ngOnInit(): void {

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('IdRole')){
        this.IdRole = Number(paramMap.get('IdRole'));
      }
    });
    
    console.log(this.IdRole);

    this.usuariosService.getRole(this.IdRole).subscribe({
      next:(data: any) => {
        this.Role = data;

        this.NombreRole = this.Role[0].NombreRole;
        this.DescripcionRole = this.Role[0].DescripcionRole;
        
        this.iniciarSeleccion();



      },
      error:(error: any) => {
        console.log(error);
      },
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


  iniciarSeleccion(){
  this.selectedtalentoHumano = this.talentoHumano.filter(cat => {
    if (cat.key === 'ConsultarEmpleados' && this.Role[0].ConsultarEmpleados) {
      return true;
    }
    if (cat.key === 'HistorialEmpleados' && this.Role[0].HistorialEmpleados) {
      return true;
    }
    if (cat.key === 'Incidencias' && this.Role[0].Incidencias) {
      return true;
    }
    if (cat.key === 'Vacaciones' && this.Role[0].Vacaciones) {
      return true;
    }
    if (cat.key === 'Dashboard' && this.Role[0].Dashboard) {
      return true;
    }
    return false;
  });


  this.selectedCapacitaciones = this.capacitaciones.filter(cat => {
    if (cat.key === 'ConsultarCapacitaciones' && this.Role[0].ConsultarCapacitaciones) {
      return true;
    }
    return false;
  });


    this.selectedCatalogo = this.catalogos.filter(cat => {
      if (cat.key === 'Usuarios' && this.Role[0].Usuarios) {
        return true;
      }
      if (cat.key === 'Departamentos' && this.Role[0].Departamentos) {
        return true;
      }
      if (cat.key === 'Puestos' && this.Role[0].Puestos) {
        return true;
      }
      return false;
    });


this.selectedReporte = this.reportes.filter(cat => {
    if (cat.key === 'Reportes' && this.Role[0].Reportes) {
      return true;
    }
    return false;
  });

  this.selectedNormativa = this.normativas.filter(cat => {
    if (cat.key === 'Faltas' && this.Role[0].Faltas) {
      return true;
    }
    if (cat.key === 'ReportesNormativa' && this.Role[0].ReportesNormativa) {
      return true;
    }
    return false;
  });




    this.seleccion();

  }

  actualizar(){
    this.usuariosService.updateRole(this.IdRole, this.NombreRole, this.DescripcionRole).subscribe({
      next:(data: any) => {

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

        this.messageService.add({ severity: 'success', summary: 'Satisfactorio', detail: 'Actualizado Con Exito' , life: 900});


        

      },
      error:(error: any) => {
        console.log(error);
      },
    });
  }


  regresar(){
    this.router.navigate(['system/roles']);
  }


}
