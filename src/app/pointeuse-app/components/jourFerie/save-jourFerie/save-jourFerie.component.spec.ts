import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavejourFerieComponent } from './save-jourFerie.component';

describe('SavejourFerieComponent', () => {
  let component: SavejourFerieComponent;
  let fixture: ComponentFixture<SavejourFerieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavejourFerieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavejourFerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
