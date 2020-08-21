import { Component, OnInit } from '@angular/core';
import { SchedulesService, Schedule } from 'src/app/schedules/schedules.service';

@Component({
  selector: 'app-all-schedules',
  templateUrl: './all-schedules.component.html',
  styleUrls: ['./all-schedules.component.css']
})
export class AllSchedulesComponent implements OnInit {
  schedules: Array<Schedule> = null;

  constructor(private _schedulesService: SchedulesService) { }

  async ngOnInit(): Promise<void> {
    await this.init();
  }


  private async init(): Promise<void> {
    this._schedulesService.getSchedules()
      .then((response) => {
        console.log(response)
        this.schedules = response;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
