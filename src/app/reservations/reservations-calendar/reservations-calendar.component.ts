import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Timeslot } from '../reservations.service';
import { SchedulesService } from 'src/app/schedules/schedules.service';

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

  familySwimming: string = "family";

  constructor() { }

  ngOnInit(): void {
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
}
