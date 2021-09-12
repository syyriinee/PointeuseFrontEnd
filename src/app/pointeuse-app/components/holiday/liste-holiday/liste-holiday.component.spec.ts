import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeHolidayComponent } from './liste-holiday.component';

describe('ListeholidayComponent', () => {
  let component: ListeHolidayComponent;
  let fixture: ComponentFixture<ListeHolidayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeHolidayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeHolidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
