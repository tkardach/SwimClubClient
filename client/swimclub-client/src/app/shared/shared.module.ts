import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoverOverDirective } from './hover-over.directive';



@NgModule({
  declarations: [
    HoverOverDirective,
    
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HoverOverDirective
  ]
})
export class SharedModule { }
