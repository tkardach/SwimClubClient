import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialog } from './dialogs';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    ConfirmationDialog
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ConfirmationDialog
  ]
})
export class ModalsModule { }
