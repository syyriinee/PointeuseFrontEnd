import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeJourFerieComponent } from './liste-jourFerie.component';

describe('ListejourFerieComponent', () => {
  let component: ListeJourFerieComponent;
  let fixture: ComponentFixture<ListeJourFerieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeJourFerieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeJourFerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
