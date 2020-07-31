import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-top-banner',
  templateUrl: './top-banner.component.html',
  styleUrls: ['./top-banner.component.scss']
})
export class TopBannerComponent implements OnInit {
  @Input() detail: any;
  @Input() mobileDetail: any;

  constructor() { }

  ngOnInit() {
  }

}
