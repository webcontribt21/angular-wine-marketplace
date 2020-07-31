import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryContributorComponent } from './story-contributor.component';

describe('StoryContributorComponent', () => {
  let component: StoryContributorComponent;
  let fixture: ComponentFixture<StoryContributorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryContributorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryContributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
