import { Injectable } from '@angular/core';
import { ReservationsModule } from './reservations.module';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';

export interface Timeslot {
  vacant: boolean,
  start: number,
  end: number,
  type: string,
  maxOccupants: number
}

export interface PostTimeslot {
  type: string,
  date: Date,
  start: number,
  end: number,
  numberSwimmers: number
}

@Injectable({
  providedIn: ReservationsModule
})
export class ReservationsService {
  private readonly _url: string = environment.apiUrl + '/reservations';
  
  headers: HttpHeaders = new HttpHeaders()
    .set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  postReservation(timeslot: PostTimeslot) {
    return this.http.post<any>(this._url, timeslot, {headers: this.headers, withCredentials: true}).toPromise();
  }
}
