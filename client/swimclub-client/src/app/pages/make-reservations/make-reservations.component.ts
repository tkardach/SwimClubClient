import { Component, OnInit } from '@angular/core';
import { SchedulesService } from 'src/app/schedules/schedules.service';
import { Timeslot, ReservationsService, PostTimeslot, Event } from 'src/app/reservations/reservations.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialog, ReservationConfirmationDialog, ConfirmationDialogData } from 'src/app/modals/dialogs';
import { militaryTimeToString } from '../../shared/utilities';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { LoginDialog, LoginDialogData } from 'src/app/authentication/login/login.component';
import { SpinnerOverlayService } from 'src/app/shared/spinner-overlay.service';

@Component({
  selector: 'app-make-reservations',
  templateUrl: './make-reservations.component.html',
  styleUrls: ['./make-reservations.component.css']
})
export class MakeReservationsComponent implements OnInit {
  hide: boolean = true;
  selectedDate: Date;
  timeslots: Array<Timeslot>;
  loggedIn: boolean;

  constructor(
    private _schedulesService: SchedulesService,
    private _reservationService: ReservationsService,
    private _authenticationService: AuthenticationService,
    private _spinnerService: SpinnerOverlayService,
    public dialog: MatDialog) {
    }

  async ngOnInit(): Promise<void> {
    await this.checkAuthenticated();
  }

  async checkAuthenticated() {
    this.loggedIn = await this._authenticationService.isAuthenticated();
  }

  getTimeslotsForDate() {
    this.timeslots = [];
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

  async onTimeslotClicked(timeslot: Timeslot) {
    await this.checkAuthenticated();

    if (!this.loggedIn) {
      this.showLoginModal(timeslot);
      return;
    }

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

  showLoginModal(timeslot: Timeslot) {
    const data: LoginDialogData = {
      loginService: this._authenticationService
    }
    const dialogRef = this.dialog.open(LoginDialog, {
      data: data
    });

    dialogRef.afterClosed().subscribe(async (result: boolean) => {
      if (result) {
        await this.checkAuthenticated();
        this.onTimeslotClicked(timeslot);
      }
    });
  }

  confirmFamilyReservation(postTimeslot: PostTimeslot, data: ConfirmationDialogData) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: data
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this._spinnerService.show();
        this._reservationService.postReservation(postTimeslot)
          .then((response: Event) => {
            console.log(response);
            this.showReservationConfirmation(this.reservationString(response, postTimeslot.numberSwimmers));
          })
          .catch((error) => {
            console.log(error)
            this.showReservationFailure(error.error.message)
          })
          .finally(() => {
            this._spinnerService.hide();
          })
      }
    });
  }

  confirmLapReservation(postTimeslot: PostTimeslot, data: ConfirmationDialogData) {
    const dialogRef = this.dialog.open(ReservationConfirmationDialog, {
      data: data
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (typeof result == 'number') {
        postTimeslot.numberSwimmers = result;
        this._spinnerService.show();
        this._reservationService.postReservation(postTimeslot)
          .then((response: Event) => {
            console.log(response);
            this.showReservationConfirmation(this.reservationString(response, postTimeslot.numberSwimmers));
          })
          .catch((error) => {
            console.log(error)
            this.showReservationFailure(error.error.message)
          })
          .finally(() => {
            this._spinnerService.hide();
          })
      }
    });
  }

  reservationString(event: Event, numberSwimmers: number) {
    let start = new Date(event.start.dateTime);
    let end = new Date(event.end.dateTime);
    let string =  ` for ${start.toLocaleDateString()} from ${start.toLocaleTimeString()} to ${end.toLocaleTimeString()}`;
    if (numberSwimmers > 1) {
      return `${numberSwimmers} reservations made ${string}`;
    }
    return `Reservation ${string}`;
  }

  showReservationConfirmation(message: string) {
    const data: ConfirmationDialogData = {
      title: 'Reservation Confirmed!',
      content: message,
      confirmText: 'Ok',
      closeText: 'Close'
    }

    this.dialog.open(ConfirmationDialog, {
      data: data
    });
  }

  showReservationFailure(message: string) {
    const data: ConfirmationDialogData = {
      title: 'Reservation Not Made!',
      content: message,
      confirmText: 'Ok',
      closeText: 'Close'
    }

    this.dialog.open(ConfirmationDialog, {
      data: data
    });
  }
}
