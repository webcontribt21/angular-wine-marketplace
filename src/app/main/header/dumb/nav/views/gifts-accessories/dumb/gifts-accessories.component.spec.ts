import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftsAccessoriesComponent } from './gifts-accessories.component';

describe('GiftsAccessoriesComponent', () => {
  let component: GiftsAccessoriesComponent;
  let fixture: ComponentFixture<GiftsAccessoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftsAccessoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftsAccessoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
