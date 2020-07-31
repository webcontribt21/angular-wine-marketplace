import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryArticleComponent } from './story-article.component';

describe('StoryArticleComponent', () => {
  let component: StoryArticleComponent;
  let fixture: ComponentFixture<StoryArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
