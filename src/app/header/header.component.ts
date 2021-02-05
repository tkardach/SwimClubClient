import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authService: AuthenticationService, 
    private router : Router) { }

  ngOnInit(): void {
  }

  loggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  isAdmin() : boolean {
    return this.authService.isAdmin();
  }

  logout(): void {
    this.authService.logout()
      .subscribe(() => {
        window.location.reload();
      });
  }

}
