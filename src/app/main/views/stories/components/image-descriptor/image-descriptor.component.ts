import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image-descriptor',
  templateUrl: './image-descriptor.component.html',
  styleUrls: ['./image-descriptor.component.scss']
})
export class ImageDescriptorComponent implements OnInit {
  @Input() description: string;
  @Input() category: string;
  @Input() desktopImageUrl: string;
  @Input() mobileImageUrl: string;

  constructor() { }

  ngOnInit() {
  }

}
