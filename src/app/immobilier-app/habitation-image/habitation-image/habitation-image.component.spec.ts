import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitationImageComponent } from './habitation-image.component';

describe('HabitationImageComponent', () => {
  let component: HabitationImageComponent;
  let fixture: ComponentFixture<HabitationImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HabitationImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HabitationImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
