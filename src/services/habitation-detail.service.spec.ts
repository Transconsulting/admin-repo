import { TestBed } from '@angular/core/testing';

import { HabitationDetailService } from './habitation-detail.service';

describe('HabitationDetailService', () => {
  let service: HabitationDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HabitationDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
