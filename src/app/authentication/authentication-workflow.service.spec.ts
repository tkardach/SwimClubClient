import { TestBed } from '@angular/core/testing';

import { AuthenticationWorkflowService } from './authentication-workflow.service';

describe('AuthenticationWorkflowService', () => {
  let service: AuthenticationWorkflowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationWorkflowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
