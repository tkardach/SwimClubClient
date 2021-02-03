import { TestBed } from '@angular/core/testing';

import { ReservationWorkflowService } from './reservation-workflow.service';

describe('ReservationWorkflowService', () => {
  let service: ReservationWorkflowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationWorkflowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
