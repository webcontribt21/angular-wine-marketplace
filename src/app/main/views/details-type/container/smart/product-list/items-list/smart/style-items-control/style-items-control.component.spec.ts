import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleItemsControlComponent } from './style-items-control.component';

describe('StyleItemControlComponent', () => {
  let component: StyleItemsControlComponent;
  let fixture: ComponentFixture<StyleItemsControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StyleItemsControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StyleItemsControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
