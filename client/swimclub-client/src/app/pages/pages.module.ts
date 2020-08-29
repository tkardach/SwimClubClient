import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllSchedulesComponent } from './all-schedules/all-schedules.component';
import { SchedulesModule } from '../schedules/schedules.module';
import { CreateSchedulePageComponent } from './create-schedule-page/create-schedule-page.component';
import { ModalsModule } from '../modals/modals.module';
import { MakeReservationsComponent } from './make-reservations/make-reservations.component';
import { ReservationsModule } from '../reservations/reservations.module';

@NgModule({
  declarations: [
    AllSchedulesComponent,
    CreateSchedulePageComponent,
    MakeReservationsComponent
  ],
  imports: [
    CommonModule,
    SchedulesModule,
    ModalsModule,
    ReservationsModule
  ],
  exports: [
    AllSchedulesComponent,
    CreateSchedulePageComponent,
    MakeReservationsComponent
  ]
})
export class PagesModule { }
