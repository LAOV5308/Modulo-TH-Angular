import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

//Modulos de Importaciones
import { HttpClientModule, provideHttpClient, withFetch  } from '@angular/common/http';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatButton, MatIconButton } from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CoreService } from '../../src/app/Core/core.service';
import { MatPaginator } from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router, RouterModule } from '@angular/router';// Importante para manejar la navegación

//Interfaces
import { Empleado } from '../../backend/models/empleado.model';


//Servicios
import { EmpleadosService } from '../../backend/services/empleados.service';



import { FlexLayoutModule } from '@angular/flex-layout';
import { AddBajaComponent } from '../../src/app/shared/components/Bajas/add-baja/add-baja.component';
//import { AddDepartamentoComponent } from '../../src/app/shared/components/Departamentos/add-departamento/add-departamento.component';
//import { UpdateDepartamentoComponent } from '../../src/app/shared/components/Departamentos/update-departamento/update-departamento.component';
import {MatTabsModule} from '@angular/material/tabs';
import { MessageRecuperarComponent } from '../../src/app/shared/components/Messages/message-recuperar/message-recuperar.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Departamento } from '../../backend/models/departamento.model';
import { Puesto } from '../../backend/models/puesto.model';
import { estados, estados1, estadosConCiudades } from '../../src/app/shared/recursos/estados';
import {DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS} from '@angular/material/core';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import { PuestosService } from '../../backend/services/puestos.service';
import { MessageService,MenuItem } from 'primeng/api';
import { MensajeGuardarEmpleadoComponent } from '../../src/app/shared/components/empleados/messages/mensaje-guardar-empleado/mensaje-guardar-empleado.component';
import { DepartamentosService } from '../../backend/services/departamentos.service';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { SplitButtonModule } from 'primeng/splitbutton';


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
  selector: 'app-datos',
  standalone: true,
  imports: [ButtonModule, NgIf, MatCardModule,ToastModule, CardModule,MatDialogModule, MatInputModule, 
    MatDatepickerModule, MatNativeDateModule, MatRadioModule, MatSelectModule, ReactiveFormsModule,
    HttpClientModule,
    NgFor, MatButton, MatExpansionModule,
    MatSort, MatTableModule, MatIcon,
    MatIconModule,
    //UpdateEmpleadoComponent,
    MatPaginator,
    MatFormFieldModule,
    FlexLayoutModule,
    AddBajaComponent,
    MatTabsModule,
    MessageRecuperarComponent,
    MensajeGuardarEmpleadoComponent,
    TooltipModule,
    SplitButtonModule,
    CommonModule
  ],
  providers: [EmpleadosService, CoreService,DepartamentosService, PuestosService, MessageService,
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }  ,
    provideMomentDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'es' },
  ],
  templateUrl: './datos.component.html',
  styleUrl: './datos.component.css'
})
export class DatosComponent implements OnInit, AfterViewInit{
  NoNomina: number = 0;
  Form: FormGroup;

    //Opciones de Eleccion
    sexo: string[] = [
      'Masculino',
      'Femenino',
      'Otro'
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



  displayedColumns: string[] = [
    'NoNomina',
    'Nombre',
    'Edad',
    'NombreDepartamento',
    'NombrePuesto',
    'Ingreso',
    'Antiguedad',
    'HorarioSemanal',
    //'TipoIngreso',
    //'Sueldo',
    //'EstadoEmpleado',
    'Ver',
    'Acciones'
  ];

  displayedColumns1: string[] = [
    'NoNomina',
    'Nombre',
    'Edad',
    'NombreDepartamento',
    'NombrePuesto',
    'Ingreso',
    'Antiguedad',
    'HorarioSemanal',
    'TipoIngreso',
    //'Sueldo',
    //'EstadoEmpleado',
    'Acciones'
  ];

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

  empleados: Empleado[] = [];
  dataSource!: MatTableDataSource<any>;
  dataInactive!: MatTableDataSource<any>;
    // Cambiar identificadores de ViewChild
    @ViewChild('sortActive') sortActive!: MatSort;
    @ViewChild('paginatorActive') paginatorActive!: MatPaginator;
    @ViewChild('sortInactive') sortInactive!: MatSort;
    @ViewChild('paginatorInactive') paginatorInactive!: MatPaginator;

  constructor(private empleadosService: EmpleadosService, 
    private _coreService: CoreService,
    private _dialog: MatDialog,
    private router: Router,
    private _fb: FormBuilder,
    private _adapter: DateAdapter<any>,
    private _empleadosService: EmpleadosService,
    private _puestosService: PuestosService,
    private messageService: MessageService,
    private _departamentosService: DepartamentosService
  ) { 
      this.Form = this._fb.group({
        NoNomina: ''
      });
  

      this.employeeForm = this._fb.group({
      
        //Informacion Laboral
        // Define otros controles de formulario aquí
        NoNomina: ['', Validators.required],
        Nivel:[''],
        departamento:['', Validators.required],
        NombrePuesto:['', Validators.required],
        TipoIngreso:[''],
        Ingreso:[''],
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
        EstadoCivil:[''],
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

    ngAfterViewInit(): void {
      // Configurar el dataSource con el MatSort y MatPaginator después de que se hayan inicializado
      if (this.dataSource) {
        this.dataSource.sort = this.sortActive;
        this.dataSource.paginator = this.paginatorActive;
      }

      if (this.dataInactive) {
        this.dataInactive.sort = this.sortInactive;
        this.dataInactive.paginator = this.paginatorInactive;
      }

    }

  ngOnInit() {

    

    //Traer a todos los empleados
    this.empleadosService.getEmpleados().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sortActive;
        this.dataSource.paginator = this.paginatorActive;
        this.empleados = data;
      },
      error: (error) => {
        console.error('Error al cargar los Empleados', error);
      }
    });

    this.empleadosService.getEmpleadosInactive().subscribe({
      next: (data) => {
        this.dataInactive = new MatTableDataSource(data);
        this.dataInactive.sort = this.sortInactive;
        this.dataInactive.paginator = this.paginatorInactive;
        //this.empleados = data;
      },
      error: (error) => {
        console.error('Error al cargar los Empleados Inactivos', error);
      }
    });



    /*
    this.empleadosService.getEmpleados().subscribe({
      next: (data) => {
        this.empleados = data;
      },
      error: (error) => {
        console.error('Error al cargar los empleados', error);
        window.alert('Eror al cargar los empleados' + error);
      }
    });*/

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

  agregar(){
    /*
    const dialog = this._dialog.open(CreateEmpleadoComponent);
    dialog.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.actualizar();
        }
      }
    });*/


  }

  dias(dias: number): string {
    const diasPorAño = 365;
    const diasPorMes = 30;
  
    // Calcula los años y meses
    const años = Math.floor(dias / diasPorAño);
    const meses = Math.floor((dias % diasPorAño) / diasPorMes);
  
    // Construye el resultado dependiendo de los años y meses
    let resultado = '';
  
    if (años > 0) {
      resultado += `${años} Año${años > 1 ? 's' : ''}`;
    }
  
    if (meses > 0) {
      if (años > 0) {
        resultado += ' ';
      }
      resultado += `${meses} Mes${meses > 1 ? 'es' : ''}`;
    }
  
    return resultado || '0 Meses'; // En caso de que los días sean 0
  }
  

  consultar(idEmpleado: number){
    this.router.navigate(['system/consultarEmpleado'+'/'+idEmpleado]);
  }

  recuperar(NoNomina1: number, NombreEmpleado: string){

    //Mensaje de confirmar para eliminar
    const dialogRef = this._dialog.open(MessageRecuperarComponent, {
      width: '400px', height: '250px', 
      data: {
        description: '¿Está seguro que desea recuperar el empleado?',
        item: NombreEmpleado
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        /*
        let datos = [{
          NoNomina: NoNomina1
        }];*/

        this.Form.patchValue({
          NoNomina: NoNomina1
        })

    this.empleadosService.recuperarEmpleado(this.Form.value).subscribe({
      next: (resp: any) => {
        this._coreService.openSnackBar('Empleado Recuperado successfully', resp);
        this.actualizar();

    },
    error: (err: any) => {
        console.error('Error: ' + err);
        this._coreService.openSnackBar('Error al recuperar Empleado');
    }
    });
        
      }
    });
  }
  

  editar(id: number){
    this.router.navigate(['system/updateEmpleado'+'/'+id]);
    
    /*
      const dialogU = this._dialog.open(UpdateEmpleadoComponent);

      dialogU.afterClosed().subscribe({
        next:(val)=>{
          if(val){
            this.actualizar();
          }
        }
      });*/
    
  }

  eliminar(data: any){

    const dialogU = this._dialog.open(AddBajaComponent,{
      data
    });

    
    dialogU.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.actualizar();
        }
      }
    });

/*
    window.alert("Elimina"+id);
    //Eliminar
    this.empleadosService.deleteEmpleados(id).subscribe({
      next: (res) => {
        this.actualizar();
        this._coreService.openSnackBar('Employee deleted!', 'done');
      },
      error: (error) => {
        console.error('Error al cargar los empleados', error);
      }
    });*/

  }

  actualizar(){
    this.ngOnInit();
  }


  onSubmit(): void {
    /*
    if (this.employeeForm.valid) {
      console.log(this.employeeForm.value);
    }*/
    

    if (this.employeeForm.valid) {

      /**<h1 mat-dialog-title>Confirmar Acción</h1>
<div mat-dialog-content>¿Estás seguro de que quieres Guardar el Empleado?</div>
<div mat-dialog-actions class="dialog-actions">
  <button mat-button [mat-dialog-close]="true" class="buttonsi">Sí</button>
  <button mat-button [mat-dialog-close]="false" class="buttonno">No</button>
</div>
 */


      const dialogRef = this._dialog.open(MensajeGuardarEmpleadoComponent, {
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
            Nivel: this.employeeForm.value.Nivel+"",
            NSS: this.employeeForm.value.NSS+"",
            UMF: this.employeeForm.value.UMF+"",
            CP: this.employeeForm.value.CP+"",
            NumeroTelefono1: this.employeeForm.value.NumeroTelefono1+"",
            NumeroTelefono2: this.employeeForm.value.NumeroTelefono2+"",
            NumeroTelefonoEmergencia: this.employeeForm.value.NumeroTelefonoEmergencia+"",
          })
          
          console.log(this.employeeForm.value);
          this._empleadosService.addEmpleados(this.employeeForm.value).subscribe({
            next: (resp: any) => {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Empleado Agregado Satisfactoriamente  *o*' });
                //this._coreService.openSnackBar('Empleado Agregado Satisfactoriamente  *o*', resp);
                this.actualizar();
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

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


applyFilterInactive(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataInactive.filter = filterValue.trim().toLowerCase();

  if (this.dataInactive.paginator) {
    this.dataInactive.paginator.firstPage();
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

}
