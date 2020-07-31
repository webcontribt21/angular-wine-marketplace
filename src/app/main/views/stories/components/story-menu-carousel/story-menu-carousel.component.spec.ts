import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryMenuCarouselComponent } from './story-menu-carousel.component';

describe('StoryMenuCarouselComponent', () => {
  let component: StoryMenuCarouselComponent;
  let fixture: ComponentFixture<StoryMenuCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryMenuCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryMenuCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
