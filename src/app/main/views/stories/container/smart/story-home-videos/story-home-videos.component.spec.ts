import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryHomeVideosComponent } from './story-home-videos.component';

describe('StoryHomeVideosComponent', () => {
  let component: StoryHomeVideosComponent;
  let fixture: ComponentFixture<StoryHomeVideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryHomeVideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryHomeVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
