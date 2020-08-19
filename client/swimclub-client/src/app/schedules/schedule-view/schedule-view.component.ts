import { Component, OnInit, Input } from '@angular/core';
import { Schedule, ScheduleTimeslot } from '../schedules.service';

@Component({
  selector: 'app-schedule-view',
  templateUrl: './schedule-view.component.html',
  styleUrls: ['./schedule-view.component.css']
})
export class ScheduleViewComponent implements OnInit {
  @Input('schedule') schedule: Schedule = null; 

  invalidDays: boolean = false;

  monday: boolean = false;
  tuesday: boolean = false;
  wednesday: boolean = false;
  thursday: boolean = false;
  friday: boolean = false;
  saturday: boolean = false;
  sunday: boolean = false;
  
  date: Date = null;

  constructor() {
    this.schedule = {
      day: 0,
      startDate: new Date(),
      timeslots: [] as ScheduleTimeslot[],
      maxFamilyReservations: 1,
      maxLapReservations: 1
    }
  }

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

  onSubmit() {
    console.log()
    this.invalidDays = false;
    if (!this.monday && !this.tuesday && !this.wednesday && !this.thursday && 
        !this.friday && !this.saturday && !this.sunday) {
      this.invalidDays = true;
      return;
    }
  }
}
