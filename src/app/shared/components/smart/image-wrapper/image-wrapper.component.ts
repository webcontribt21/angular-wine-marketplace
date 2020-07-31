import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image-wrapper',
  templateUrl: './image-wrapper.component.html',
  styleUrls: ['./image-wrapper.component.scss']
})
export class ImageWrapperComponent implements OnInit {
  @Input() desktopImageUrl: string;
  @Input() mobileImageUrl: string;
  @Input() bgColor: string = '';
  @Input() heightPercent: string = '';
  @Input() bgSize: string = 'cover';

  constructor() { }

  ngOnInit() {
  }

}
