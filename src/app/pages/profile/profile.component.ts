import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserProfile } from 'src/app/authentication/authentication.service';
import { SpinnerOverlayService } from 'src/app/shared/spinner-overlay.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile: UserProfile = null;

  constructor(
    private _authenticationService: AuthenticationService,
    private _spinnerService: SpinnerOverlayService
    ) 
  { 
    this._spinnerService.show();
    this._authenticationService.userProfile().subscribe(
      (profile: UserProfile) => {
        this.userProfile = profile;
      },
      (error) => {
        console.log(error);
      }
    ).add(
      () => {this._spinnerService.hide();}
    )
  }

  ngOnInit(): void {
  }

}
