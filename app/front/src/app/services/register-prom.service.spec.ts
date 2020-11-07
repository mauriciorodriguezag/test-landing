import { TestBed } from '@angular/core/testing';

import { RegisterPromService } from './register-prom.service';

describe('RegisterPromService', () => {
  let service: RegisterPromService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterPromService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
