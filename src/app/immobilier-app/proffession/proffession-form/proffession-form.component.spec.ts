import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProffessionFormComponent } from './proffession-form.component';

describe('ProffessionFormComponent', () => {
  let component: ProffessionFormComponent;
  let fixture: ComponentFixture<ProffessionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProffessionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProffessionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
