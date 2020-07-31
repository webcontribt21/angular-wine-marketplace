import { Component, OnInit, Input } from '@angular/core';

import { AdvertType } from 'src/app/shared/interfaces/home';

@Component({
  selector: 'app-adverts',
  templateUrl: './adverts.component.html',
  styleUrls: ['./adverts.component.scss']
})
export class AdvertsComponent implements OnInit {
  @Input() adverts: AdvertType[];

  slideConfig: Object;

  constructor() {
    this.slideConfig = {};
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.slideConfig = {
      infinite: false,
      slidesToShow: 1.1,
      slidesToScroll: 1,
      arrows: false
    };
  }
}
