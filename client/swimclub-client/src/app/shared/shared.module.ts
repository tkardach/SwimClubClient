import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { HoverOverDirective } from './hover-over.directive';



@NgModule({
  declarations: [
    DatepickerComponent,
    HoverOverDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DatepickerComponent,
    HoverOverDirective
  ]
})
export class SharedModule { }
