import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MemberViewComponent } from './member-view/member-view.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ReservationsModule } from './reservations/reservations.module';
import { SharedModule } from './shared/shared.module';
import { SchedulesModule } from './schedules/schedules.module';
import { FormsModule } from '@angular/forms'
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

@NgModule({
  declarations: [
    AppComponent,
    MemberViewComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReservationsModule,
    SharedModule,
    SchedulesModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
