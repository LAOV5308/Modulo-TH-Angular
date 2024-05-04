import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';  // Importante para manejar la navegación

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
