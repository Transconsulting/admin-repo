import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomaineDetailsComponent } from './domaine-details.component';

describe('DomaineDetailsComponent', () => {
  let component: DomaineDetailsComponent;
  let fixture: ComponentFixture<DomaineDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DomaineDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DomaineDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
