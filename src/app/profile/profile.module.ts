import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountBalanceComponent } from './account-balance/account-balance.component';
import { AuthenticationModule } from '../authentication/authentication.module';


const exports = [
  AccountBalanceComponent
]

@NgModule({
  declarations: [...exports],
  imports: [
    CommonModule,
    AuthenticationModule
  ],
  exports: [...exports]
})
export class ProfileModule { }
