import { TestBed } from '@angular/core/testing';

import { ModePayementService } from './mode-payement.service';

describe('ModePayementService', () => {
  let service: ModePayementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModePayementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
