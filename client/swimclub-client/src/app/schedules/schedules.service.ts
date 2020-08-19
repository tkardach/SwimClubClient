import { Injectable } from '@angular/core';
import { SchedulesModule } from './schedules.module';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


export interface ScheduleTimeslot {
  start: number,
  end: number,
  type: string,
  maxOccupants: number
}

export interface Schedule {
  day: number,
  startDate: Date,
  timeslots: ScheduleTimeslot[]
}


@Injectable({
  providedIn: SchedulesModule
})
export class SchedulesService {
  private readonly _url = '/api/schedules/'

  headers: HttpHeaders = new HttpHeaders()
    .set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { 

  }

  getSchedules() {
    return this.http.get<Array<Schedule>>(this._url, {headers: this.headers}).toPromise();
  }

  postSchedule(schedule: Schedule) {
    return this.http.post<any>(this._url, schedule, {headers: this.headers}).toPromise()
  }

  putSchedule(id: string, schedule: Schedule) {
    return this.http.put<Schedule>(this._url + id, schedule, {headers: this.headers}).toPromise()
  }

  postScheduleArray(schedules: Array<Schedule>) {
    return this.http.post<any>(this._url + 'array', schedules, {headers: this.headers}).toPromise()
  }
}
