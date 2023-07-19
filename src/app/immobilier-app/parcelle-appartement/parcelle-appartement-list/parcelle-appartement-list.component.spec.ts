import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcelleAppartementListComponent } from './parcelle-appartement-list.component';

describe('ParcelleAppartementListComponent', () => {
  let component: ParcelleAppartementListComponent;
  let fixture: ComponentFixture<ParcelleAppartementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParcelleAppartementListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParcelleAppartementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
