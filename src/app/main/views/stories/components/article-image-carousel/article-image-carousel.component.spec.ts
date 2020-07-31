import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleImageCarouselComponent } from './article-image-carousel.component';

describe('ArticleImageCarouselComponent', () => {
  let component: ArticleImageCarouselComponent;
  let fixture: ComponentFixture<ArticleImageCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleImageCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleImageCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
