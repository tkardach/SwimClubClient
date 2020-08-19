import { Injectable } from '@angular/core';
import { ReservationsModule } from './reservations.module';
import { environment } from 'src/environments/environment';

export interface Timeslot {
  vacant: boolean,
  start: number,
  end: number,
  type: string,
  maxOccupants: number
}

@Injectable({
  providedIn: ReservationsModule
})
export class ReservationsService {
  API_URL: string = environment.apiUrl;
  RESERVATIONS_URL: string = this.API_URL + '/reservations';

  constructor() { }

  
}
