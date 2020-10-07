import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialog, ReservationConfirmationDialog } from './dialogs';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';



@NgModule({
  declarations: [
    ConfirmationDialog,
    ReservationConfirmationDialog,
    ModalComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  exports: [
    ConfirmationDialog,
    ReservationConfirmationDialog,
    ModalComponent
  ]
})
export class ModalsModule { }
