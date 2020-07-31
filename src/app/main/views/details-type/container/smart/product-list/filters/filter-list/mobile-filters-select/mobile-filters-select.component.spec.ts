import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileFiltersSelectComponent } from './mobile-filters-select.component';

describe('MobileFiltersSelectComponent', () => {
  let component: MobileFiltersSelectComponent;
  let fixture: ComponentFixture<MobileFiltersSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileFiltersSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileFiltersSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
