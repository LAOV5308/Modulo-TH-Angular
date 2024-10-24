import { CommonModule, NgFor, NgIf } from '@angular/common';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Component, OnInit,Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';

import { ConfirmationService, MessageService } from 'primeng/api';

import { ActivatedRoute, ParamMap } from '@angular/router';

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
import { MatSelectModule } from '@angular/material/select';
import { Reporte } from '../../../../../backend/models/reporte.model';
import { ReportesService } from '../../../../../backend/services/reportes.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

//Fecha Español
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import {MAT_DATE_LOCALE, MatOptionModule} from '@angular/material/core';
import 'moment/locale/es';


@Component({
  selector: 'app-reportesnormativaupdate',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, MatButtonModule, MatCheckboxModule, CheckboxModule, MatFormFieldModule,
    MatInputModule, MatExpansionModule, MatTabsModule, MatIconModule, TableModule, ButtonModule, ToastModule, ConfirmDialogModule, MatSelectModule,
    MatDatepickerModule
  ],
  providers:[ConfirmationService, MessageService, ReportesService, provideMomentDateAdapter(),{provide: MAT_DATE_LOCALE, useValue: 'es-ES'}],
  templateUrl: './reportesnormativaupdate.component.html',
  styleUrl: './reportesnormativaupdate.component.css'
})
export class ReportesnormativaupdateComponent implements OnInit{
  IdReporte!: number;
  reportes: Reporte[]=[];

  Form: FormGroup;

  constructor(private _fb: FormBuilder, public dialogRef: MatDialogRef<ReportesnormativaupdateComponent>, private confirmationService: ConfirmationService, private messageService: MessageService,
    private route: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: {IdReporte: number}, private reportesService: ReportesService){
      this.Form = this._fb.group({
        NoNomina: [''],
        MotivoReporte: ['', Validators.required],
        PersonaReporto: ['', Validators.required],
        FechaReporte: ['', Validators.required],
        SancionAplicada: ['', Validators.required],
        NotasTalentoHumano:[''],
      });
  }

  ngOnInit(): void {
    this.IdReporte = this.data.IdReporte;
    console.log(this.IdReporte);
    this.reportesService.getReporte(this.IdReporte).subscribe({
      next:(data) =>{
        this.reportes = data;
        console.log(this.reportes);
        this.Form.patchValue(this.reportes[0]);

        const fechaReporte = new Date(this.reportes[0].FechaReporte); // Recibe la fecha del servidor
        const localDate = new Date(fechaReporte.getTime() + fechaReporte.getTimezoneOffset() * 60000);

        this.Form.controls['FechaReporte'].setValue(localDate);


        console.log(this.Form.value);

      },
      error:(error) =>{

      }
    })

    
  }

  updateReporte(){
    if(this.Form.valid){
      this.reportesService.updateReporte(this.IdReporte, this.Form.value).subscribe({
        next:(data)=>{
          console.log(data);
          this.cerrarDialogo();
        },
        error:(error)=>{
          console.log(error);
        },

      })
    }else{
      console.log('No Valido');
    }
    

  }


  cerrarDialogo(){
    this.dialogRef.close();
  }

}
