import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Schedule, ScheduleTimeslot } from '../schedules.service';

@Component({
  selector: 'app-schedule-view',
  templateUrl: './schedule-view.component.html',
  styleUrls: ['./schedule-view.component.css']
})
export class ScheduleViewComponent implements OnInit {
  @Input() schedule: Schedule = null; 
  @Input() editMode: boolean = false;

  @Output() remove = new EventEmitter();
  @Output() save = new EventEmitter();
  @Output() addTimeslot = new EventEmitter();

  constructor() {
    this.schedule = {
      _id: '',
      day: 0,
      startDate: new Date(),
      timeslots: [] as ScheduleTimeslot[]
    }
  }

  ngOnInit(): void {
  }

  getDateString(date: Date) {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
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

  onSave() {
    this.save.emit();
  }

  onRemove() {
    this.remove.emit();
  }

  deleteTimeslot(index: number) {
    this.schedule.timeslots.splice(index, 1);
  }
}
