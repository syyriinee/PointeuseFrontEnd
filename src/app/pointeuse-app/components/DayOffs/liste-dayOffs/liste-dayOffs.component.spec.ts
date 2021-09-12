import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDayOffsComponent } from './liste-dayOffs.component';

describe('ListeDayOffsComponent', () => {
  let component: ListeDayOffsComponent;
  let fixture: ComponentFixture<ListeDayOffsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeDayOffsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeDayOffsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
