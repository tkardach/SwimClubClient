import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Timeslot } from '../reservations.service';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import { EventHandlerVars } from '@angular/compiler/src/compiler_util/expression_converter';

@Component({
  selector: 'app-reservations-calendar',
  templateUrl: './reservations-calendar.component.html',
  styleUrls: ['./reservations-calendar.component.css']
})
export class ReservationsCalendarComponent implements OnInit {
  @Input() selectedDate: Date;
  @Output() selectedDateChange = new EventEmitter<Date>();

  @Input() timeslots: Array<Timeslot> = [];
  @Output() timeslotClicked = new EventEmitter<Timeslot>();

  @Output() manageEventsClicked = new EventEmitter();

  private _calendarUrl: string;
  @Input() set calendarUrl(url: string) {
    if (!url) return;
    this._calendarUrl = url;
    this.googleCalendar = this.sanitizer.bypassSecurityTrustHtml(
      `
      <iframe 
        src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=America%2FLos_Angeles&amp;src=${this._calendarUrl}&amp;color=%23D50000&amp;showTz=0&amp;showCalendars=0&amp;showTabs=0&amp;showPrint=0&amp;showNav=1&amp;showTitle=0&amp;mode=WEEK" 
        style="border-width:0;width:100%;height:100%;" 
        frameborder="0" 
        scrolling="no"></iframe>
      `
      );
  }
  get calendarUrl(): string {
    return this._calendarUrl;
  }

  googleCalendar: SafeHtml;

  familySwimming: string = "family";

  constructor(private sanitizer: DomSanitizer) { 
  }

  ngOnInit(): void {
  }

  getCalendarUrl() {
  }

  onSelect(date: Date) {
    this.selectedDate = date;
    this.selectedDateChange.emit(date);
  }

  onTimeslotClicked(index: number) {
    this.timeslotClicked.emit(this.timeslots[index])
  }

  onChecked() {
  }

  onManageEvents() {
    this.manageEventsClicked.emit();
  }
}
