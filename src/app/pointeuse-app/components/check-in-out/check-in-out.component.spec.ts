import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInOutComponent } from './check-in-out.component';

describe('CheckInOutComponent', () => {
  let component: CheckInOutComponent;
  let fixture: ComponentFixture<CheckInOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckInOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckInOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
