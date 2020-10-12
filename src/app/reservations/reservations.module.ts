import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationsCalendarComponent } from './reservations-calendar/reservations-calendar.component';
import { TimeslotComponent } from './timeslot/timeslot.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { EventComponent } from './event/event.component';
import { DayEventsComponent } from './day-events/day-events.component';



@NgModule({
  declarations: [
    ReservationsCalendarComponent, 
    TimeslotComponent, 
    EventComponent, 
    DayEventsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  exports: [
    ReservationsCalendarComponent,
    TimeslotComponent,
    EventComponent,
    DayEventsComponent
  ]
})
export class ReservationsModule { }
