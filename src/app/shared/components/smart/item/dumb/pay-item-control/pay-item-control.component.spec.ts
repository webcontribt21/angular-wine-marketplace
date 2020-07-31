import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayItemControlComponent } from './pay-item-control.component';

describe('PayItemControlComponent', () => {
  let component: PayItemControlComponent;
  let fixture: ComponentFixture<PayItemControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayItemControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayItemControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
