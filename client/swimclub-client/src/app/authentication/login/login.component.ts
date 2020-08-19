import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  userEmail: string = "";
  userPassword: string = "";
  
  constructor(
    private authService: AuthenticationService, 
    private router : Router) { }

  ngOnInit(): void {
  }  
  
  login() {
    this.authService.validate(this.userEmail, this.userPassword)
    .then((response) => {
      this.authService.setUserInfo({
        email: response['email'],
        admin: response['isAdmin']
      });
      this.router.navigate(['']);
    })
  }

}
