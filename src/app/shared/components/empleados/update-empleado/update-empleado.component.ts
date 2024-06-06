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
import { Router, RouterModule } from '@angular/router';// Importante para manejar la navegación
import { CommonModule } from '@angular/common';

import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS} from '@angular/material/core';
import { HttpClientModule} from '@angular/common/http';
import { MatIcon } from '@angular/material/icon';
import { Empleado } from '../../../../../../backend/models/empleado.model';
import { ActivatedRoute, ParamMap } from "@angular/router";



import 'moment/locale/fr';
import { DepartamentosService } from '../../../../../../backend/ConexionDB/departamentos.service';
import { PuestosService } from '../../../../../../backend/ConexionDB/puestos.service';
import { inputEmpleado } from '../../../../../../backend/models/inputEmpleado.model';
import { log } from 'console';

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
    HeaderComponent,
    CommonModule,
    HttpClientModule,
    MatIcon
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    provideMomentDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  EmpleadosService, provideNativeDateAdapter(),CoreService, DepartamentosService, PuestosService
  ],
  templateUrl: './update-empleado.component.html',
  styleUrl: './update-empleado.component.css'
})
export class UpdateEmpleadoComponent implements OnInit{
  employeeForm: FormGroup;
  ciudades: string[] = [];
  departamentos: Departamento[] = [];
  puestos: Puesto[] = [];
  empleados: inputEmpleado[] = [];
  NoNomina1!: number;
  filteredPuestos: Puesto[] = [];
  
  edad: number=0;
  enter: boolean=true;

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
    public route: ActivatedRoute,
    private _puestosService: PuestosService

    
  ) { 
    this.employeeForm = this.fb.group({
      //Informacion Laboral
      // Define otros controles de formulario aquí
      NoNomina: [{value: ' ', disabled: true}],
      Nivel:[''],
      NombreDepartamento:[''],
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
    console.log(this.NoNomina1);
    


    this._empleadosService.getEmpleado(this.NoNomina1).subscribe({
      next: (data) => {
        
        //this.employeeForm.patchValue(data);
        //console.log(data);
        this.empleados = data;
        //this.empleados.push(data);

        console.log(this.empleados[0].NombrePuesto);


        
        
    /*this.employeeForm.patchValue({
      NombrePuesto: this.empleados[0].NombrePuesto
        });*/



        this.employeeForm.setValue({
          
      //Informacion Laboral
      // Define otros controles de formulario aquí
      NoNomina: this.empleados[0].NoNomina,
      Nivel:this.empleados[0].Nivel,
      NombreDepartamento: this.empleados[0].IdDepartamento,
      NombrePuesto:this.empleados[0].NombrePuesto,
      TipoIngreso:this.empleados[0].TipoIngreso,
      Ingreso:this.empleados[0].Ingreso,
      HorarioSemanal:this.empleados[0].HorarioSemanal,
      NSS:this.empleados[0].NSS,
      UMF:this.empleados[0].UMF,
      Sueldo: this.empleados[0].Sueldo,

      
      Nombre: this.empleados[0].Nombre,
      Apellidos: this.empleados[0].Apellidos,
      Sexo:this.empleados[0].Sexo,
      EstadoCivil: this.empleados[0].EstadoCivil,
      FechaNacimiento:this.empleados[0].FechaNacimiento,
      EntidadNacimiento:this.empleados[0].EntidadNacimiento,
      CiudadNacimiento:this.empleados[0].CiudadNacimiento,
      CURP:this.empleados[0].CURP,
      RFC:this.empleados[0].RFC,


      //Domicilio
      DomicilioIne:this.empleados[0].DomicilioIne,
      Poblacion:this.empleados[0].Poblacion,
      EntidadDireccion:this.empleados[0].EntidadDireccion,
      CP:this.empleados[0].CP,
      CorreoElectronico: this.empleados[0].CorreoElectronico,
      NumeroTelefono1:this.empleados[0].NumeroTelefono1,
      NumeroTelefono2:this.empleados[0].NumeroTelefono2,

      //Contacto de Emergencia
      NombreBeneficiario: this.empleados[0].NombreBeneficiario,
      Parentesco:this.empleados[0].Parentesco,
      FechaNacimientoBeneficiario:this.empleados[0].FechaNacimientoBeneficiario,
      NumeroTelefonoEmergencia:this.empleados[0].NumeroTelefonoEmergencia,
        })
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
      console.log(this.employeeForm.value);

      console.log(this.employeeForm.value.NombrePuesto);


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

      this._empleadosService.updateEmpleados(this.empleados[0].NoNomina,this.employeeForm.value).subscribe({
        next: (resp: any) => {
            this._coreService.openSnackBar('Empleado Actualizado successfully', resp);
        },
        error: (err: any) => {
            console.error('Error: ' + err);
            this._coreService.openSnackBar('Error al agregar Empleado');
        }
    });
    }else{
      this._coreService.openSnackBar('Por favor, complete el formulario correctamente');
    }

}


}
