import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateSchedulePageComponent } from './create-schedule-page.component';

describe('CreateSchedulePageComponent', () => {
  let component: CreateSchedulePageComponent;
  let fixture: ComponentFixture<CreateSchedulePageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSchedulePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSchedulePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
