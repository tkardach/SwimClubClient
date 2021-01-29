import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MakeReservationsComponent } from './make-reservations.component';

describe('MakeReservationsComponent', () => {
  let component: MakeReservationsComponent;
  let fixture: ComponentFixture<MakeReservationsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeReservationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
