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


@Component({
  selector: 'app-add-empleado',
  standalone: true,
  imports: [MatFormFieldModule,
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
    MatCardModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-empleado.component.html',
  styleUrl: './add-empleado.component.css'
})
export class AddEmpleadoComponent implements OnInit {
  employeeForm: FormGroup;

  constructor(private fb: FormBuilder) { 
    this.employeeForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      // Define otros controles de formulario aquí
      noNomina: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
      beneficiario: ['', Validators.required],
      // Añadir más controles de formulario aquí
    });
  }

  ngOnInit(): void {
    
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      console.log(this.employeeForm.value);
    }

}
}
