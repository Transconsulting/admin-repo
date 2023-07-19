import { TestBed } from '@angular/core/testing';

import { ProffessionService } from './proffession.service';

describe('ProffessionService', () => {
  let service: ProffessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProffessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
