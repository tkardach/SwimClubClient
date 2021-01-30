import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessageDialog, MessageDialogData } from 'src/app/modals/dialogs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css', '../authentication.css']
})
export class ForgotPasswordComponent implements OnInit {
  error: string = '';
  email: string = '';

  // Form Controls
  forgotPasswordForm = new FormGroup({
    email: new FormControl(this.email, [Validators.required])
  });

  constructor(
    private _authService: AuthenticationService,
    private _router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onResetPassword(formGroup: FormGroup) {
    if (this.forgotPasswordForm.invalid) return;

    this._authService.forgotPassword(formGroup.value.email).subscribe(
      response => {
        const data: MessageDialogData = {
          content: 'Email has been sent. Check your email for password reset link.'
        };
        const dialogRef = this.dialog.open(MessageDialog, {data: data});
        dialogRef.afterClosed().subscribe(
          closed => this._router.navigate(['/login'])
        )
      },
      error => this.error = error.error.message
    )
  }
}

export interface ForgotPasswordDialogData {
  authService: AuthenticationService
}

@Component({
  selector: 'forgot-password-dialog',
  templateUrl: './forgot-password-dialog.html',
  styleUrls: ['./forgot-password-dialog.css', '../authentication.css']
})
export class ForgotPasswordDialog {
  error: string = '';
  email: string = '';

  private _service: AuthenticationService;
  
  // Form Controls
  forgotPasswordForm = new FormGroup({
    email: new FormControl(this.email, [Validators.required])
  });

  constructor(
    public dialogRef: MatDialogRef<ForgotPasswordDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ForgotPasswordDialogData) {
    this._service = data.authService;
  }
  
  onResetPassword(formGroup: FormGroup) {
    if (this.forgotPasswordForm.invalid) return;

    this._service.forgotPassword(formGroup.value.email).subscribe(
      response => this.dialogRef.close(true),
      error => this.error = error.error.message
    )
  }
}