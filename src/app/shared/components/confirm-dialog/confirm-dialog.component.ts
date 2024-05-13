import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';



@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [
    MatDialogModule
  ],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {

}
