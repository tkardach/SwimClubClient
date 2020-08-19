import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationsCalendarComponent } from './reservations-calendar/reservations-calendar.component';
import { TimeslotComponent } from './timeslot/timeslot.component';



@NgModule({
  declarations: [
    ReservationsCalendarComponent, 
    TimeslotComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ReservationsCalendarComponent,
    TimeslotComponent
  ]
})
export class ReservationsModule { }
