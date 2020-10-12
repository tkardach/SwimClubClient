import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialog, ConfirmationDialogData } from 'src/app/modals/dialogs';
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
    private _reservationService: ReservationsService,
    private _spinnerService: SpinnerOverlayService,
    public dialog: MatDialog
  ) 
  { 
  }

  ngOnInit(): void {
  }

  onEventRemoved(id: string) {
    const event: Event = this._events.find(event => event.id === id);

    let data: ConfirmationDialogData;

    if (!event) {
      data = {
        title: 'Event not found',
        content: 'The event could not be found. Try refreshing the page. If this does not work, contact the board for assistance.',
        confirmText: 'Ok',
        closeText: '',
        showClose: false
      }
      this.showConfirmDialog(data);
    } else if (new Date(event.start.dateTime) < new Date()) {
      data = {
        title: 'Cannot Delete Event',
        content: 'This Event has already passed, you may not remove it',
        confirmText: 'Ok',
        closeText: '',
        showClose: false
      }
      this.showConfirmDialog(data);
    } else {
      data = {
        title: 'Delete Reservation',
        content: 'Are you sure you want to delete this reservation?',
        confirmText: 'Yes',
        closeText: 'Cancel',
        showClose: true
      }
      this.confirmDeleteEvent(id, data);
    }
  }

  confirmDeleteEvent(id: string, data: ConfirmationDialogData) {

    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: data
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this._spinnerService.show();
        this._reservationService.deleteReservation(id)
          .then((message) => {
            console.log(message);
            this.showDeleteConfirmed("Reservation has been removed!");
          })
          .catch((error) => {
            console.log(error);
            this.showDeleteFailure(error.error.message)
          })
          .finally(() => {
            this._spinnerService.hide();
          });
      }
    });
  }
  
  showConfirmDialog(data: ConfirmationDialogData) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: data
    });
  }
  

  showDeleteConfirmed(message: string) {
    const data: ConfirmationDialogData = {
      title: 'Reservation Deleted!',
      content: message,
      confirmText: 'Ok',
      closeText: 'Close',
      showClose: false
    }

    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: data
    });

    dialogRef.afterClosed().subscribe(() => {
      window.location.reload();
    }) 
  }

  showDeleteFailure(message: string) {
    const data: ConfirmationDialogData = {
      title: 'Reservation was not removed!',
      content: message,
      confirmText: 'Ok',
      closeText: 'Close',
      showClose: false
    }

    this.dialog.open(ConfirmationDialog, {
      data: data
    });
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
