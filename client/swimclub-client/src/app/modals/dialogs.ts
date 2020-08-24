import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface ConfirmationDialogData {
  title: string,
  content: string,
  confirmText: string,
  closeText: string
}

@Component({
  selector: 'confirmation-dialog',
  templateUrl: './confirmation/confirmation-dialog.html',
  styleUrls: ['./confirmation/confirmation-dialog.css']
})
export class ConfirmationDialog {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData) {

    }
}