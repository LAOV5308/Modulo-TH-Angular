import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepartamentosService } from '../../../../../../backend/ConexionDB/departamentos.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import {provideNativeDateAdapter} from '@angular/material/core';
import { NgFor } from '@angular/common';
import { CoreService } from '../../../../Core/core.service';
import {MatButtonModule} from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CatalogoCapacitacionServiceService } from '../../../../../../backend/ConexionDB/catalogocapacitacion.service';

@Component({
  selector: 'app-update-capacitacion-catalogo',
  standalone: true,
  imports: [ MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgFor,
  MatButtonModule, HttpClientModule],
    providers: [CatalogoCapacitacionServiceService, provideNativeDateAdapter(), CoreService],
  templateUrl: './update-capacitacion-catalogo.component.html',
  styleUrl: './update-capacitacion-catalogo.component.css'
})
export class UpdateCapacitacionCatalogoComponent implements OnInit {
  Form: FormGroup;
  
  ngOnInit(): void {
    
  }
  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<UpdateCapacitacionCatalogoComponent>,
    private _catalogoCapacitacionesService: CatalogoCapacitacionServiceService,
    //@Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ){
    this.Form = this._fb.group({
      CodigoCapacitacion: ['', Validators.required],
      NombreCapacitacion: ['', Validators.required],
      Origen: [''],
      Estatus: [''],
      TipoCapacitacion:[''],
      Duracion:['']
    });
  }

  //Opciones de Eleccion
  Origen: string[] = [
    'Obligatoria', 'Planeada'
  ];
  Estatus: string[] = [
    'Programada', 'No Programada'
  ];
  TipoCapacitacion: string[] = [
    'Interna', 'Externa'
  ];
  Duracion: number[] = [
    1,2,3,4,5,6
  ];

  onFormSubmit() {
    
    if (this.Form.valid) {
      this._catalogoCapacitacionesService.updateCatalogoCapacitacion


      this._catalogoCapacitacionesService.addCatalogoCapacitacion(this.Form.value).subscribe({
        next: (resp: any) => {
            this._coreService.openSnackBar('Agregado al Catalogo successfully', resp);
  
            this._dialogRef.close(true);
        },
        error: (err: any) => {
            console.error('Error: ' + err);
            this._coreService.openSnackBar('Error al agregarlo');
        }
    });
    }else{
      this._coreService.openSnackBar('Por favor, complete el formulario correctamente');
    }
}


}
