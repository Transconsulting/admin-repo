import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsParcelleAppartementFormComponent } from './details-parcelle-appartement-form.component';

describe('DetailsParcelleAppartementFormComponent', () => {
  let component: DetailsParcelleAppartementFormComponent;
  let fixture: ComponentFixture<DetailsParcelleAppartementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsParcelleAppartementFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsParcelleAppartementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
