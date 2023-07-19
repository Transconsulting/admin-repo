import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcelleAppartementFormComponent } from './parcelle-appartement-form.component';

describe('ParcelleAppartementFormComponent', () => {
  let component: ParcelleAppartementFormComponent;
  let fixture: ComponentFixture<ParcelleAppartementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParcelleAppartementFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParcelleAppartementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
