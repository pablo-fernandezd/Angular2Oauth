import { TestBed } from '@angular/core/testing';

import { MarcadorService } from './marcador.service';

describe('MarcadorService', () => {
  let service: FederacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FederacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
