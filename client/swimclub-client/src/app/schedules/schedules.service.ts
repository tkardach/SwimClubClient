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
  timeslots: ScheduleTimeslot[],
  maxFamilyReservations: number,
  maxLapReservations: number
}


@Injectable({
  providedIn: SchedulesModule
})
export class SchedulesService {
  API_URL: string = environment.apiUrl;
  SCHEDULE_URL: string = this.API_URL + '/schedules'

  headers: HttpHeaders = new HttpHeaders()
    .set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { 

  }

  getSchedules() {
    return this.http.get<Array<Schedule>>(this.SCHEDULE_URL, {headers: this.headers}).toPromise();
  }

  postSchedule(schedule: Schedule) {
    return this.http.post<any>(this.SCHEDULE_URL, schedule, {headers: this.headers})
  }
}
