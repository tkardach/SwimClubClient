import { Component, OnInit, Input, Output } from '@angular/core';
import { ScheduleTimeslot } from '../schedules.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-timeslot-view',
  templateUrl: './timeslot-view.component.html',
  styleUrls: ['./timeslot-view.component.css']
})
export class TimeslotViewComponent implements OnInit {

  set startTime(value: string) {
    this.timeslot.start = this.convertStringToTime(value);
  }
  get startTime(): string {
    return this.convertTimeToString(this.timeslot.start);
  }

  set endTime(value: string) {
    this.timeslot.end = this.convertStringToTime(value);
  }
  get endTime(): string {
    return this.convertTimeToString(this.timeslot.end);
  }

  set maxOccupants(value: number) {
    this.timeslot.maxOccupants = value;
  }
  get maxOccupants(): number {
    return this.timeslot.maxOccupants;
  }

  set timeslotType(value: string) {
    this.timeslot.type = value;
  }
  get timeslotType(): string {
    return this.timeslot.type;
  }

  @Input() timeslot: ScheduleTimeslot;
  @Output() timeslotChange = new EventEmitter<ScheduleTimeslot>();

  @Output() onDelete = new EventEmitter();

  @Input() edit: boolean = false;

  @Input() editMode: boolean = true;

  constructor() { 
    this.timeslot = {
      start: 0,
      end: 0,
      maxOccupants: 1,
      type: 'Family'
    }
  }

  ngOnInit(): void {
  }
  
  militaryTimeToString(time: number): string {
    if (time < 0 || time >= 2400) return "Invalid Time"

    let hour = time / 100;
    let minute = time % 100;

    return `${hour % 12}:${minute == 0 ? "00":minute} ${hour >= 12 ? "PM":"AM"}`
  }  

  convertTimeToString(time: number): string {
    if (time < 0 || time >= 2400) return "Invalid Time"

    let hour = Math.floor(time / 100);
    let minute = time % 100;
    
    return `${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}`:minute}`;
  }

  convertStringToTime(time: string): number {
    return Number(time.replace(':', ''));
  }

  onConfirmChanges() {
    this.edit = false;
    if (this.timeslot === null)
      return;
    
    this.timeslot.start = this.convertStringToTime(this.startTime);
    this.timeslot.end = this.convertStringToTime(this.endTime);
    this.timeslot.maxOccupants = this.maxOccupants;
    this.timeslot.type = this.timeslotType;
    this.timeslotChange.emit(this.timeslot);
  }

  onEnterEditMode() {
    this.edit = true;
  }
}
