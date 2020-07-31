import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadscrumbsComponent } from './breadscrumbs.component';

describe('BreadscrumbsComponent', () => {
  let component: BreadscrumbsComponent;
  let fixture: ComponentFixture<BreadscrumbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreadscrumbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadscrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
