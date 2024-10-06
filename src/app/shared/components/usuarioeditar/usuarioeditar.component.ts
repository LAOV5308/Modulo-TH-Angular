import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../../backend/services/auth.service';


import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CheckboxModule } from 'primeng/checkbox';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import { Role } from '../../../../../backend/models/user.model';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-usuarioeditar',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgIf, NgFor,
    CommonModule, FormsModule, ReactiveFormsModule,MatButtonModule,RouterLink,CheckboxModule, MatCheckboxModule, MatFormFieldModule,
    MatInputModule, MatExpansionModule, MatTabsModule, MatIconModule, TableModule, ButtonModule,
    ToastModule, ConfirmDialogModule
  ],
  providers:[AuthService, ConfirmationService, MessageService],
  templateUrl: './usuarioeditar.component.html',
  styleUrl: './usuarioeditar.component.css'
})
export class UsuarioeditarComponent implements OnInit{
  IdUser!: number;

  constructor(private usuariosService: AuthService, private confirmationService: ConfirmationService, private messageService: MessageService,
    private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('IdUser')){
        this.IdUser = Number(paramMap.get('IdUser'));
      }
    });
    
    console.log(this.IdUser);
  }

}
