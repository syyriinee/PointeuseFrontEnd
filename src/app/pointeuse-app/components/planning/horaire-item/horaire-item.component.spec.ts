import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoraireItemComponent } from './horaire-item.component';

describe('HoraireItemComponent', () => {
  let component: HoraireItemComponent;
  let fixture: ComponentFixture<HoraireItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoraireItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HoraireItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
