import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveholidayComponent } from './save-holiday.component';

describe('SaveholidayComponent', () => {
  let component: SaveholidayComponent;
  let fixture: ComponentFixture<SaveholidayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveholidayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveholidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
