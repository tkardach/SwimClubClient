import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './authentication/authentication.guard';
import { CreateScheduleComponent } from './schedules/create-schedule/create-schedule.component';
import { ScheduleListComponent } from './schedules/schedule-list/schedule-list.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'schedules', component: ScheduleListComponent, canActivate: [AuthGuard]},
  {path: 'create-schedule', component: CreateScheduleComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
