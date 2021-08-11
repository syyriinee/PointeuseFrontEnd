import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveMissionsComponent } from './save-missions.component';

describe('SaveMissionsComponent', () => {
  let component: SaveMissionsComponent;
  let fixture: ComponentFixture<SaveMissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveMissionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveMissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
