import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import { CoreService } from '../../../../Core/core.service';
import { EmpleadosService } from '../../../../../../backend/services/empleados.service';
import { Departamento } from '../../../../../../backend/models/departamento.model';
import { Puesto } from '../../../../../../backend/models/puesto.model';
import { Router, RouterModule } from '@angular/router';// Importante para manejar la navegación

import { CommonModule, NgFor } from '@angular/common';

import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS} from '@angular/material/core';
import { HttpClientModule} from '@angular/common/http';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { Empleado } from '../../../../../../backend/models/empleado.model';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { DepartamentosService } from '../../../../../../backend/services/departamentos.service';
import { PuestosService } from '../../../../../../backend/services/puestos.service';

import { estados, estados1, estadosConCiudades } from '../../../recursos/estados';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { MatGridListModule } from '@angular/material/grid-list';
import { ToastModule } from 'primeng/toast';


import 'moment/locale/es';



@Component({
  selector: 'app-update-empleado',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDialogModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatExpansionModule,
    MatCardModule,
    CommonModule,
    HttpClientModule,
    MatIcon,
    NgFor,
    ConfirmDialogModule,
    RouterModule,
    MatIconModule,
    MatGridListModule 
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    provideMomentDateAdapter(),
  EmpleadosService, CoreService, DepartamentosService, PuestosService,ConfirmationService, MessageService
  ],
  templateUrl: './update-empleado.component.html',
  styleUrl: './update-empleado.component.css'
})
export class UpdateEmpleadoComponent implements OnInit{
  employeeForm: FormGroup;
  ciudades: string[] = [];
  departamentos: Departamento[] = [];
  puestos: Puesto[] = [];
  empleados: Empleado[] =[];
  NoNomina1!: number;
  filteredPuestos: Puesto[] = [];
  
  edad: number=0;
  enter: boolean=true;
  
  estados: string[] = estados;
  estados1: string[] = estados1;
  puestoTemporal: string = '';

  //estados1: string[] = [];

  //Opciones de Eleccion
  sexo: string[] = [
    'Masculino',
    'Femenino',
      'Otro'
  ];

  nivel: string[] = [
    '1',
    '2',
    '3',
    '4',
    '5'
  ];
  
  estadocivil: string[] = [
    'Casado',
    'Soltero',
    'Unión libre',
    'Mama/padre soltero',
    'Viud@'

  ];
  tipoingreso: string[] = [
    'Nuevo',
    'Re-ingreso',
  ];
  horariosemanal: string[] = [
    '6:00- 14:00',
'14:00 -22:00',
'22:00 -6:00',
'9:00- 17:00',
'9:00 - 18:00',
'6:00 - 14:00',
'6:00 -11:00',
'9:00- 14:00',
'6:00 - A terminar ruta',
'Según ruta',
'Mañana noche tarde 1',
'Rol Jefe de Producción',
'Mixto',
'8:00 - 16:00',
'5:00am - 13:00',
'7:00am -15:00',
'Flexible',
'10:00am - 6:00pm',
'Diurno',
'8:00 - 17:00'
  ];
  parentesco: string[] = [
    'Hijo/a',
    'Esposo/a',
    'Mamá',
    'Papá',
    'Hermano/a'
  ];
  escolaridad: string[] = [
    "Sin Estudios", 
    "Primaria", 
    "Secundaria", 
    "Preparatoria", 
    "Universidad", 
    "Licenciatura", 
    "Licenciatura trunca", 
    "Ingenieria", 
    "Maestria",
    "TSU"
  ];


  constructor(private fb: FormBuilder, private _departamentosService: DepartamentosService, 
    private _empleadosService: EmpleadosService,
    public route: ActivatedRoute,
    private _puestosService: PuestosService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
    
  ) { 
    
    this.employeeForm = this.fb.group({
      //Informacion Laboral
      // Define otros controles de formulario aquí
      NoNomina: [{value: ' ', disabled: true}],
      Nivel:[''],
      NombreDepartamento:['', Validators.required],
      NombrePuesto:['', Validators.required],
      TipoIngreso:[''],
      Ingreso:['', Validators.required],
      HorarioSemanal:[''],
      Sueldo:[''],
      IngresoImss:[''],
      NSS:[''],
      UMF:[''],
      BajaImss:[''],

      //Informacion Personal
      //Nombre: ['', Validators.required],
      //Apellidos: ['', Validators.required],
      Nombre:['', Validators.required],
      Apellidos:['', Validators.required],
      Sexo:['', Validators.required],
      EstadoCivil:['', Validators.required],
      FechaNacimiento:['',Validators.required],
      EntidadNacimiento:[''],
      CiudadNacimiento:[''],
      CURP:[''],
      RFC:[''],
      Escolaridad:[''],
      //Domicilio
      //DomicilioIne:['', Validators.required],
      DomicilioIne:[''],
      Poblacion:[''],
      EntidadDireccion:[''],
      CP: [''], // Validación de solo números con 5 dígitos
      //CP:[''],
      //CorreoElectronico: ['', [Validators.required, Validators.email]],
      CorreoElectronico:[''],
      NumeroTelefono1:[''],
      NumeroTelefono2:[''],

      //Contacto de Emergencia
      //NombreBeneficiario: ['', Validators.required],
      NombreBeneficiario:[''],
      Parentesco:[''],
      FechaNacimientoBeneficiario:[''],
      NumeroTelefonoEmergencia:[''],
      // Añadir más controles de formulario aquí
    });

    //Condicion para la opcion de ciudad
    this.employeeForm.get('EntidadNacimiento')!.valueChanges.subscribe(state => {
      this.ciudades = estadosConCiudades[state] || [];
      this.employeeForm.get('CiudadNacimiento')!.setValue('');
    });

    
    this.employeeForm.get('NombreDepartamento')!.valueChanges.subscribe(departamentoId => {
      this.filterPuestos(departamentoId);
      console.log('Departamento id: '+ departamentoId);
    });


    /*this.employeeForm.get('departamento')!.valueChanges.subscribe(state => {
      this.departamentos1 = this.
    });*/

  }
  calculateAge(): void {
    const fechaNacimiento = this.employeeForm.get('FechaNacimiento')?.value;
    if (fechaNacimiento) {
      const birthDate = new Date(fechaNacimiento);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      this.edad = age;
    } else {
      this.edad = 0;
    }
  }

  filterPuestos(departamentoId: number): void {
    if (departamentoId) {
      this._puestosService.getPuestosByDepartamento(departamentoId).subscribe({
        next: (data) => {
          this.filteredPuestos = data;
          console.log(this.filteredPuestos);
        },
        error: (error) => {
          console.error('Error al cargar los puestos filtrados', error);
        }
      });
    } else {
      this.filteredPuestos = [];
    }
    //this.employeeForm.get('NombrePuesto')!.setValue('');
  }


  ngOnInit(): void {
    //Traer a todos los empleados
    this._departamentosService.getDepartamentos().subscribe({
      next: (data) => {
        this.departamentos = data;
      },
      error: (error) => {
        console.error('Error al cargar los departamentos', error);
      }
    });


    this.route.paramMap.subscribe((paramMap: ParamMap) =>{
      //console.log(paramMap.has('NoNomina'));
    if(paramMap.has('NoNomina')){
      this.NoNomina1 = Number(paramMap.get('NoNomina'));
      }
    });


    
    this._empleadosService.getEmpleado(this.NoNomina1).subscribe({
      next: (data) => {
        
        this.employeeForm.patchValue(data);
        //console.log(data);
        this.empleados = data;

        console.log(data);

        this.employeeForm.patchValue(this.empleados[0]);
        
        //Fechas
        this.employeeForm.patchValue({
          Ingreso: this.zonahoraria(this.empleados[0].Ingreso),
          IngresoImss: this.empleados[0].IngresoImss ? this.zonahoraria(this.empleados[0].Ingreso):null,
          BajaImss: this.empleados[0].BajaImss ? this.zonahoraria(this.empleados[0].BajaImss):null,
          FechaNacimiento: this.empleados[0].FechaNacimiento ? this.zonahoraria(this.empleados[0].FechaNacimiento):null,
          FechaNacimientoBeneficiario: this.empleados[0].FechaNacimientoBeneficiario ? this.zonahoraria(this.empleados[0].FechaNacimientoBeneficiario):null
      })
        
    this.employeeForm.patchValue({
      NombreDepartamento: this.empleados[0].IdDepartamento,
      NombrePuesto:this.empleados[0].NombrePuesto,
        });

        //Puesto Temporal
        this.puestoTemporal = this.empleados[0].NombrePuesto;
        //console.log(this.puestoTemporal);

        this.calculateAge();

        
        /*
        this.employeeForm.setValue({
          
      //Informacion Laboral
      // Define otros controles de formulario aquí
      NoNomina: this.empleados.NoNomina,
      Nivel:this.empleados.Nivel,
      NombreDepartamento: this.empleados.IdDepartamento,
      NombrePuesto:this.empleados.NombrePuesto,
      TipoIngreso:this.empleados.TipoIngreso,
      Ingreso:this.empleados.Ingreso,
      HorarioSemanal:this.empleados.HorarioSemanal,
      NSS:this.empleados.NSS,
      UMF:this.empleados.UMF,
      Sueldo: this.empleados.Sueldo,

      
      Nombre: this.empleados.Nombre,
      Apellidos: this.empleados.Apellidos,
      Sexo:this.empleados.Sexo,
      EstadoCivil: this.empleados.EstadoCivil,
      FechaNacimiento:this.empleados.FechaNacimiento,
      EntidadNacimiento:this.empleados.EntidadNacimiento,
      CiudadNacimiento:this.empleados.CiudadNacimiento,
      CURP:this.empleados.CURP,
      RFC:this.empleados.RFC,


      //Domicilio
      DomicilioIne:this.empleados.DomicilioIne,
      Poblacion:this.empleados.Poblacion,
      EntidadDireccion:this.empleados.EntidadDireccion,
      CP:this.empleados.CP,
      CorreoElectronico: this.empleados.CorreoElectronico,
      NumeroTelefono1:this.empleados.NumeroTelefono1,
      NumeroTelefono2:this.empleados.NumeroTelefono2,

      //Contacto de Emergencia
      NombreBeneficiario: this.empleados.NombreBeneficiario,
      Parentesco:this.empleados.Parentesco,
      FechaNacimientoBeneficiario:this.empleados.FechaNacimientoBeneficiario,
      NumeroTelefonoEmergencia:this.empleados.NumeroTelefonoEmergencia,
        })*/
      },
      error: (error) => {
        console.error('Error al cargar los Empleados', error);
      }
      
    });

    
  }

  onSubmit(): void {
    /*
    if (this.employeeForm.valid) {
      console.log(this.employeeForm.value);
    }*/

    if (this.employeeForm.valid) {
      /*
      console.log(this.employeeForm.value);

      console.log(this.employeeForm.value.NombrePuesto);*/


      if(this.employeeForm.value.Sueldo == 0){
        this.employeeForm.patchValue({
          Sueldo: null
        })
      }
      if(this.employeeForm.value.Ingreso == ''){
        this.employeeForm.patchValue({
          Ingreso: null
        })
          }
          if(this.employeeForm.value.FechaNacimiento == ''){
            this.employeeForm.patchValue({
              FechaNacimiento: null
            })
              }
              if(this.employeeForm.value.FechaNacimientoBeneficiario == ''){
                this.employeeForm.patchValue({
                  FechaNacimientoBeneficiario: null
                })
                  }

                  //Conversiones de Number a String
          this.employeeForm.patchValue({
            Nivel: this.employeeForm.value.Nivel+'',
            NSS: this.employeeForm.value.NSS+"",
            UMF: this.employeeForm.value.UMF+"",
            CP: this.employeeForm.value.CP+"",
            NombrePuesto: this.employeeForm.value.NombrePuesto,
            //NombreDepartamento: this.employeeForm.value.NombrePuesto.NombreDepartamento,
            NumeroTelefono1: this.employeeForm.value.NumeroTelefono1+'',
            NumeroTelefono2: this.employeeForm.value.NumeroTelefono2+'',
            NumeroTelefonoEmergencia: this.employeeForm.value.NumeroTelefonoEmergencia+'',
          })
          console.log(this.employeeForm.value);

          console.log(this.puestoTemporal+''+ this.employeeForm.value.NombrePuesto);

          //Cambio de Puesto
          if(this.puestoTemporal != this.employeeForm.value.NombrePuesto){
            const Hoy = new Date();
            this.confirmationService.confirm({
              message: 'Quieres cambiar de Puesto del Empleado a '+this.employeeForm.value.NombrePuesto+'?',
              header: 'Confirmación',
              icon: 'pi pi-exclamation-triangle',
              rejectButtonStyleClass:"p-button-text",
              accept: () => {

                this._empleadosService.cambioPuesto(this.NoNomina1,this.puestoTemporal,this.employeeForm.value.NombrePuesto,Hoy,this.empleados[0].Antiguedad).subscribe({
                  next: (resp: any) => {
                    //this._coreService.openSnackBar('Empleado Actualizado successfully', resp);
                    this._empleadosService.updateEmpleados(this.NoNomina1,this.employeeForm.value).subscribe({
                      next: (resp: any) => {
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Empleado Actualizado successfully' });
                          this.router.navigate(['/system/empleados']);
                      },
                      error: (err: any) => {
                          console.error('Error: ' + err);
                      }
                  });
                    
                  },
                  error: (err: any) => {
                    console.error('Error: ' + err);
                    this.messageService.add({ severity: 'error', summary: 'error', detail: 'Error al agregar empleado' });
                  }
                });
                
              },
              reject: () => {



              }
          });
          }else{

            this._empleadosService.updateEmpleados(this.NoNomina1,this.employeeForm.value).subscribe({
              next: (resp: any) => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Empleado Actualizado successfully' });
                  this.router.navigate(['/system/empleados']);
              },
              error: (err: any) => {
                  console.error('Error: ' + err);
              }
          });
          }

      

    }else{
      this.messageService.add({ severity: 'info', summary: 'Campos Faltantes', detail: 'Completa los Campos Por Favor' });
    }

}

zonahoraria(fecha: Date): Date {
  const fechaReporte = new Date(fecha); // Recibe la fecha del servidor
return new Date(fechaReporte.getTime() + fechaReporte.getTimezoneOffset() * 60000); 
}


}
