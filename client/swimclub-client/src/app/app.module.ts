import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ReservationsModule } from './reservations/reservations.module';
import { SharedModule } from './shared/shared.module';
import { SchedulesModule } from './schedules/schedules.module';
import { FormsModule } from '@angular/forms'
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthGuard } from './authentication/authentication.guard';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { PagesModule } from './pages/pages.module';

@NgModule({
  declarations: [
    AppComponent,
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
    HttpClientModule,
    SharedModule,
    SchedulesModule,
    FormsModule,
    AuthenticationModule,
    PagesModule
  ],
  providers: [
    AuthGuard,
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
