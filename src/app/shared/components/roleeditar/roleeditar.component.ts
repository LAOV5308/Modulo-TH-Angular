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
  
  NombreRole: string = '';
  DescripcionRole: string = '';
  IdRole!: number;
  roles:Role[] = [];


 checkTalentoHumano!: boolean;
 checkCapacitaciones!: boolean;
 checkCatalogo!: boolean;
 checkReporte!: boolean;

  selectedtalentoHumano: any[] = [];
  selectedCapacitaciones: any[] = [];
  selectedCatalogo: any[] = [];
  selectedReporte: any[] = [];

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



  constructor(private usuariosService: AuthService, private confirmationService: ConfirmationService, private messageService: MessageService,
    private route: ActivatedRoute
  ){

  }

  ngOnInit(): void {

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('IdRole')){
        this.IdRole = Number(paramMap.get('IdRole'));
      }
    });
    
    console.log(this.IdRole);
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

  seleccion(){
    this.checkTalentoHumano = this.selectedtalentoHumano.length === this.talentoHumano.length;
    this.checkCapacitaciones = this.selectedCapacitaciones.length === this.capacitaciones.length;
    this.checkCatalogo = this.selectedCatalogo.length == this.catalogos.length;
    this.checkReporte = this.selectedReporte.length == this.reportes.length;
  }



}
