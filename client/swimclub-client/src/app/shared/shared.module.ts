import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoverOverDirective } from './hover-over.directive';
import { SpinnerOverlayComponent } from './spinner-overlay/spinner-overlay.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    HoverOverDirective,
    SpinnerOverlayComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    HoverOverDirective,
    SpinnerOverlayComponent
  ]
})
export class SharedModule { }
