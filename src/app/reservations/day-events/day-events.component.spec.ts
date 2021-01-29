import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DayEventsComponent } from './day-events.component';

describe('DayEventsComponent', () => {
  let component: DayEventsComponent;
  let fixture: ComponentFixture<DayEventsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DayEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
