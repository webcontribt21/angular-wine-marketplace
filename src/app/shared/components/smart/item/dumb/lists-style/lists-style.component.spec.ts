import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsStyleComponent } from './lists-style.component';

describe('ListsStyleComponent', () => {
  let component: ListsStyleComponent;
  let fixture: ComponentFixture<ListsStyleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListsStyleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
