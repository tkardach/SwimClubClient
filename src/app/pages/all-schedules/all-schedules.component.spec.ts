import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllSchedulesComponent } from './all-schedules.component';

describe('AllSchedulesComponent', () => {
  let component: AllSchedulesComponent;
  let fixture: ComponentFixture<AllSchedulesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllSchedulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
