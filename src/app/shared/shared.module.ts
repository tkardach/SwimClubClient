import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerOverlayComponent } from './spinner-overlay/spinner-overlay.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    SpinnerOverlayComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    SpinnerOverlayComponent
  ]
})
export class SharedModule { }
