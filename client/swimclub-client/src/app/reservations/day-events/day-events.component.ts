import { Component, Input, OnInit } from '@angular/core';
import { weekdayToString, compareDate, getValidDate } from '../../shared/utilities';
import { Event } from '../reservations.service';

@Component({
  selector: 'app-day-events',
  templateUrl: './day-events.component.html',
  styleUrls: ['./day-events.component.css']
})
export class DayEventsComponent implements OnInit {
  private _date: Date;
  @Input() set date(date: Date) {
    this._date = getValidDate(date);
  }
  get date(): Date {
    return this._date;
  }

  private _events: Array<Event>;
  @Input() set events(events: Array<Event>) {
    this._events = events;
    
    this._events
      .filter(event => compareDate(new Date(event.start.dateTime), this.date) === 0)
      .sort((a, b) => {
        let date = new Date(a.start.dateTime);
        let comp = new Date(b.start.dateTime);
        if (date < comp) return -1;
        else if (date > comp) return 1;
        else return 0;
      })
  }
  get events(): Array<Event> {
    return this._events;
  }

  constructor() { }

  ngOnInit(): void {
  }
  
  getWeekdayString() {
    return weekdayToString(this.date.getDay());
  }

  getDateString() {
    return this.date.toLocaleDateString();
  }
}
