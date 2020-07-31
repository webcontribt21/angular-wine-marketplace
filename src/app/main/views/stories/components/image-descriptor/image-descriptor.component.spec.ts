import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDescriptorComponent } from './image-descriptor.component';

describe('ImageDescriptorComponent', () => {
  let component: ImageDescriptorComponent;
  let fixture: ComponentFixture<ImageDescriptorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageDescriptorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageDescriptorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
