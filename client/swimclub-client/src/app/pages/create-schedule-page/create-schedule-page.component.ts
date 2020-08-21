import { Component, OnInit } from '@angular/core';
import { Schedule, SchedulesService } from 'src/app/schedules/schedules.service';

@Component({
  selector: 'app-create-schedule-page',
  templateUrl: './create-schedule-page.component.html',
  styleUrls: ['./create-schedule-page.component.css']
})
export class CreateSchedulePageComponent implements OnInit {
  schedules: Array<Schedule> = [];

  constructor(private _schedulesService: SchedulesService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this._schedulesService.postScheduleArray(this.schedules)
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
  }

}
