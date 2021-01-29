import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TimeslotViewComponent } from './timeslot-view.component';

describe('TimeslotViewComponent', () => {
  let component: TimeslotViewComponent;
  let fixture: ComponentFixture<TimeslotViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeslotViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeslotViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
