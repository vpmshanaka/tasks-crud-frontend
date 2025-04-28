import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

export interface ConfirmDeleteParams {
  id: number; 
  title: string;
}

@Component({
  selector: 'confirm-delete-dialog',
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './confirm-delete-dialog.component.html',
  styleUrl: './confirm-delete-dialog.component.scss',
})
export class ConfirmDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDeleteParams
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(): void {
    this.dialogRef.close(true);
  }
}
