import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SpinnerOverlayService } from 'src/app/shared/spinner-overlay.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css', '../authentication.css']
})
export class CreateAccountComponent implements OnInit {
  email: string = '';
  password: string = '';
  verifyPassword: string = '';
  error: string = '';

  createAccountForm = new FormGroup({
    email: new FormControl(this.email, [Validators.required]),
    password: new FormControl(this.password, [Validators.required]),
    verifyPassword: new FormControl(this.verifyPassword, [Validators.required, this.validateAreEqual.bind(this)]),
  });

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private _spinnerService: SpinnerOverlayService
  ) { }

  ngOnInit(): void {
  }

  private validateAreEqual(fieldControl: FormControl) {
    if (!this.createAccountForm) return;

    return fieldControl.value === this.createAccountForm.get('password').value ? null : {
        invalid: true
    };
  }

  onCreateAccount(formGroup: FormGroup) {
    if (this.createAccountForm.invalid) return;

    this._spinnerService.show();
    this.authService.createAccount(formGroup.value.email, formGroup.value.password).subscribe(
      response => {
        this.router.navigate(['/make-reservations']);
      },
      error => {
        console.log(error);
        this.error = error.error.message;
      }
    ).add(() => {
      this._spinnerService.hide();
  })
  }

  onForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
}

export interface CreateAccountDialogData {
  authService: AuthenticationService
}

@Component({
  selector: 'create-account-dialog',
  templateUrl: './create-account-dialog.html',
  styleUrls: ['./create-account-dialog.css', '../authentication.css']
})
export class CreateAccountDialog {
  error: string = '';
  email: string = '';
  password: string = '';
  verifyPassword: string = '';

  private _service: AuthenticationService;
  
  // Form Controls
  createAccountForm = new FormGroup({
    email: new FormControl(this.email, [Validators.required]),
    password: new FormControl(this.password, [Validators.required]),
    verifyPassword: new FormControl(this.verifyPassword, [Validators.required, this.validateAreEqual.bind(this)])
  });

  constructor(
    public dialogRef: MatDialogRef<CreateAccountDialog>,
    @Inject(MAT_DIALOG_DATA) public data: CreateAccountDialogData) {
    this._service = data.authService;
  }

  private validateAreEqual(fieldControl: FormControl) {
    if (!this.createAccountForm) return;

    return fieldControl.value === this.createAccountForm.get('password').value ? null : {
        invalid: true
    };
  }

  onCreateAccount(formGroup: FormGroup) {
    if (this.createAccountForm.invalid) return;

    this._service.createAccount(formGroup.value.email, formGroup.value.password).subscribe(
      response => {
        this.dialogRef.close(true)
      },
      error => this.error = error.error.message
    )
  }
}