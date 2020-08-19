import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Schedule, ScheduleTimeslot } from '../schedules.service';

@Component({
  selector: 'app-schedule-view',
  templateUrl: './schedule-view.component.html',
  styleUrls: ['./schedule-view.component.css']
})
export class ScheduleViewComponent implements OnInit {
  @Input() schedule: Schedule = null; 

  constructor() {
    this.schedule = {
      day: 0,
      startDate: new Date(),
      timeslots: [] as ScheduleTimeslot[]
    }
  }

  ngOnInit(): void {
  }

  getWeekdayString(num: number): string {
    switch(num) {
      case 0: return "Sunday";
      case 1: return "Monday";
      case 2: return "Tuesday";
      case 3: return "Wednesday";
      case 4: return "Thursday";
      case 5: return "Friday";
      case 6: return "Saturday";
      default: return "Unknown";
    }
  }

}
