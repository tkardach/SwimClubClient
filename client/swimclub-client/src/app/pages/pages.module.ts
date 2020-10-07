import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllSchedulesComponent } from './all-schedules/all-schedules.component';
import { SchedulesModule } from '../schedules/schedules.module';
import { CreateSchedulePageComponent } from './create-schedule-page/create-schedule-page.component';
import { ModalsModule } from '../modals/modals.module';
import { MakeReservationsComponent } from './make-reservations/make-reservations.component';
import { ReservationsModule } from '../reservations/reservations.module';
import { AuthenticationModule } from '../authentication/authentication.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

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
    MaterialModule,
    FormsModule,
    ReservationsModule,
    AuthenticationModule,
    SharedModule
  ],
  exports: [
    AllSchedulesComponent,
    CreateSchedulePageComponent,
    MakeReservationsComponent
  ]
})
export class PagesModule { }
