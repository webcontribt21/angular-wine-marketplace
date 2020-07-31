import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoriesCarouselComponent } from './stories-carousel.component';

describe('StoriesCarouselComponent', () => {
  let component: StoriesCarouselComponent;
  let fixture: ComponentFixture<StoriesCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoriesCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoriesCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
