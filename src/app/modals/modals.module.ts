import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialog, ReservationConfirmationDialog, MessageDialog, EventViewDialog } from './dialogs';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
import { ReservationsModule } from '../reservations/reservations.module';

const exports = [
  ConfirmationDialog,
  ReservationConfirmationDialog,
  ModalComponent,
  MessageDialog,
  EventViewDialog
]

@NgModule({
  declarations: [
    ...exports
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReservationsModule
  ],
  exports: [
    ...exports
  ]
})
export class ModalsModule { }
