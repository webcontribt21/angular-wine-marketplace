import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorySecondNavComponent } from './story-second-nav.component';

describe('StorySecondNavComponent', () => {
  let component: StorySecondNavComponent;
  let fixture: ComponentFixture<StorySecondNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorySecondNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorySecondNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
