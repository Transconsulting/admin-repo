import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModePaiementFormComponent } from './mode-paiement-form.component';

describe('ModePaiementFormComponent', () => {
  let component: ModePaiementFormComponent;
  let fixture: ComponentFixture<ModePaiementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModePaiementFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModePaiementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
