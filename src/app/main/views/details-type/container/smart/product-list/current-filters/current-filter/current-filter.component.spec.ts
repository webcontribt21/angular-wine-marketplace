import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentFilterComponent } from './current-filter.component';

describe('CurrentFilterComponent', () => {
  let component: CurrentFilterComponent;
  let fixture: ComponentFixture<CurrentFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
