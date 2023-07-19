import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProprietaireListComponent } from './proprietaire-list.component';

describe('ProprietaireListComponent', () => {
  let component: ProprietaireListComponent;
  let fixture: ComponentFixture<ProprietaireListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProprietaireListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProprietaireListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
