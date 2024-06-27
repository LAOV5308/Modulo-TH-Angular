import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reclutamiento',
  standalone: true,
  imports: [
    MatAutocompleteModule,
    MatInputModule,
    FormsModule, ReactiveFormsModule,CommonModule
  ],
  templateUrl: './reclutamiento.component.html',
  styleUrl: './reclutamiento.component.css'
})
export class ReclutamientoComponent{

}
