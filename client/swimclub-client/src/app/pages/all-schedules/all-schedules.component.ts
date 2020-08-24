import { Component, OnInit } from '@angular/core';
import { SchedulesService, Schedule } from 'src/app/schedules/schedules.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialog } from 'src/app/modals/dialogs';

@Component({
  selector: 'app-all-schedules',
  templateUrl: './all-schedules.component.html',
  styleUrls: ['./all-schedules.component.css']
})
export class AllSchedulesComponent implements OnInit {
  schedules: Array<Schedule> = null;

  constructor(
    private _schedulesService: SchedulesService,
    public dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    await this.init();
  }

  private async init(): Promise<void> {
    this._schedulesService.getSchedules()
      .then((response) => {
        this.schedules = response;
      })
      .catch((error) => {
        console.log(error)
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
