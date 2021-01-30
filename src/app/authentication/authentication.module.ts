import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent, LoginDialog } from './login/login.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


const declared = [
  LoginComponent,
  LoginDialog,
  CreateAccountComponent,
  ForgotPasswordComponent
]

@NgModule({
  declarations: [
    ...declared
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    ...declared
  ]
})
export class AuthenticationModule { }
