import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialog, ConfirmationDialogData } from 'src/app/modals/dialogs';
import { ReservationWorkflowService } from 'src/app/reservations/reservation-workflow.service';
import { Event, ReservationsService } from 'src/app/reservations/reservations.service';
import { SpinnerOverlayService } from 'src/app/shared/spinner-overlay.service';
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
    private _reservationWorkflow: ReservationWorkflowService,
    public dialog: MatDialog
  ) 
  { 
  }

  ngOnInit(): void {
    this._reservationWorkflow.reservationDeleted.subscribe(
      done => window.location.reload()
    )
  }

  onEventRemoved(id: string) {
    const event: Event = this._events.find(event => event.id == id);
    this._reservationWorkflow.onEventRemoved(event);
  }

  filterEventsByDay(events: Array<Event>): Array<Array<Event>> {
    if (events.length === 0) return;
    
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
