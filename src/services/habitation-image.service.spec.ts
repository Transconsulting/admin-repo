import { TestBed } from '@angular/core/testing';

import { HabitationImageService } from './habitation-image.service';

describe('HabitationImageService', () => {
  let service: HabitationImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HabitationImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
