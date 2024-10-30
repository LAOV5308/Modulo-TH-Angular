import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-message-delete',
  standalone: true,
  imports: [MatButtonModule, FormsModule, MatInputModule, MatFormFieldModule,
    MatDividerModule
    ],
  templateUrl: './message-delete.component.html',
  styleUrl: './message-delete.component.css'
})
export class MessageDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<MessageDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

}
