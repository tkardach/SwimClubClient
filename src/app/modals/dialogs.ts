import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Event } from '../reservations/reservations.service';
import { groupEventsByDate, sortEventList } from '../reservations/shared/utilities';
import { compareDate, getValidDate, weekdayToString } from '../shared/utilities';


export interface ConfirmationDialogData {
  title: string,
  content: string,
  confirmText: string,
  closeText: string,
  showClose: boolean
}

@Component({
  selector: 'confirmation-dialog',
  templateUrl: './confirmation/confirmation-dialog.html',
  styleUrls: ['./confirmation/confirmation-dialog.css']
})
export class ConfirmationDialog {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData) {

    }
}

export interface MessageDialogData {
  content: string
}

@Component({
  selector: 'message-dialog',
  templateUrl: './message/message-dialog.html',
  styleUrls: ['./message/message-dialog.css']
})
export class MessageDialog {

  constructor(
    public dialogRef: MatDialogRef<MessageDialog>,
    @Inject(MAT_DIALOG_DATA) public data: MessageDialogData) {

    }
}

@Component({
  selector: 'reservation-confirmation-dialog',
  templateUrl: './reservation-confirmation/reservation-confirmation-dialog.html',
  styleUrls: ['./reservation-confirmation/reservation-confirmation-dialog.css']
})
export class ReservationConfirmationDialog {
  numberOfSwimmers: number = 1;

  constructor(
    public dialogRef: MatDialogRef<ReservationConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData) {}
}

export class EventViewDialogData {
  events: Array<Event>
}

@Component({
  selector: 'event-view-dialog',
  templateUrl: './event-view/event-view-dialog.html',
  styleUrls: ['./event-view/event-view-dialog.css']
})
export class EventViewDialog {
  @Output() deleteEvent = new EventEmitter<Event>();

  sortedDays: [string, Event[]][];

  constructor(
    public dialogRef: MatDialogRef<EventViewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: EventViewDialogData) {
      let events = data.events;

      if (events) {
        const groupedEvents = groupEventsByDate(events);

        const days: [string, Event[]][] = Object.entries(groupedEvents);

        const sortDays = (keyValue1: [string, Event[]], keyValue2: [string, Event[]]) => {
          const date1 = getValidDate(keyValue1[0]);
          const date2 = getValidDate(keyValue2[0]);

          return compareDate(date1, date2);
        }

        this.sortedDays = days.sort(sortDays);
        for (let i=0; i<this.sortedDays.length; i++) {
          this.sortedDays[i][1] = sortEventList(this.sortedDays[i][1])
        }
      }
    }

  getDateString(dateStr: string) {
    const date = getValidDate(dateStr);
    return `${weekdayToString(date.getDay())}, ${date.toLocaleDateString()}`
  }

  onDelete(event: Event) {
    this.deleteEvent.emit(event);
  }
}
