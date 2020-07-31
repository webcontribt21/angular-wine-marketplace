import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingRangeComponent } from './rating-range.component';

describe('PriceRangeComponent', () => {
  let component: RatingRangeComponent;
  let fixture: ComponentFixture<RatingRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingRangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
