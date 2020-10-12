import { Component, OnInit } from '@angular/core';
import { SchedulesService, Schedule } from 'src/app/schedules/schedules.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialog } from 'src/app/modals/dialogs';
import { SpinnerOverlayService } from 'src/app/shared/spinner-overlay.service';

@Component({
  selector: 'app-all-schedules',
  templateUrl: './all-schedules.component.html',
  styleUrls: ['./all-schedules.component.css']
})
export class AllSchedulesComponent implements OnInit {
  private _schedules: Array<Schedule> = null;

  set schedules(schedules: Array<Schedule>) {
    this._schedules = this.sortSchedules(schedules);
  }

  get schedules(): Array<Schedule> {
    return this._schedules;
  }

  constructor(
    private _schedulesService: SchedulesService,
    private _spinnerService: SpinnerOverlayService,
    public dialog: MatDialog) {
    }

  async ngOnInit(): Promise<void> {
    await this.init();
  }

  private sortSchedules(schedules: Array<Schedule>): Array<Schedule> {
    return schedules.sort((a, b) => {
      let date = new Date(a.startDate);
      let comp = new Date(b.startDate);
      if (date < comp) return 1;
      else if (date > comp) return -1;
      else {
        if (a.day < b.day) return 1;
        else return -1;
      };
    })
  }

  private async init(): Promise<void> {
    this._spinnerService.show();
    this._schedulesService.getSchedules()
      .then((response) => {
        this.schedules = response;
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        this._spinnerService.hide();
      });
  }

  addTimeslot(index: number) {
    const timeslot = {
      _id: '',
      start: 0,
      end: 0,
      type: 'family',
      maxOccupants: 1 
    };
    this.schedules[index].timeslots.push(timeslot);
  }

  onSave(index: number) {
    const schedule = this.schedules[index];
    this._schedulesService.putSchedule(schedule._id, schedule)
      .then((result) => {
      })
      .catch((error) => {
        console.log(error)
      })
  }

  removeSchedule(index: number) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      width: '40%',
      data: {
        title: 'Remove Schedule',
        content: 'Are you sure you want to remove this schedule?',
        confirmText: 'Yes',
        closeText: 'No'
      }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this._schedulesService.deleteSchedule(this.schedules[index]._id)
          .then((result) => {
            this.schedules.splice(index, 1);
          })
          .catch((error) => {
            console.log(error);
          })
      }
    });
  }
}
