import { Component, OnInit } from '@angular/core';
import { SchedulesService } from 'src/app/schedules/schedules.service';
import { Timeslot, ReservationsService, PostTimeslot } from 'src/app/reservations/reservations.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialog, ReservationConfirmationDialog, ConfirmationDialogData } from 'src/app/modals/dialogs';
import { militaryTimeToString } from '../../shared/utilities';

@Component({
  selector: 'app-make-reservations',
  templateUrl: './make-reservations.component.html',
  styleUrls: ['./make-reservations.component.css']
})
export class MakeReservationsComponent implements OnInit {
  selectedDate: Date;
  timeslots: Array<Timeslot>;

  constructor(
    private _schedulesService: SchedulesService,
    private _reservationService: ReservationsService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  getTimeslotsForDate() {
    this._schedulesService.getTimeslotsForDate(this.selectedDate)
      .then((result) => {
        this.timeslots = result;
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onSelectedDateChange() {
    this.getTimeslotsForDate();
  }

  onTimeslotClicked(timeslot: Timeslot) {
    const message = `Confirm reservation for ${this.selectedDate.toLocaleDateString()} ` +
    `from ${militaryTimeToString(timeslot.start)} to ${militaryTimeToString(timeslot.end)}`;

    const postTimeslot: PostTimeslot = {
      date: this.selectedDate, 
      start: timeslot.start,
      end: timeslot.end,
      type: timeslot.type,
      numberSwimmers: 1
    }

    const data: ConfirmationDialogData = {
      title: 'Confirm Reseration',
      content: message,
      confirmText: 'Confirm',
      closeText: 'Cancel'
    }

    if (timeslot.type === 'family')
      this.confirmFamilyReservation(postTimeslot, data);
    else
      this.confirmLapReservation(postTimeslot, data);
  }

  confirmFamilyReservation(postTimeslot: PostTimeslot, data: ConfirmationDialogData) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      width: '60%',
      data: data
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this._reservationService.postReservation(postTimeslot)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error)
          })
      }
    });
  }

  confirmLapReservation(postTimeslot: PostTimeslot, data: ConfirmationDialogData) {
    const dialogRef = this.dialog.open(ReservationConfirmationDialog, {
      width: '60%',
      data: data
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (typeof result == 'number') {
        postTimeslot.numberSwimmers = result;
        this._reservationService.postReservation(postTimeslot)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error)
          })
      }
    });
  }
}
