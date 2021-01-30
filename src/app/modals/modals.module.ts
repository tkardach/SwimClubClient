import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialog, ReservationConfirmationDialog, MessageDialog } from './dialogs';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';

const exports = [
  ConfirmationDialog,
  ReservationConfirmationDialog,
  ModalComponent,
  MessageDialog
]

@NgModule({
  declarations: [
    ...exports
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  exports: [
    ...exports
  ]
})
export class ModalsModule { }
