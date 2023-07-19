import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommuneListComponent } from './commune-list.component';

describe('CommuneListComponent', () => {
  let component: CommuneListComponent;
  let fixture: ComponentFixture<CommuneListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommuneListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommuneListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
