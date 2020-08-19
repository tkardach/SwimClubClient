import { Component, OnInit, Input } from '@angular/core';
import { Schedule, ScheduleTimeslot } from '../schedules.service';

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.css']
})
export class CreateScheduleComponent implements OnInit {
  @Input() schedule: Schedule = null; 

  invalidDays: boolean = false;
  invalidDate: boolean = false;

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
      timeslots: [] as ScheduleTimeslot[]
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

  resetValidation() {
    this.invalidDays = false;
    this.invalidDate = false;
  }

  invalid() {
    return this.invalidDate || this.invalidDate;
  }

  onSubmit() {
    this.resetValidation();
    if (!this.monday && !this.tuesday && !this.wednesday && !this.thursday && 
        !this.friday && !this.saturday && !this.sunday) {
      this.invalidDays = true;
    }
    if (this.date === null) {
      this.invalidDate = true;
    }
    if (this.invalid()) return;
  }

  deleteTimeslot(index: number) {
    if (index < 0 || index >= this.schedule.timeslots.length) 
      return;
    
    this.schedule.timeslots.splice(index, 1);
  }
}
