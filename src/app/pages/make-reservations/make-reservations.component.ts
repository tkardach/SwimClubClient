import { Component, OnInit } from '@angular/core';
import { SchedulesService } from 'src/app/schedules/schedules.service';
import { Timeslot, ReservationsService, PostTimeslot, Event } from 'src/app/reservations/reservations.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialog, ReservationConfirmationDialog, ConfirmationDialogData, MessageDialog, MessageDialogData, EventViewDialogData, EventViewDialog } from 'src/app/modals/dialogs';
import { militaryTimeToString } from '../../shared/utilities';
import { AuthenticationService, UserProfile } from 'src/app/authentication/authentication.service';
import { LoginDialog, LoginDialogData } from 'src/app/authentication/login/login.component';
import { SpinnerOverlayService } from 'src/app/shared/spinner-overlay.service';
import { CreateAccountDialogData, CreateAccountDialog } from 'src/app/authentication/create-account/create-account.component';
import { ForgotPasswordDialogData, ForgotPasswordDialog } from 'src/app/authentication/forgot-password/forgot-password.component';
import { ReservationWorkflowService } from 'src/app/reservations/reservation-workflow.service';
import { AuthenticationWorkflowService } from 'src/app/authentication/authentication-workflow.service';

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
  googleCalendarUrl: string;
  manageEventsDialog: MatDialogRef<EventViewDialog>;

  constructor(
    private _schedulesService: SchedulesService,
    private _reservationService: ReservationsService,
    private _authenticationService: AuthenticationService,
    private _authenticationWorkflow: AuthenticationWorkflowService,
    private _spinnerService: SpinnerOverlayService,
    private _reservationWorkflow: ReservationWorkflowService,
    public dialog: MatDialog) {
    }

  async ngOnInit(): Promise<void> {
    this._reservationService.getReservationCalendarId().subscribe(
      result => this.googleCalendarUrl = result,
      error => console.log(error)
    )
    this._reservationWorkflow.reservationDeleted.subscribe(
      done => {
        if (this.manageEventsDialog) {
          this.manageEventsDialog.close();
          this.showManageEventsModal();
        }
      }
    )
    await this.checkAuthenticated();
  }

  async checkAuthenticated() {
    this.loggedIn = await this._authenticationService.isAuthenticated();
  }

  getTimeslotsForDate() {
    this.timeslots = [];
    this._schedulesService.getTimeslotsForDate(this.selectedDate).subscribe(
      (result) => {
        this.timeslots = result;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  onSelectedDateChange() {
    this.getTimeslotsForDate();
  }

  async onTimeslotClicked(timeslot: Timeslot) {
    await this.checkAuthenticated();

    if (!this.loggedIn) {
      this.showLoginModal(() => {this.onTimeslotClicked(timeslot)});
      console.log('in here')
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
      closeText: 'Cancel',
      showClose: true
    }

    if (timeslot.type === 'family')
      this.confirmFamilyReservation(postTimeslot, data);
    else
      this.confirmLapReservation(postTimeslot, data);
  }

  showManageEventsModal() {
    if (!this.loggedIn) {
      this.showLoginModal(() => {this.showManageEventsModal()});
      return;
    }

    this._spinnerService.show();
    this._authenticationService.userProfile().subscribe(
      (result: UserProfile) => {
        this._spinnerService.hide();
        const data: EventViewDialogData = {
          events: result.events
        }
        this.manageEventsDialog = this.dialog.open(EventViewDialog, {
          data: data,
          height: '50%'
        });

        this.manageEventsDialog.componentInstance.deleteEvent.subscribe(
          (event: Event) => {
            this._reservationWorkflow.onEventRemoved(event);
          }
        )
      },
      (error) => {
        this._spinnerService.hide();
      }
    )
  }

  showLoginModal(callback: Function) {
    this._authenticationWorkflow.workflowDone.subscribe(
      async result => {
        await this.checkAuthenticated();
        if (callback) callback();
      }
    )
    this._authenticationWorkflow.showLoginModal();
  }

  confirmFamilyReservation(postTimeslot: PostTimeslot, data: ConfirmationDialogData) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: data
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this._spinnerService.show();
        this._reservationService.postReservation(postTimeslot).subscribe(
          (response: Event) => {
            console.log(response);
            this.showReservationConfirmation(this.reservationString(response, postTimeslot.numberSwimmers));
          },
          (error) => {
            console.log(error)
            this.showReservationFailure(error.error.message)
          }).add(() => {
            this._spinnerService.hide();
            this.getTimeslotsForDate();
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
        this._reservationService.postReservation(postTimeslot).subscribe(
          (response: Event) => {
            console.log(response);
            this.showReservationConfirmation(this.reservationString(response, postTimeslot.numberSwimmers));
          },
          (error) => {
            console.log(error)
            this.showReservationFailure(error.error.message)
          }).add(() => {
            this._spinnerService.hide();
            this.getTimeslotsForDate();
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
      closeText: 'Close',
      showClose: false
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
      closeText: 'Close',
      showClose: false
    }

    this.dialog.open(ConfirmationDialog, {
      data: data
    });
  }
}
