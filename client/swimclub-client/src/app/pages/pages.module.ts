import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllSchedulesComponent } from './all-schedules/all-schedules.component';
import { SchedulesModule } from '../schedules/schedules.module';
import { CreateSchedulePageComponent } from './create-schedule-page/create-schedule-page.component';

@NgModule({
  declarations: [
    AllSchedulesComponent,
    CreateSchedulePageComponent
  ],
  imports: [
    CommonModule,
    SchedulesModule
  ],
  exports: [
    AllSchedulesComponent,
    CreateSchedulePageComponent
  ]
})
export class PagesModule { }
