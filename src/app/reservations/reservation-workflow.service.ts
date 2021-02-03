import { EventEmitter, Injectable, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialog, ConfirmationDialogData } from '../modals/dialogs';
import { Event, ReservationsService } from '../reservations/reservations.service';
import { SpinnerOverlayService } from '../shared/spinner-overlay.service';
import { ReservationsModule } from './reservations.module';

@Injectable({
  providedIn: ReservationsModule
})
export class ReservationWorkflowService {
  @Output() reservationDeleted = new EventEmitter();

  constructor(
    private _reservationService: ReservationsService,
    private _spinnerService: SpinnerOverlayService,
    public dialog: MatDialog) { }

  
  onEventRemoved(event: Event) {

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
      this.confirmDeleteEvent(event.id, data);
    }
  }

  confirmDeleteEvent(id: string, data: ConfirmationDialogData) {

    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: data
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this._spinnerService.show();
        this._reservationService.deleteReservation(id).subscribe(
          (message) => {
            console.log(message);
            this.showDeleteConfirmed("Reservation has been removed!");
          },
          (error) => {
            console.log(error);
            this.showDeleteFailure(error.error.message)
          }
        ).add(() => {
          this._spinnerService.hide();
        })
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
      this.reservationDeleted.emit();
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
}
