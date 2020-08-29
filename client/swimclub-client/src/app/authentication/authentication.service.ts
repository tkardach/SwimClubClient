import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface UserInfo {
  email: string,
  admin: boolean
}

export interface CheckSession {
  sessionExists: boolean,
  user: UserInfo
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly userInfoString = 'userInfo';

  constructor(private http: HttpClient) { }

  public async isAuthenticated() : Promise<boolean> {
    try {
      const checkSession = await this.checkSession();
      console.log(checkSession)
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
  
  public validate(email, password) {
    return this.http.post('/api/users/login', {'username' : email, 'password' : password}).toPromise()
  }
  
  public logout() {
    return this.http.get('/api/users/logout', {responseType: 'text'}).toPromise()
  }

  public checkSession() {
    return this.http.get<CheckSession>('/api/users/session').toPromise()
  }
}
