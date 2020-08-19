import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface UserInfo {
  email: string,
  admin: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly userInfoString = 'userInfo';

  constructor(private http: HttpClient) { }

  public isAuthenticated() : boolean {
    const userInfo = localStorage.getItem(this.userInfoString);
    const userJson: UserInfo = JSON.parse(userInfo); 
    if (userInfo && userJson && userJson.admin) 
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
}
