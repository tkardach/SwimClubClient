import { Component, OnInit, Input } from '@angular/core';
import { ScheduleTimeslot } from '../schedules.service';

@Component({
  selector: 'app-timeslot-view',
  templateUrl: './timeslot-view.component.html',
  styleUrls: ['./timeslot-view.component.css']
})
export class TimeslotViewComponent implements OnInit {
  private _timeslot: ScheduleTimeslot = null;

  startTime: string = "00:00";
  endTime: string = "00:00";
  maxOccupants: number = 1;
  timeslotType: string = "family";

  @Input('timeslot') set timeslot(value: ScheduleTimeslot) {
    this._timeslot = value; 
    this.startTime = this.convertTimeToString(value.start);
    this.endTime = this.convertTimeToString(value.end);
  }
  get timeslot() { return this._timeslot; }

  @Input('edit') edit: boolean = false;

  constructor() { 
    this._timeslot = {
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

    let hour = time / 100;
    let minute = time % 100;
    
    return `${hour % 12}:${minute == 0 ? "00":minute}`;
  }

  convertStringToTime(time: string): number {
    return Number(time.replace(':', ''));
  }

  onConfirmChanges() {
    this.edit = false;
    if (this._timeslot === null)
      return;
    
    this._timeslot.start = this.convertStringToTime(this.startTime);
    this._timeslot.end = this.convertStringToTime(this.endTime);
    this._timeslot.maxOccupants = this.maxOccupants;
    this._timeslot.type = this.timeslotType;
  }

  onEnterEditMode() {
    this.edit = true;
  }
}
