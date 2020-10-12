import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './authentication/authentication.guard';
import { AllSchedulesComponent } from './pages/all-schedules/all-schedules.component';
import { CreateSchedulePageComponent } from './pages/create-schedule-page/create-schedule-page.component';
import { MakeReservationsComponent } from './pages/make-reservations/make-reservations.component';
import { ProfileComponent } from './pages/profile/profile.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'login/:route', component: LoginComponent},
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'schedules', component: AllSchedulesComponent, canActivate: [AuthGuard]},
  {path: 'create-schedule', component: CreateSchedulePageComponent, canActivate: [AuthGuard]},
  {path: 'make-reservations', component: MakeReservationsComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
