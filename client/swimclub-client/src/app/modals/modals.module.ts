import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialog, ReservationConfirmationDialog } from './dialogs';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ConfirmationDialog,
    ReservationConfirmationDialog
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  exports: [
    ConfirmationDialog,
    ReservationConfirmationDialog
  ]
})
export class ModalsModule { }
