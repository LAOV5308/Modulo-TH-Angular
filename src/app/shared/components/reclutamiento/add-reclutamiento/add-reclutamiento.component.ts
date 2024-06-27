import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
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
import { MatIcon } from '@angular/material/icon';


import 'moment/locale/fr';
import { DepartamentosService } from '../../../../../../backend/ConexionDB/departamentos.service';

import { PuestosService } from '../../../../../../backend/ConexionDB/puestos.service';

import { Empleado } from '../../../../../../backend/models/empleado.model';
import { Router } from '@angular/router';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';
import { estados, estados1, estadosConCiudades } from '../../../recursos/estados';
import { MensajeGuardarEmpleadoComponent } from '../../empleados/messages/mensaje-guardar-empleado/mensaje-guardar-empleado.component';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SolicitudesService } from '../../../../../../backend/ConexionDB/solicitudes.service';


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
  selector: 'app-add-reclutamiento',
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
    HeaderComponent,
    CommonModule,
    HttpClientModule,
    MatIcon,
    MatCheckboxModule,
    FormsModule,
    MensajeGuardarEmpleadoComponent,
    CommonModule,
    MatAutocompleteModule,
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    provideMomentDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  EmpleadosService, provideNativeDateAdapter(),CoreService, DepartamentosService, PuestosService, SolicitudesService
],
  templateUrl: './add-reclutamiento.component.html',
  styleUrl: './add-reclutamiento.component.css'
})
export class AddReclutamientoComponent implements OnInit{
  disabled = false;
  employeeForm: FormGroup;
  ciudades: string[] = [];
  departamentos: Departamento[] = [];
  puestos: Puesto[] = [];
  empleados: Empleado[] = [];
  filteredPuestos: Puesto[] = [];
  edad: number=0;
  enter: boolean=true;
  estados: string[] = estados;
  estados1: string[] = estados1;

  filteredPuestosSolicitados: Puesto[] = [];
  filteredPuestosOfrecidos: Puesto[] = [];
  puestoSolicitado: string = '';
  puestoOfrecido: string = '';

  //PuestoOfrecido = new FormControl();
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
    private router: Router,
    private _solicitudesService: SolicitudesService
  ) { 
    
    this.employeeForm = this.fb.group({
      
      
      // Define otros controles de formulario aquí
      //FechaSolicitud
      FechaSolicitud: ['', Validators.required],

      //Informacion Personal
      Nombre:['', Validators.required],
      Apellidos:['', Validators.required],
      Sexo:[''],
      EstadoCivil:[''],
      FechaNacimiento:[''],
      EntidadNacimiento:[''],
      CiudadNacimiento:[''],
      CURP:[''],
      RFC:[''],
      Escolaridad:[''],

      //Informacion Laboral
      Experiencia:[''],
      //departamentoSolicitado:[''],
      
      PuestoSolicitado: [''],
      PuestoOfrecido: [''],
      HorarioSemanal:[''],

      //SeguroSocial
      NSS:[''],
      UMF:[''],

      
      //Nombre: ['', Validators.required],
      //Apellidos: ['', Validators.required],
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

    /*
    this.employeeForm.get('departamento')!.valueChanges.subscribe(departamentoId => {
      this.filterPuestos(departamentoId);
    });*/


    /*this.employeeForm.get('departamento')!.valueChanges.subscribe(state => {
      this.departamentos1 = this.
    });*/
  
  }


//Con departamento
/*
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
    this.employeeForm.get('PuestoSolicitado')!.setValue('');
  }*/



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

/*
    this._puestosService.getPuestos().subscribe({
      next: (data) => {
        this.puestos = data;
      },
      error: (error) => {
        console.error('Error al cargar los puestos', error);
      }
    });*/
   
    this._puestosService.getPuestos().subscribe({
      next: (data) => {
        this.puestos = data;
        this.filteredPuestosSolicitados = this.puestos;
        this.filteredPuestosOfrecidos = this.puestos;
      },
      error: (error) => {
        console.error('Error al cargar los puestos', error);
      }
    });


    this._empleadosService.getEmpleadosAll().subscribe({
      next: (empleados) => {
        this.empleados = empleados;
      },
      error: (error) => {
        console.error('Error al cargar los empleados', error);
      }
    });

  }

  filterPuestosSolicitados() {
    const filterValue = this.puestoSolicitado.toLowerCase();
    this.filteredPuestosSolicitados = this.puestos.filter(puesto => puesto.NombrePuesto.toLowerCase().includes(filterValue));
  }

  filterPuestosOfrecidos() {
    const filterValue = this.puestoOfrecido.toLowerCase();
    this.filteredPuestosOfrecidos = this.puestos.filter(puesto => puesto.NombrePuesto.toLowerCase().includes(filterValue));
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
          
          /*
        this.empleados.forEach(element => {
        if(element.NoNomina == this.employeeForm.value.NoNomina){
        this.enter = false;
      }});*/
    
          if(this.enter){
          //Mensaje de Confirmacion
          //console.log(this.employeeForm.value.NombrePuesto.NombrePuesto);
          //Validaciones en caso de campos vacios
          console.log(this.employeeForm.value);
          
          if(this.employeeForm.value.FechaSolicitud == ''){
            this.employeeForm.patchValue({
              FechaSolicitud: null
            })
          }
    /*
          if(this.employeeForm.value.Ingreso == ''){
            this.employeeForm.patchValue({
              Ingreso: null
            })
              }*/

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
                      /*
                      if(this.employeeForm.value.IngresoImss == ''){
                        this.employeeForm.patchValue({
                          IngresoImss: null
                        })
                          }if(this.employeeForm.value.BajaImss == ''){
                            this.employeeForm.patchValue({
                              BajaImss: null
                            })}*/
    
          //Conversiones de Number a String
          this.employeeForm.patchValue({
            //NombrePuesto: this.employeeForm.value.NombrePuesto.NombrePuesto,
            //Nivel: this.employeeForm.value.Nivel+'',
            NSS: this.employeeForm.value.NSS+"",
            UMF: this.employeeForm.value.UMF+"",
            CP: this.employeeForm.value.CP+"",
            NumeroTelefono1: this.employeeForm.value.NumeroTelefono1+'',
            NumeroTelefono2: this.employeeForm.value.NumeroTelefono2+'',
            NumeroTelefonoEmergencia: this.employeeForm.value.NumeroTelefonoEmergencia+'',
          })
          
          console.log(this.employeeForm.value);
          

          this._solicitudesService.addSolicitud(this.employeeForm.value).subscribe({
            next: (resp: any) => {
              this._coreService.openSnackBar('Solicitud Agregado Satisfactoriamente  *o*', resp);
              this.limpiarCampos();
              this.router.navigate(['/system/solicitudes']);

          },
          error: (err: any) => {
              console.error('Error: ' + err);
              this._coreService.openSnackBar('error ' + err);
          }
          });
          /*
          this._empleadosService.addEmpleados(this.employeeForm.value).subscribe({
            next: (resp: any) => {
                this._coreService.openSnackBar('Solicitud Agregado Satisfactoriamente  *o*', resp);
                this.limpiarCampos();
                this.router.navigate(['/system/solicitudes']);

            },
            error: (err: any) => {
                console.error('Error: ' + err);
                this._coreService.openSnackBar('error ' + err);
            }
        });*/

    }else{
      this._coreService.openSnackBar('Numero De Nomina ya Existente');
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
    FechaSolicitud: null,
    Nombre: null,
    Apellidos: null,
    Sexo: null,
    EstadoCivil: null,
    FechaNacimiento: null,
    EntidadNacimiento: null,
    CiudadNacimiento: null,
    CURP: null,
    RFC: null,
    Escolaridad:null,
    Experiencia:null,
    departamento: null,
    NombrePuesto: null,

    HorarioSemanal: null,
    NSS: null,
    UMF: null,

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

}
