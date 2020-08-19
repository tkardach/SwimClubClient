import { Component, OnInit, Input } from '@angular/core';
import { Schedule } from '../schedules.service';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent implements OnInit {
  @Input() schedules: Array<Schedule> = null;

  constructor() { }

  ngOnInit():void {
  }
}
