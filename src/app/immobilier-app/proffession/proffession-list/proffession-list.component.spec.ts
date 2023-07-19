import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProffessionListComponent } from './proffession-list.component';

describe('ProffessionListComponent', () => {
  let component: ProffessionListComponent;
  let fixture: ComponentFixture<ProffessionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProffessionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProffessionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
