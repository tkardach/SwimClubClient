import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface ConfirmationDialogData {
  title: string,
  content: string,
  confirmText: string,
  closeText: string,
  showClose: boolean
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

export interface MessageDialogData {
  content: string
}

@Component({
  selector: 'message-dialog',
  templateUrl: './message/message-dialog.html',
  styleUrls: ['./message/message-dialog.css']
})
export class MessageDialog {

  constructor(
    public dialogRef: MatDialogRef<MessageDialog>,
    @Inject(MAT_DIALOG_DATA) public data: MessageDialogData) {

    }
}

@Component({
  selector: 'reservation-confirmation-dialog',
  templateUrl: './reservation-confirmation/reservation-confirmation-dialog.html',
  styleUrls: ['./reservation-confirmation/reservation-confirmation-dialog.css']
})
export class ReservationConfirmationDialog {
  numberOfSwimmers: number = 1;

  constructor(
    public dialogRef: MatDialogRef<ReservationConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData) {}
}
