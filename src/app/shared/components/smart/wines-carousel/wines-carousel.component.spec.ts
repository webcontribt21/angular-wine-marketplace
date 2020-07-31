import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinesCarouselComponent } from './wines-carousel.component';

describe('WinesCarouselComponent', () => {
  let component: WinesCarouselComponent;
  let fixture: ComponentFixture<WinesCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinesCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinesCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
