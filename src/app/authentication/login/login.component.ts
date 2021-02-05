import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../authentication.css']
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  error: string = '';
  desiredRoute: string = '';
  
  private _email: string = '';
  @Input() set email(email: string) {
    this._email = email;
    this.loginForm.patchValue({ 'email': this._email });
  }
  get email() : string {
    return this._email;
  }

  private _password: string ='';
  @Input() set password(password: string) {
    this._password = password;
    this.loginForm.patchValue({ 'password': this._password });
  }
  get password() : string {
    return this._password;
  }

  // Form Controls
  loginForm = new FormGroup({
    email: new FormControl(this.email, [Validators.required]),
    password: new FormControl(this.password, [Validators.required])
  });

  
  constructor(
    private authService: AuthenticationService, 
    private router : Router,
    private route: ActivatedRoute) {
      this.desiredRoute = this.route.snapshot.paramMap.get('route');
    }

  ngOnInit(): void {
  }  
  
  onLogin(form: FormGroup) {
    this.error = '';
    if (this.loginForm.invalid) return;

    this.authService.validate(form.value.email, form.value.password)
      .subscribe(
        response => {
          if (this.desiredRoute)
            this.router.navigate([this.desiredRoute])
          else
            this.router.navigate(['']);
        },
        error => {
          console.log(error);
          if (error.error instanceof Object)
            this.error = error.error.message;
          else
            this.error = error.error;
        }
      )
  }

  createAccount() {
    this.router.navigate(['/create-account']);
  }

  forgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
}

export interface LoginDialogData {
  loginService: AuthenticationService
}

@Component({
  selector: 'login-dialog',
  templateUrl: './login-dialog.html',
  styleUrls: ['./login-dialog.css', '../authentication.css']
})
export class LoginDialog {
  hide: boolean = true;
  error: string = '';
  email: string = '';
  password: string = '';

  @Output() createAccount = new EventEmitter();
  @Output() forgotPassword = new EventEmitter();

  private _service: AuthenticationService;
  

  // Form Controls
  loginForm = new FormGroup({
    email: new FormControl(this.email, [Validators.required]),
    password: new FormControl(this.password, [Validators.required])
  });

  constructor(
    public dialogRef: MatDialogRef<LoginDialog>,
    @Inject(MAT_DIALOG_DATA) public data: LoginDialogData) {
      this._service = data.loginService;
    }

  onLogin(form: FormGroup) {
    this.error = '';
    if (this.loginForm.invalid) return;

    this.error = "";
    this._service.validate(form.value.email, form.value.password).subscribe(
      response => {
        this.dialogRef.close(true);
      },
      error => {
        console.log(error);
        if (error.error instanceof Object)
          this.error = error.error.message;
        else
          this.error = error.error;
      }
    )
  }

  onCreateAccount() {
    this.createAccount.emit();
  }

  onForgotPassword() {
    this.forgotPassword.emit();
  }
}