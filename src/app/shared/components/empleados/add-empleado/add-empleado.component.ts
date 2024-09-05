import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import { HeaderComponent } from '../../header/header.component';
import { CoreService } from '../../../../Core/core.service';
import { EmpleadosService } from '../../../../../../backend/ConexionDB/empleados.service';
import { Departamento } from '../../../../../../backend/models/departamento.model';
import { Puesto } from '../../../../../../backend/models/puesto.model';

import { CommonModule } from '@angular/common';

import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS} from '@angular/material/core';
import { HttpClientModule} from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';


import 'moment/locale/fr';
import { DepartamentosService } from '../../../../../../backend/ConexionDB/departamentos.service';

import { PuestosService } from '../../../../../../backend/ConexionDB/puestos.service';
import { MensajeGuardarEmpleadoComponent } from '../messages/mensaje-guardar-empleado/mensaje-guardar-empleado.component';
import { Empleado } from '../../../../../../backend/models/empleado.model';
import { Router, RouterModule } from '@angular/router';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';
import { estados, estados1, estadosConCiudades } from '../../../recursos/estados';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';


export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-add-empleado',
  standalone: true,
  imports: [
    ToastModule,
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
    HeaderComponent,
    CommonModule,
    HttpClientModule,
    MensajeGuardarEmpleadoComponent,
    MatCheckboxModule,
    FormsModule,
    RouterModule,
    MatIconModule,
    CardModule
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    provideMomentDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  EmpleadosService, provideNativeDateAdapter(),CoreService, DepartamentosService, PuestosService
],
    
  templateUrl: './add-empleado.component.html',
  styleUrl: './add-empleado.component.css'
})
export class AddEmpleadoComponent implements OnInit {
  disabled = false;
  employeeForm: FormGroup;
  ciudades: string[] = [];
  departamentos: Departamento[] = [];
  puestos: Puesto[] = [];
  empleadosAdd: Empleado[] = [];
  filteredPuestos: Puesto[] = [];
  edad: number=0;
  enter: boolean=true;
  estados: string[] = estados;
  estados1: string[] = estados1;
  //estados1: string[] = [];

  //Opciones de Eleccion
  sexo: string[] = [
    'Masculino',
    'Femenino'
  ];
  nivel: string[] = [
    '1',
    '2',
    '3'
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
    '6:00 - 14:00',
    '6:00 - 11:00',
    '9:00 - 14:00',
    '9:00 - 17:00',
    '9:00 - 18:00',
    '14:00 - 22:00',
    '22:00 - 6:00'
  ];
  parentesco: string[] = [
    'Hijo/a',
    'Esposo/a',
    'Mamá',
    'Papá',
    'Hermano/a'
  ];
  escolaridad: string[] = [
      'Sin escolaridad',
      'Preescolar',
      'Primaria incompleta',
      'Primaria completa',
      'Secundaria incompleta',
      'Secundaria completa',
      'Preparatoria o bachillerato incompleto',
      'Preparatoria o bachillerato completo',
      'Educación técnica o comercial incompleta',
      'Educación técnica o comercial completa',
      'Licenciatura incompleta',
      'Licenciatura completa',
      'Maestría incompleta',
      'Maestría completa',
      'Doctorado incompleto',
      'Doctorado completo',
  ];

  constructor(private fb: FormBuilder, private _adapter: DateAdapter<any>, private _departamentosService: DepartamentosService, 
    private _empleadosService: EmpleadosService,
    private _coreService: CoreService,
    private _puestosService: PuestosService,
    public dialog: MatDialog,
    private router: Router, private messageService: MessageService
  ) { 
    
    this.employeeForm = this.fb.group({
      
      //Informacion Laboral
      // Define otros controles de formulario aquí
      NoNomina: ['', Validators.required],
      Nivel:[''],
      departamento:['', Validators.required],
      NombrePuesto:['', Validators.required],
      TipoIngreso:[''],
      Ingreso:[''],
      HorarioSemanal:['', Validators.required],
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
      FechaNacimiento:[''],
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
    this._adapter.setLocale('en-GB'); // Esto configura el adaptador de fecha para usar el formato de fecha correcto

    //Condicion para la opcion de ciudad
    this.employeeForm.get('EntidadNacimiento')?.valueChanges.subscribe(state => {
      this.ciudades = estadosConCiudades[state] || [];
      this.employeeForm.get('CiudadNacimiento')?.setValue('');
    });

    this.employeeForm.get('departamento')!.valueChanges.subscribe(departamentoId => {
      this.filterPuestos(departamentoId);
    });


    /*this.employeeForm.get('departamento')!.valueChanges.subscribe(state => {
      this.departamentos1 = this.
    });*/
  
  }



  filterPuestos(departamentoId: number): void {
    if (departamentoId) {
      this._puestosService.getPuestosByDepartamento(departamentoId).subscribe({
        next: (data) => {
          this.filteredPuestos = data;
        },
        error: (error) => {
          console.error('Error al cargar los puestos filtrados', error);
        }
      });
    } else {
      this.filteredPuestos = [];
    }
    this.employeeForm.get('NombrePuesto')!.setValue('');
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


    this._puestosService.getPuestos().subscribe({
      next: (data) => {
        this.puestos = data;
      },
      error: (error) => {
        console.error('Error al cargar los departamentos', error);
      }
    });

    this._empleadosService.getEmpleadosAll().subscribe({
      next: (empleados) => {
        this.empleadosAdd = empleados;
      },
      error: (error) => {
        console.error('Error al cargar los empleados', error);
      }
    })

    this.employeeForm.get('disabled')?.valueChanges.subscribe(disabled => {
      if (disabled) {
        this.employeeForm.get('DomicilioIne')?.disable();
        this.employeeForm.get('Poblacion')?.disable();
      } else {
        this.employeeForm.get('DomicilioIne')?.enable();
        this.employeeForm.get('Poblacion')?.enable();
      }
    });

  }

  onSubmit(): void {
    /*
    if (this.employeeForm.valid) {
      console.log(this.employeeForm.value);
    }*/
    

    if (this.employeeForm.valid) {
      const dialogRef = this.dialog.open(MensajeGuardarEmpleadoComponent, {
        width: '350px'
      })

      dialogRef.afterClosed().subscribe(result => {
        if (result) {


          this.enter = true;
        this.empleadosAdd.forEach(element => {
        if(element.NoNomina == this.employeeForm.value.NoNomina){
        this.enter = false;
      }

    });
    
    if(this.enter){
          //Mensaje de Confirmacion
          console.log(this.employeeForm.value.NombrePuesto.NombrePuesto);
          //Validaciones en caso de campos vacios
          console.log(this.employeeForm.value);
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
                      if(this.employeeForm.value.IngresoImss == ''){
                        this.employeeForm.patchValue({
                          IngresoImss: null
                        })
                          }if(this.employeeForm.value.BajaImss == ''){
                            this.employeeForm.patchValue({
                              BajaImss: null
                            })}
    
          //Conversiones de Number a String
          this.employeeForm.patchValue({
            NombrePuesto: this.employeeForm.value.NombrePuesto.NombrePuesto,
            Nivel: this.employeeForm.value.Nivel+'',
            NSS: this.employeeForm.value.NSS+"",
            UMF: this.employeeForm.value.UMF+"",
            CP: this.employeeForm.value.CP+"",
            NumeroTelefono1: this.employeeForm.value.NumeroTelefono1+'',
            NumeroTelefono2: this.employeeForm.value.NumeroTelefono2+'',
            NumeroTelefonoEmergencia: this.employeeForm.value.NumeroTelefonoEmergencia+'',
          })
          
          console.log(this.employeeForm.value);
          this._empleadosService.addEmpleados(this.employeeForm.value).subscribe({
            next: (resp: any) => {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Empleado Agregado Satisfactoriamente  *o*' });
                //this._coreService.openSnackBar('Empleado Agregado Satisfactoriamente  *o*', resp);
                this.limpiarCampos();
                //this.router.navigate(['/system/empleados']);

            },
            error: (err: any) => {
                console.error('Error: ' + err);
                this._coreService.openSnackBar('error ' + err);
            }
        });

    }else{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Numero De Nomina ya Existe' });
      
    }

          // Aquí puedes agregar la lógica para manejar el cierre de sesión
        } else {


        }
      });

    }else{
      this._coreService.openSnackBar('Por favor, complete el formulario correctamente');
    }

}

limpiarCampos(){
  this.employeeForm.reset({
    NoNomina: null,
    Nivel: null,
    departamento: null,
    NombrePuesto: null,
    TipoIngreso: null,
    Ingreso: null,
    HorarioSemanal: null,
    NSS: null,
    UMF: null,
    Sueldo: null,
    Nombre: null,
    Apellidos: null,
    Sexo: null,
    EstadoCivil: null,
    FechaNacimiento: null,
    EntidadNacimiento: null,
    CiudadNacimiento: null,
    CURP: null,
    RFC: null,
    DomicilioIne: null,
    Poblacion: null,
    EntidadDireccion: null,
    CP: null,
    CorreoElectronico: null,
    NumeroTelefono1: null,
    NumeroTelefono2: null,
    NombreBeneficiario: null,
    Parentesco: null,
    FechaNacimientoBeneficiario: null,
    NumeroTelefonoEmergencia: null
  });

}

};
