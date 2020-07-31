import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitcherUnavailableWinesComponent } from './switcher-unavailable-wines.component';

describe('SwitcherUnavailableWinesComponent', () => {
  let component: SwitcherUnavailableWinesComponent;
  let fixture: ComponentFixture<SwitcherUnavailableWinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitcherUnavailableWinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitcherUnavailableWinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
