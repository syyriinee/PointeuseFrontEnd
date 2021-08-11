import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveCongesComponent } from './save-conges.component';

describe('SaveCongesComponent', () => {
  let component: SaveCongesComponent;
  let fixture: ComponentFixture<SaveCongesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveCongesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveCongesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
