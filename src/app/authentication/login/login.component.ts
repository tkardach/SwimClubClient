import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  error: string = '';
  userEmail: string = '';
  userPassword: string = '';
  desiredRoute: string = '';
  
  constructor(
    private authService: AuthenticationService, 
    private router : Router,
    private route: ActivatedRoute) {
      this.desiredRoute = this.route.snapshot.paramMap.get('route');
    }

  ngOnInit(): void {
  }  
  
  login() {
    this.authService.validate(this.userEmail, this.userPassword)
      .then((response) => {
        this.authService.setUserInfo({
          email: response['email'],
          admin: response['isAdmin']
        });
        if (this.desiredRoute)
          this.router.navigate([this.desiredRoute])
        else
          this.router.navigate(['']);
      })
      .catch((error) => {
        console.log(error);
        if (error.error instanceof Object)
          this.error = error.error.message;
        else
          this.error = error.error;
      })
  }

}

export interface LoginDialogData {
  loginService: AuthenticationService
}

@Component({
  selector: 'login-dialog',
  templateUrl: './login-dialog.html',
  styleUrls: ['./login-dialog.css']
})
export class LoginDialog {
  hide: boolean = true;
  error: string = '';

  @Input() email: string = '';
  @Output() emailChange = new EventEmitter<string>();

  @Input() password: string = '';
  @Output() passwordChange = new EventEmitter<string>();

  private _service: AuthenticationService;

  constructor(
    public dialogRef: MatDialogRef<LoginDialog>,
    @Inject(MAT_DIALOG_DATA) public data: LoginDialogData) {
      this._service = data.loginService;
    }

  onLogin() {
    this.error = "";
    this._service.validate(this.email, this.password)
      .then((response) => {
        this._service.setUserInfo({
          email: response['email'],
          admin: response['isAdmin']
        });
        this.dialogRef.close(true);
      })
      .catch((error) => {
        console.log(error);
        if (error.error instanceof Object)
          this.error = error.error.message;
        else
          this.error = error.error;
      })
  }

}