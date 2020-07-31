import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortItemsControlComponent } from './sort-items-control.component';

describe('SortItemControlComponent', () => {
  let component: SortItemsControlComponent;
  let fixture: ComponentFixture<SortItemsControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortItemsControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortItemsControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
