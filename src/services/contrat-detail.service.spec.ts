import { TestBed } from '@angular/core/testing';

import { ContratDetailService } from './contrat-detail.service';

describe('ContratDetailService', () => {
  let service: ContratDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContratDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
