import { TestBed } from '@angular/core/testing';

import { FederacionService } from './federacion.service';

describe('FederacionService', () => {
  let service: FederacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FederacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
