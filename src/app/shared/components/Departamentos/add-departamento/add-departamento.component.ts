import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepartamentosService } from '../../../../../../backend/services/departamentos.service';
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

@Component({
  selector: 'app-add-departamento',
  standalone: true,
  imports: [  MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgFor,
  MatButtonModule],
    providers: [DepartamentosService, provideNativeDateAdapter(), CoreService],
  templateUrl: './add-departamento.component.html',
  styleUrl: './add-departamento.component.css'
})
export class AddDepartamentoComponent implements OnInit{
  Form: FormGroup;
  
  ngOnInit(): void {
    
  }
  constructor(
    private _fb: FormBuilder,
    private _departamentoService: DepartamentosService,
    private _dialogRef: MatDialogRef<AddDepartamentoComponent>,
    //@Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ){
    this.Form = this._fb.group({
      NombreDepartamento: '',
      NombreResponsable: ''
    });
  }

  onFormSubmit() {
    
    if (this.Form.valid) {
      this._departamentoService.addDepartamentos(this.Form.value).subscribe({
        next: (resp: any) => {
            this._coreService.openSnackBar('Departamento added successfully', resp);
  
            this._dialogRef.close(true);
        },
        error: (err: any) => {
            console.error('Error: ' + err);
            this._coreService.openSnackBar('Error al agregar departamento');
        }
    });
    }else{
      this._coreService.openSnackBar('Por favor, complete el formulario correctamente');
    }
}


}
