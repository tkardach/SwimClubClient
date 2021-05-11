import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from '../reservations/reservations.service';
import { environment } from 'src/environments/environment';
import { throwError, pipe } from 'rxjs';
import { map } from 'rxjs/operators';


export interface UserInfo {
  email: string,
  admin: boolean
}

export interface CheckSession {
  sessionExists: boolean,
  user: UserInfo
}

export interface FeePair {
  name: String,
  amount: number
}

export interface Fees {
  totalOwed: string,
  startupFee: string,
  equityShare: string,
  unpaidCarryOver: string,
  membershipDues: string,
  lateFee: string,
  workdayFee: string,
  guestFee: string,
  nannyFee: string,
  assessmentFee: string
}

export interface UserProfile {
  user: {
    lastName: string,
    certificateNumber: string
  },
  events: Array<Event>,
  fees: Fees
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly _url: string = environment.apiUrl + '/users/';
  private readonly userInfoString = 'userInfo';

  constructor(private http: HttpClient) { }

  public convertFeesToArray(fees: Fees) : Array<FeePair> {
    const feesArray : Array<FeePair> = [];

    for (var prop in fees) {
      if (Object.prototype.hasOwnProperty.call(fees, prop)) {
        if (!fees[prop]) continue;

        let sentenceProp = prop;
        let result = sentenceProp.replace( /([A-Z])/g, " $1" );
        let finalResult = result.charAt(0).toUpperCase() + result.slice(1);

        feesArray.push({
          name: finalResult,
          amount: fees[prop]
        });
      }
    }

    return feesArray;
  }

  public async isAuthenticated() : Promise<boolean> {
    try {
      const checkSession = await this.checkSession();
      return checkSession.sessionExists && this.isLoggedIn();
    } catch {
      console.log('TODO: Error check for isAuthenticated')
    }
  }

  public isAdmin() : boolean {
    const userInfo = localStorage.getItem(this.userInfoString);
    const userJson: UserInfo = JSON.parse(userInfo); 
    if (userInfo && userJson && userJson.admin) 
      return true;
    return false;
  }

  public isLoggedIn() : boolean {
    const userInfo = localStorage.getItem(this.userInfoString);
    const userJson: UserInfo = JSON.parse(userInfo); 
    if (userInfo && userJson) 
      return true;
    return false;
  }

  public setUserInfo(user: UserInfo) {
    localStorage.setItem(this.userInfoString, JSON.stringify(user))
  }  

  public unsetUserInfo() {
    localStorage.removeItem(this.userInfoString);
  }
  
  public validate(email: string, password: string) {
    return this.http.post(`${this._url}/login`, {'username' : email, 'password' : password}, {withCredentials: true})
      .pipe(
        map(
          response => {
            this.setUserInfo({
              email: response['email'],
              admin: response['isAdmin']
            });
            return response;
          })
      )
  }
  
  public createAccount(email: string, password: string) {
    return this.http.post(`${this._url}/signup`, {'username' : email, 'password' : password}, {withCredentials: true})
  }

  public forgotPassword(email: string) {
    return this.http.post(`${this._url}/forgot`, {'email' : email})
  }
  
  public resetPassword(password: string, token: string) {
    return this.http.post(`${this._url}/reset/` + token, {'password' : password});
  }
  
  public logout() {
    return this.http.get(`${this._url}/logout`, {responseType: 'text', withCredentials: true})
      .pipe(
        map(response => {
          this.unsetUserInfo();
          return response
        })
      )
  }

  public userProfile() {
    return this.http.get<UserProfile>(`${this._url}/me`, {withCredentials: true})
  }

  public checkSession() {
    return this.http.get<CheckSession>(`${this._url}/session`, {withCredentials: true}).toPromise()
  }
}
