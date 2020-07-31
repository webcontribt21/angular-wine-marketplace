import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsStyleComponent } from './cards-style.component';

describe('CardsStyleComponent', () => {
  let component: CardsStyleComponent;
  let fixture: ComponentFixture<CardsStyleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardsStyleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
