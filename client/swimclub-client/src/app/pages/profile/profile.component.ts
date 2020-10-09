import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserProfile } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile: UserProfile;

  constructor(private _authenticationService: AuthenticationService) 
  { 
    this._authenticationService.userProfile()
      .then((profile: UserProfile) => {
        this.userProfile = profile;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  ngOnInit(): void {
  }

}
