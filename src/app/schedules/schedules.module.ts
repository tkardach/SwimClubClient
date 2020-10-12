import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateScheduleComponent } from './create-schedule/create-schedule.component';
import { ScheduleViewComponent } from './schedule-view/schedule-view.component';
import { TimeslotViewComponent } from './timeslot-view/timeslot-view.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';



@NgModule({
  declarations: [
    CreateScheduleComponent,
    ScheduleViewComponent,
    TimeslotViewComponent,
    ScheduleListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    SharedModule
  ],
  exports: [
    CreateScheduleComponent,
    ScheduleViewComponent,
    TimeslotViewComponent,
    ScheduleListComponent
  ]
})
export class SchedulesModule { }
