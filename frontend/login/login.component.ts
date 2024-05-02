import { Component } from '@angular/core';
import { DataService } from '../../backend/ConexionDB/data.service';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule,
    MatToolbarModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 

}
