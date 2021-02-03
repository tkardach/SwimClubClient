import { EventEmitter, Injectable, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialog, MessageDialogData } from '../modals/dialogs';
import { AuthenticationService } from './authentication.service';
import { CreateAccountDialog, CreateAccountDialogData } from './create-account/create-account.component';
import { ForgotPasswordDialog, ForgotPasswordDialogData } from './forgot-password/forgot-password.component';
import { LoginDialog, LoginDialogData } from './login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationWorkflowService {
  @Output() workflowDone = new EventEmitter();

  loggedIn: boolean;
  afterLoginCallbacks = {};

  constructor(
    private _authenticationService: AuthenticationService,
    public dialog: MatDialog
  ) { }

  async checkAuthenticated() {
    this.loggedIn = await this._authenticationService.isAuthenticated();
  }

  addAfterLoginCallback(func: Function) {
    this.afterLoginCallbacks[func.name] = func;
  }

  removeAfterLoginCallback(func: Function) {
    if (this.afterLoginCallbacks[func.name])
      delete this.afterLoginCallbacks[func.name]
  }

  invokeCallbacks() {
    Object.values(this.afterLoginCallbacks).forEach(func => {
      if (func instanceof Function) func();
    })
  }
  
  showLoginModal() {
    const data: LoginDialogData = {
      loginService: this._authenticationService
    }
    const dialogRef = this.dialog.open(LoginDialog, {
      data: data
    });

    // subscribe to forgot password workflow
    dialogRef.componentInstance.forgotPassword.subscribe(
      () => {
        dialogRef.close();

        const data: ForgotPasswordDialogData = {
          authService: this._authenticationService
        }
        const forgotPasswordDialog = this.dialog.open(ForgotPasswordDialog, {
          data: data
        });

        forgotPasswordDialog.afterClosed().subscribe(
          result => {
            if (result) {
              const messageData: MessageDialogData = {content: 'Password reset email has been sent'}
              this.dialog.open(MessageDialog, {data: messageData});
            }
          }
        )
      }
    )

    // subscribe to create account workflow
    dialogRef.componentInstance.createAccount.subscribe(
      () => {
        dialogRef.close();

        const data: CreateAccountDialogData = {
          authService: this._authenticationService
        }
        const createAccountDialog = this.dialog.open(CreateAccountDialog, {
          data: data
        });

        createAccountDialog.afterClosed().subscribe(
          result => {
            if (result) 
              this.invokeCallbacks();
          }
        )
      }
    )

    // login dialog closed
    dialogRef.afterClosed().subscribe(async (result: boolean) => {
      if (result) 
        this.invokeCallbacks();
    });
  }
}
