import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Schedule } from '../schedules.service';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent implements OnInit {
  @Input() schedules: Array<Schedule> = null;

  @Output() removeSchedule = new EventEmitter<number>();
  @Output() save = new EventEmitter<number>();
  @Output() addTimeslot = new EventEmitter<number>();

  constructor() { }

  ngOnInit():void {
  }

  onSave(index: number) {
    this.save.emit(index);
  }

  onRemove(index: number) {
    this.removeSchedule.emit(index);
  }

  onAddTimeslot(index: number) {
    this.addTimeslot.emit(index);
  }
}
