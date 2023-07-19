import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterielFormComponent } from './materiel-form.component';

describe('MaterielFormComponent', () => {
  let component: MaterielFormComponent;
  let fixture: ComponentFixture<MaterielFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterielFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterielFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
