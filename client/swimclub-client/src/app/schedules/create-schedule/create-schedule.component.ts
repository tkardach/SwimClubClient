import { Component, OnInit, Input } from '@angular/core';
import { Schedule, ScheduleTimeslot } from '../schedules.service';

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.css']
})
export class CreateScheduleComponent implements OnInit {
  @Input('schedule') schedule: Schedule = null; 

  constructor() {
    this.schedule = {
      day: 0,
      startDate: new Date(),
      timeslots: [] as ScheduleTimeslot[],
      maxFamilyReservations: 1,
      maxLapReservations: 1
    } }

  ngOnInit(): void {
  }

  addTimeslot() {
    const timeslot = {
      start: 0,
      end: 0,
      type: 'family',
      maxOccupants: 1 
    };
    this.schedule.timeslots.push(timeslot);
  }
}
