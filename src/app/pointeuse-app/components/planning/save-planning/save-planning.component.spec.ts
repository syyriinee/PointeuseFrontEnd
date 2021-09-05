import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavePlanningComponent } from './save-planning.component';

describe('SavePlanningComponent', () => {
  let component: SavePlanningComponent;
  let fixture: ComponentFixture<SavePlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavePlanningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavePlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
