import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryCategoryAllComponent } from './story-category-all.component';

describe('StoryCategoryAllComponent', () => {
  let component: StoryCategoryAllComponent;
  let fixture: ComponentFixture<StoryCategoryAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryCategoryAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryCategoryAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
