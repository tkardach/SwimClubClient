import { Component, Input, OnInit } from '@angular/core';
import { Event, ReservationsService } from 'src/app/reservations/reservations.service';
import { compareDate, dateDiffDays } from 'src/app/shared/utilities';

@Component({
  selector: 'app-events-view',
  templateUrl: './events-view.component.html',
  styleUrls: ['./events-view.component.css']
})
export class EventsViewComponent implements OnInit {

  private _events = [];
  @Input() set events(events: Array<Event>) {
    this._events = events;
    if (events)
      this.daysEvents = this.filterEventsByDay(this._events);
  }
  get events(): Array<Event> {
    return this._events;
  }

  daysEvents: Array<Array<Event>>;

  constructor(
    private _reservationService: ReservationsService
  ) 
  { }

  ngOnInit(): void {
  }

  filterEventsByDay(events: Array<Event>): Array<Array<Event>> {
    const minEvent = events.reduce((min, event) => {
      let start = new Date(event.start.dateTime);
      let minStart = new Date(min.start.dateTime);
      return start < minStart ? event : min;
    });
    const maxEvent = events.reduce((max, event) => {
      let start = new Date(event.start.dateTime);
      let maxStart = new Date(max.start.dateTime);
      return start > maxStart ? event : max;
    })

    const minDate = new Date(minEvent.start.dateTime);
    const maxDate = new Date(maxEvent.start.dateTime);

    const diffDays = dateDiffDays(minDate, maxDate);

    const ret: Array<Array<Event>> = [];
    for (let i=0, j=minDate; i<=diffDays; i++, j.setDate(j.getDate() + 1)) {
      ret.push(events.filter((event) => compareDate(new Date(event.start.dateTime), j) === 0))
    }

    return ret.filter((arr) => arr.length > 0);
  }
}
