import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Timeslot } from '../reservations.service';
import {militaryTimeToString} from '../../shared/utilities';

@Component({
  selector: 'app-timeslot',
  templateUrl: './timeslot.component.html',
  styleUrls: ['./timeslot.component.css']
})
export class TimeslotComponent implements OnInit {
  @Input() timeslot: Timeslot = null;

  constructor() { 
    this.timeslot = {
      vacant: true,
      maxOccupants: 3,
      start: 1100,
      end: 1200,
      type: 'family'
    }
  }

  ngOnInit(): void {
  }

  durationString(): string {
    const start = militaryTimeToString(this.timeslot.start);
    const end = militaryTimeToString(this.timeslot.end);
    if (this.timeslot.type === 'blocked')
      return `${start} to ${end} (blocked)`;
    if (this.timeslot.type === 'lessons')
      return `${start} to ${end} (lessons)`;
    else
      return `${start} to ${end}`;
  }
}
