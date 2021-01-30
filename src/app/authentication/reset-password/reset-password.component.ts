import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogData, MessageDialog } from 'src/app/modals/dialogs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css', '../authentication.css']
})
export class ResetPasswordComponent implements OnInit {
  error: string = '';
  token: string = '';
  password: string = '';
  verifyPassword: string = '';

  resetPasswordForm = new FormGroup({
    password: new FormControl(this.password, [Validators.required]),
    verifyPassword: new FormControl(this.verifyPassword, [Validators.required, this.validateAreEqual.bind(this)])
  })

  constructor(
    private _authService: AuthenticationService,
    private _matDialog: MatDialog,
    private _route: ActivatedRoute,
    private _router: Router) { 
    this.token = _route.snapshot.paramMap.get('token');
  }

  ngOnInit(): void {
  }

  private validateAreEqual(fieldControl: FormControl) {
    if (!this.resetPasswordForm) return;

    return fieldControl.value === this.resetPasswordForm.get('password').value ? null : {
        invalid: true
    };
  }

  onResetPassword(formGroup: FormGroup) {
    if (this.resetPasswordForm.invalid) return;

    this._authService.resetPassword(formGroup.value.password, this.token).subscribe(
      response => {
        const data: MessageDialogData = { content: 'Password successfully reset' }
        const dialogRef = this._matDialog.open(MessageDialog, {data: data});
        dialogRef.afterClosed().subscribe(
          closed => this._router.navigate(['/login'])
        )
      },
      error => this.error = error.error.message
    )
  }
}
