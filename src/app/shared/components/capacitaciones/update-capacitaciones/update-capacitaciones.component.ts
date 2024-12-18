import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router, RouterModule } from '@angular/router';// Importante para manejar la navegación
import { CapacitacionService } from '../../../../../../backend/services/capacitacion.service';
import { CardModule } from 'primeng/card';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SplitterModule } from 'primeng/splitter';
import { CalendarModule } from 'primeng/calendar';
import { Empleado } from '../../../../../../backend/models/empleado.model';
import { CapacitacionProgramada } from '../../../../../../backend/models/capacitacion.model';
import { ColorPickerModule } from 'primeng/colorpicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NgxColorsModule } from 'ngx-colors';
import { parseISO } from 'date-fns';


@Component({
  selector: 'app-update-capacitaciones',
  standalone: true,
  imports: [CommonModule, RouterModule, CardModule, MatButtonModule, MatIconModule, MatButtonModule,
    FormsModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, SplitterModule, CalendarModule, ColorPickerModule,
    MatCheckboxModule, MatInputModule, ToastModule, ConfirmDialogModule, NgxColorsModule

  ],
  providers:[CapacitacionService, ConfirmationService, MessageService],
  templateUrl: './update-capacitaciones.component.html',
  styleUrl: './update-capacitaciones.component.css'
})
export class UpdateCapacitacionesComponent implements OnInit{
  dates: Date[] | undefined;

  rangeDates: Date[] | undefined;
  aux: any[]=[];

  idProgramacionFecha!: number;
  idProgramacionCapacitacion!: number;
  employeeForm: FormGroup;
  hoy = new Date();
  fechaStart: Date = this.hoy;
  sourceEmpleados!: Empleado[];
  targetEmpleados!: Empleado[];
  //Capacitacoiones Programadas
  capacitacionesprogramadas: CapacitacionProgramada[]=[];
  //Capacitaciones programadas con las fechas
  capacitacionesFechas: CapacitacionProgramada[]=[];

  /*capacitaciones: CapacitacionCatalogo[] = [];
  capacitacionesFiltradas: CapacitacionCatalogo[] = [];*/
  capacitacionesFiltrada: string = '';
  NombreCapacitaciones: string[] =[];
  minDate: Date | undefined;
  capacitacionSeleccionada: any;
    filteredCapacitaciones!: any[];

    checked: boolean = false;

    selectedFrecuencia: string = 'Seleccion de Dias';
    frecuencias: string[]=[
      'Seleccion de Dias',
      'Seleccion Dia Inicio y Dia Fin'
    ];
    
    origen: string[]=[
      'Interna', 'Externa'
    ];
  constructor(private route: ActivatedRoute, private capacitacionesService: CapacitacionService,
    private fb: FormBuilder, private confirmationService: ConfirmationService, private messageService: MessageService,
    private router: Router
  ){

    this.employeeForm = this.fb.group({
      Color:['', Validators.required],
      Evaluacion:[''],
      NombreCapacitacion:['', Validators.required],
      Origen:['', Validators.required],
      Frecuencia:['', Validators.required],
      PersonaImparte:[''],
      Comentarios:[''],
      Fecha: [''],
      FechaRango: [''],
      FechaInicio: [''],
      FechaFin: [''],
      HoraInicio: [''],
      HoraFin: ['']
    });


  }
  ngOnInit(): void {

    this.employeeForm.get('Frecuencia')?.valueChanges.subscribe(value => {
      this.selectedFrecuencia = value;
      this.updateFechaFieldsVisibility();
    });
    this.updateFechaFieldsVisibility();

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('IdProgramacionCapacitacion')){
        this.idProgramacionCapacitacion = Number(paramMap.get('IdProgramacionCapacitacion'));
        
      }
    });

    

    this.capacitacionesService.getFechasProgramaciones(this.idProgramacionCapacitacion).subscribe({
      next: (data) => {
        this.capacitacionesprogramadas = data;

       // console.log(this.capacitacionesprogramadas);
       


        if(this.capacitacionesprogramadas.length>0){
          //this.idProgramacionCapacitacion = Number(this.capacitacionesprogramadas[0].IdProgramacionCapacitacion);
          


          this.employeeForm.patchValue({
            Color: this.capacitacionesprogramadas[0].Color,
            Evaluacion: this.capacitacionesprogramadas[0].Evaluacion,
            NombreCapacitacion: this.capacitacionesprogramadas[0].NombreCapacitacion,
            Origen: this.capacitacionesprogramadas[0].Origen,
            Frecuencia: this.capacitacionesprogramadas[0].Frecuencia,
            PersonaImparte: this.capacitacionesprogramadas[0].PersonaImparte,
            Comentarios: this.capacitacionesprogramadas[0].Comentarios,
            /*Fecha: '2024-08-31T00:00:00.000Z',
            FechaRango: null,
            FechaInicio: null,
            FechaFin: null,
            HoraInicio: null,
            HoraFin: null,*/
            });

          

          if(this.capacitacionesprogramadas[0].Fecha!=null){



            this.dates = this.capacitacionesprogramadas.map(fecha => 
              //new Date(new Date(fecha.Fecha))
              new Date(this.zonahoraria(fecha.Fecha))
            );
            

           // console.log(this.dates);

           // console.log('HOLA',this.capacitacionesprogramadas);


          }else{
  
            this.rangeDates = [
              this.zonahoraria(this.capacitacionesprogramadas[0].FechaInicio),
              this.zonahoraria(this.capacitacionesprogramadas[0].FechaFin)
            ];
  
           //console.log(this.rangeDates);
   
          }

        }else{
          this.router.navigate(['system/consultarcapacitaciones']);
        }
        
       


        /*const convertedDates = this.rangeDates.map(dateString => {
          const date = new Date(dateString);
          return date.toString();
      });

      console.log(convertedDates);

        this.employeeForm.patchValue({
          FechaRango: convertedDates
        })*/
      
        /*this.employeeForm.patchValue({
          FechaInicio: this.getFechaConDiaMas(this.capacitacionesprogramadas[0].FechaInicio),
          HoraInicio: this.getFechaConDiaMas(this.capacitacionesprogramadas[0].HoraInicio),
          HoraFin: this.getFechaConDiaMas(this.capacitacionesprogramadas[0].HoraFin)
            });*/
            
            //console.log(this.employeeForm.value);
            

      },
      error: (error) => {
        console.error('Error al cargar las Capacitaciones', error);
      }
    });
  }

  updateFechaFieldsVisibility() {
    if (this.selectedFrecuencia === 'Seleccion de Dias') {
      this.employeeForm.get('FechaRango')?.reset();
      this.rangeDates = undefined;
    }
    if (this.selectedFrecuencia === 'Seleccion Dia Inicio y Dia Fin') {
      this.employeeForm.get('Fecha')?.reset();
      this.dates = undefined;
    }
  }

  

  onSubmit(){

    if(this.employeeForm.valid){
      this.confirmationService.confirm({
        message: '¿Esta Seguro que quiere actualizar la Capacitación?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        rejectButtonStyleClass: "p-button-text",
        accept: () => {

          
          if(this.employeeForm.value.FechaInicio == ''){
            this.employeeForm.patchValue({
              FechaInicio: null
            });
          };
          if(this.employeeForm.value.FechaFin == ''){
            this.employeeForm.patchValue({
              FechaFin: null
            });
          };


          //if(this.employeeForm.value.HoraInicio == ''){}

          if(this.dates == undefined && this.rangeDates==undefined){
            this.messageService.add({ severity: 'warn', summary: 'Precaucion', detail: 'No hay fechas Seleccionadas' });
          }else{

            //console.log(this.employeeForm.value, this.dates, this.rangeDates);

            //AQUI /actualizarfechasrango/:id'
            this.capacitacionesService.updateCapacitacion(this.idProgramacionCapacitacion,this.employeeForm.value).subscribe({
              next: (resp: any) => {
                //alert('Actualizo con Exito');

               // console.log(this.dates);
            
            if(this.dates!=undefined){
              //this.rangeDates=undefined;
              //alert('Entro en fechas');
          +
              //console.log(this.dates.length);
              

              this.dates?.forEach(element => {

                this.capacitacionesService.updateFechasCapacitacion(this.idProgramacionCapacitacion,element).subscribe({
                  next: (resp: any) => {
                    //this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Capacitacion Agregada Exitosamente' });
                },
                error: (err: any) => {
                    console.log(err);
                }
                });


              });
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Capacitacion Agregada Exitosamente' });
              //this.limpiar();
            }

            if(this.rangeDates!=undefined){
              //this.dates=undefined;
                //console.log(this.rangeDates[0], this.rangeDates[1]);

              
                //console.log(this.employeeForm.value);
                this.capacitacionesService.updateFechasRangoCapacitacion(this.idProgramacionCapacitacion,this.rangeDates[0], this.rangeDates[1]).subscribe({
                  next: (resp: any) => {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Capacitacion Agregada Exitosamente' });
                    //this.limpiar();
          
                },
                error: (err: any) => {
                    window.alert(err);
                    //this.rangeDates = undefined;
                    //this.limpiar();
                }
                });
              
            }

                //console.log(resp);

            },
            error: (err: any) => {
                console.log(err);
            }
            });



          
            

            
            


          
            
          }
          
        

        
  
          //console.log(this.getFecha(this.employeeForm.value.FechaInicio));
          /*console.log(this.employeeForm.value);
          console.log(this.employeeForm.value.FechaRango);*/

  
          
          /*this.capacitacionesService.updateCapacitacion(this.idProgramacionCapacitacion, this.employeeForm.value).subscribe({
            next: (data) => {
              this.messageService.add({ severity: 'success', summary: 'Actualización', detail: 'Actualizada Exitosamente', life: 1500 });
            },
            error: (error) => {
              console.error('Error al cargar las Capacitaciones', error);
            }
          });*/
  
        },
        reject: () => {
           
        }

        
    });
    
    }else{
      this.messageService.add({ severity: 'warn', summary: 'Completa Campos', detail: 'Faltan campos por llenar' });
    }

    

   

  }

  getFecha(fecha: Date): any {
    const newfech = new Date(fecha)
     return newfech;
   }

   limpiar(){
    this.employeeForm.reset({
      NombreCapacitacion:'',
        Origen:'',
        Frecuencia:'',
        Fecha:null,
        FechaInicio: null,
        FechaFin: null,
        HoraInicio: null,
        HoraFin: null,
        //HoraInicio:[''],
        Imparte:'',
        Comentarios:''
    });

  }

  zonahoraria(fecha: Date): Date {
    const fechaReporte = new Date(fecha); // Recibe la fecha del servidor
  return new Date(fechaReporte.getTime() + fechaReporte.getTimezoneOffset() * 60000); 
  }
  

}
