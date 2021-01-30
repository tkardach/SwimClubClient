import { Component, OnInit } from '@angular/core';
import { Schedule, SchedulesService, CreateSchedule } from 'src/app/schedules/schedules.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-schedule-page',
  templateUrl: './create-schedule-page.component.html',
  styleUrls: ['./create-schedule-page.component.css']
})
export class CreateSchedulePageComponent implements OnInit {
  schedules: Array<CreateSchedule> = [];

  constructor(
    private _schedulesService: SchedulesService,
    private _router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this._schedulesService.postScheduleArray(this.schedules).subscribe(
      response => this._router.navigate(['/schedules']),
      error => console.log(error)
    )
  }

}
