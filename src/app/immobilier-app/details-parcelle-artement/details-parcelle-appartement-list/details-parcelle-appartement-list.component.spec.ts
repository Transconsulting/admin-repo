import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsParcelleAppartementListComponent } from './details-parcelle-appartement-list.component';

describe('DetailsParcelleAppartementListComponent', () => {
  let component: DetailsParcelleAppartementListComponent;
  let fixture: ComponentFixture<DetailsParcelleAppartementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsParcelleAppartementListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsParcelleAppartementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
