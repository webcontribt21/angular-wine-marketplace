import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsSaleComponent } from './terms-sale.component';

describe('TermsSaleComponent', () => {
  let component: TermsSaleComponent;
  let fixture: ComponentFixture<TermsSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
