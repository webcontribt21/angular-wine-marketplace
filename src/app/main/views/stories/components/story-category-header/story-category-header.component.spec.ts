import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryCategoryHeaderComponent } from './story-category-header.component';

describe('StoryCategoryHeaderComponent', () => {
  let component: StoryCategoryHeaderComponent;
  let fixture: ComponentFixture<StoryCategoryHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryCategoryHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryCategoryHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
