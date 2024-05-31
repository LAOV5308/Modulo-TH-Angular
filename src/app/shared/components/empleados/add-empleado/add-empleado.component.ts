import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
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
import { MatIcon } from '@angular/material/icon';


import 'moment/locale/fr';
import { DepartamentosService } from '../../../../../../backend/ConexionDB/departamentos.service';

import { PuestosService } from '../../../../../../backend/ConexionDB/puestos.service';
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
    MatIcon
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    provideMomentDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  EmpleadosService, provideNativeDateAdapter(),CoreService, DepartamentosService, PuestosService],
    
  templateUrl: './add-empleado.component.html',
  styleUrl: './add-empleado.component.css'
})
export class AddEmpleadoComponent implements OnInit {
  employeeForm: FormGroup;
  ciudades: string[] = [];
  departamentos: Departamento[] = [];
  puestos: Puesto[] = [];
  filteredPuestos: Puesto[] = [];
  edad: number=0;
  //estados1: string[] = [];

  //Opciones de Eleccion
  sexo: string[] = [
    'Masculino',
    'Femenino'
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

  estados: string[] = [
    'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche',
    'Chiapas', 'Chihuahua', 'Coahuila', 'Colima', 'Ciudad de México', 'Durango',
    'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'México', 'Michoacán',
    'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro',
    'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco',
    'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'
  ];
  estados1: string[] = [
    'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche',
    'Chiapas', 'Chihuahua', 'Coahuila', 'Colima', 'Ciudad de México', 'Durango',
    'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'México', 'Michoacán',
    'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro',
    'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco',
    'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'
  ];
  estadosConCiudades: { [key: string]: string[] } = {
    'Aguascalientes': ['Aguascalientes', 'Asientos', 'Calvillo'],
    'Baja California': ['Mexicali', 'Tijuana', 'Ensenada'],
    'Baja California Sur': ['La Paz', 'Los Cabos', 'Loreto'],
    'Guanajuato': ['Abasolo', 'Acámbaro', 'Apaseo el Alto', 'Apaseo el Grande', 'Atarjea', 'Celaya', 'Comonfort',
    'Coroneo', 'Cortazar', 'Cuerámaro', 'Doctor Mora' , 'Dolores Hidalgo Cuna de la Independencia Nacional', 'Guanajuato',
    'Huanímaro', 'Irapuato', 'Jaral del Progreso' , 'Jerécuaro', 'León', 'Manuel Doblado', 'Moroleón', 'Ocampo', 'Pénjamo',
    'Pueblo Nuevo', 'Purísima del Rincón', 'Romita', 'Salamanca', 'Salvatierra', 'San Diego de la Unión', 'San Felipe',
    'San Francisco del Rincón', 'San José Iturbide', 'San Luis de la Paz', 'San Miguel de Allende', 'Santa Catarina', 'Santa Cruz de Juventino Rosas',
    'Santiago Maravatío', 'Silao de la Victoria', 'Tarandacuao', 'Tarimoro', 'Tierra Blanca', 'Uriangato', 'Valle de Santiago', 'Victoria',
    'Villagrán', 'Xichú', 'Yuriria'
  ],
    // Agrega el resto de los estados y sus ciudades
    // ...
  };

  constructor(private fb: FormBuilder, private _adapter: DateAdapter<any>, private _departamentosService: DepartamentosService, 
    private _empleadosService: EmpleadosService,
    private _coreService: CoreService,
    private _puestosService: PuestosService
  ) { 
    this.employeeForm = this.fb.group({
      
      //Informacion Laboral
      // Define otros controles de formulario aquí
      NoNomina: ['', Validators.required],
      Nivel:[''],
      departamento:[''],
      NombrePuesto:['', Validators.required],
      TipoIngreso:[''],
      Ingreso:[''],
      HorarioSemanal:[''],
      NSS:[''],
      UMF:[''],
      Sueldo:[''],

      //Informacion Personal
      //Nombre: ['', Validators.required],
      //Apellidos: ['', Validators.required],
      Nombre:[''],
      Apellidos:[''],
      Sexo:[''],
      EstadoCivil:[''],
      FechaNacimiento:[''],
      EntidadNacimiento:[''],
      CiudadNacimiento:[''],
      CURP:[''],
      RFC:[''],
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
    this.employeeForm.get('EntidadNacimiento')!.valueChanges.subscribe(state => {
      this.ciudades = this.estadosConCiudades[state] || [];
      this.employeeForm.get('CiudadNacimiento')!.setValue('');
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
  }

  onSubmit(): void {
    /*
    if (this.employeeForm.valid) {
      console.log(this.employeeForm.value);
    }*/
    

    if (this.employeeForm.valid) {

      
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
            this._coreService.openSnackBar('Empleado Agregado Satisfactoriamente  *o*', resp);
            this.limpiarCampos();
        },
        error: (err: any) => {
            console.error('Error: ' + err);
            this._coreService.openSnackBar('Error al agregar el empleado '+err);
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
