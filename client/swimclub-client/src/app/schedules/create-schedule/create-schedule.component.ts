import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Schedule, ScheduleTimeslot } from '../schedules.service';

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.css']
})
export class CreateScheduleComponent implements OnInit {
  @Input() schedules: Array<Schedule> = []; 
  @Output() schedulesChange = new EventEmitter<Array<Schedule>>();

  @Output() onSubmit = new EventEmitter();

  timeslots: Array<ScheduleTimeslot> = [];

  invalidDays: boolean = false;
  invalidDate: boolean = false;

  monday: boolean = false;
  tuesday: boolean = false;
  wednesday: boolean = false;
  thursday: boolean = false;
  friday: boolean = false;
  saturday: boolean = false;
  sunday: boolean = false;
  
  private date: Date = null;

  constructor() { }

  ngOnInit(): void {
  }

  onDateChange() {
    this.schedules.forEach(schedule => schedule.startDate = this.date);
  }

  addTimeslot() {
    const timeslot = {
      start: 0,
      end: 0,
      type: 'family',
      maxOccupants: 1 
    };
    this.timeslots.push(timeslot);
  }

  addSchedule(day: number) {
    const filtered = this.schedules.filter(schedule => schedule.day === day);
    if (filtered.length > 0) return;

    this.schedules.push({
      day: day,
      timeslots: this.timeslots,
      startDate: new Date(this.date)
    })
  }

  removeSchedule(day: number) {
    const filtered = this.schedules.filter(schedule => schedule.day === day);
    
    const index = this.schedules.indexOf(filtered[0])
    if (index < 0) return;

    this.schedules.splice(index, 1);
  }

  dayToggled(day: number) {
    let remove = false;
    switch(day) {
      case 0: 
        this.sunday = !this.sunday;
        remove = !this.sunday;
        break;
      case 1:
        this.monday = !this.monday;
        remove = !this.monday;
        break;
      case 2:
        this.tuesday = !this.tuesday;
        remove = !this.tuesday;
        break;
      case 3:
        this.wednesday = !this.wednesday;
        remove = !this.wednesday;
        break;
      case 4:
        this.thursday = !this.thursday;
        remove = !this.thursday;
        break;
      case 5:
        this.friday = !this.friday;
        remove = !this.friday;
        break;
      case 6:
        this.saturday = !this.saturday;
        remove = !this.saturday;
        break;
      default:
        return;
    }

    if (remove) return this.removeSchedule(day);
    this.addSchedule(day);
  }

  resetValidation() {
    this.invalidDays = false;
    this.invalidDate = false;
  }

  invalid() {
    return this.invalidDate || this.invalidDate;
  }

  submit() {
    this.resetValidation();
    if (!this.monday && !this.tuesday && !this.wednesday && !this.thursday && 
        !this.friday && !this.saturday && !this.sunday) {
      this.invalidDays = true;
    }
    if (this.date === null) {
      this.invalidDate = true;
    }
    if (this.invalid()) return;

    this.schedulesChange.emit(this.schedules);
    this.onSubmit.emit();
  }

  deleteTimeslot(index: number) {
    if (index < 0 || index >= this.timeslots.length) 
      return;
    
    this.timeslots.splice(index, 1);
  }
}
