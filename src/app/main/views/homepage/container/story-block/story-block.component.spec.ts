import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryBlockComponent } from './story-block.component';

describe('StoryBlockComponent', () => {
  let component: StoryBlockComponent;
  let fixture: ComponentFixture<StoryBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
