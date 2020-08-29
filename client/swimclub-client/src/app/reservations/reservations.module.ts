import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationsCalendarComponent } from './reservations-calendar/reservations-calendar.component';
import { TimeslotComponent } from './timeslot/timeslot.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ReservationsCalendarComponent, 
    TimeslotComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  exports: [
    ReservationsCalendarComponent,
    TimeslotComponent
  ]
})
export class ReservationsModule { }
