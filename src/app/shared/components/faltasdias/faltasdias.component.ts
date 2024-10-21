import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { FaltasService } from '../../../../../backend/services/faltas.service';
import { Falta, FechaPagar } from '../../../../../backend/models/falta.model';
import {MatButtonModule} from '@angular/material/button';

import {MatDatepickerModule, MatDatepickerIntl} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, DateAdapter} from '@angular/material/core';
import 'moment/locale/es';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';


import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIcon, InputIconModule } from 'primeng/inputicon';

import { Table } from 'primeng/table';  
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-faltasdias',
  standalone: true,
  imports: [FormsModule,MatDatepickerModule, MatFormFieldModule, CommonModule, ReactiveFormsModule, MatInputModule, TableModule, ButtonModule,
    IconFieldModule, InputIconModule, InputTextModule, ButtonModule, MatButtonModule, RouterLink
  ],
  providers:[FaltasService, {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    provideMomentDateAdapter()
  ],
  templateUrl: './faltasdias.component.html',
  styleUrl: './faltasdias.component.css'
})
export class FaltasdiasComponent implements OnInit{
  IdFalta!: number;
  faltas: Falta[]=[];
  fechapagar!: Date | undefined;
  comentario: string='';
  fechaspagar: FechaPagar[]=[];
  @ViewChild('dt2') dt2!: Table;

  constructor(private faltasService: FaltasService, private route: ActivatedRoute, private router: Router){
   
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('IdFalta')){
        this.IdFalta = Number(paramMap.get('IdFalta'));
      }
    });

    this.faltasService.getFalta(this.IdFalta).subscribe({
      next:(data) =>{
        this.faltas = data;
        console.log(this.faltas);
      },
      error:(error) =>{
        console.log(error)
      },
    })

    this.faltasService.getfechaspagar(this.IdFalta).subscribe({
      next:(data) =>{
        this.fechaspagar = data;
        console.log(this.fechaspagar);
      },
      error:(error) =>{
        console.log(error)
      },
    })



    console.log(this.IdFalta);
  }
  


  filterTable(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.dt2.filterGlobal(inputElement.value, 'contains');
    }
  }

  agregarDia(){
    if(this.IdFalta && this.fechapagar){
      this.faltasService.addFechaPagar(this.IdFalta, this.fechapagar ,this.comentario).subscribe({
        next:(data) =>{
          console.log(data);
          this.fechapagar = undefined;
          this.comentario = ''
          this.ngOnInit();
        },
        error:(error) =>{
          console.log(error)
        },
      })
    }else{

    }
    
  }


  deletedia(IdFechaFalta: number){
    this.faltasService.deleteFaltaPagar(IdFechaFalta).subscribe({
      next:(data) =>{
        this.ngOnInit();
      },
      error:(error) =>{
        console.log(error)
      },
    })

  }
 

}
