import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Event } from '../reservations.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  hover: boolean = false;

  @Input() event: Event = null;
  @Output() remove = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  contentString() {
    if (!this.event) {
      return '5:00:00PM to 6:00:00PM';
    }
    let start = new Date(this.event.start.dateTime);
    let end = new Date(this.event.end.dateTime);
    return `${start.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: true})} to ${end.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: true})}`;
  }

  onRemove() {
    this.remove.emit();
  }
}
