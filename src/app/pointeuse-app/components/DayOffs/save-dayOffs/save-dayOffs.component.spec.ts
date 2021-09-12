import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveDayOffsComponent } from './save-dayOffs.component';

describe('SaveDayOffsComponent', () => {
  let component: SaveDayOffsComponent;
  let fixture: ComponentFixture<SaveDayOffsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveDayOffsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveDayOffsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
