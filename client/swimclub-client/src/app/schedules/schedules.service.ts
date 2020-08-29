import { Injectable } from '@angular/core';
import { SchedulesModule } from './schedules.module';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Timeslot } from '../reservations/reservations.service';


export interface ScheduleTimeslot {
  _id: string,
  start: number,
  end: number,
  type: string,
  maxOccupants: number
}

export interface Schedule {
  _id: string,
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
    const putSchedule = {
      day: schedule.day,
      startDate: schedule.startDate,
      timeslots: schedule.timeslots.map(({_id, ...keepAttrs}) => keepAttrs)
    }
    return this.http.put<Schedule>(this._url + id, putSchedule, {headers: this.headers}).toPromise()
  }

  postScheduleArray(schedules: Array<Schedule>) {
    return this.http.post<any>(this._url + 'array', schedules, {headers: this.headers}).toPromise()
  }

  deleteSchedule(id: string) {
    return this.http.delete<any>(this._url + id, {headers: this.headers}).toPromise()
  }

  getTimeslotsForDate(date: Date) {
    return this.http.get<Array<Timeslot>>(this._url + 'timeslots/' + date, {headers: this.headers}).toPromise();
  }
}
