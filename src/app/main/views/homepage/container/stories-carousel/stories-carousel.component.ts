import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

import { ArticleType, ArticleContentType } from 'src/app/shared/interfaces/home';

@Component({
  selector: 'app-stories-carousel',
  templateUrl: './stories-carousel.component.html',
  styleUrls: ['./stories-carousel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StoriesCarouselComponent implements OnInit {
  @Input() articles: ArticleType[];

  slideConfig: Object;

  constructor() {
    this.slideConfig = {};
    this.articles = [];
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.slideConfig = {
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: '<div class="carousel-arrow previous"><i class="pi pi-chevron-left"></i></div>',
      nextArrow: '<div class="carousel-arrow next"><i class="pi pi-chevron-right"></i></div>',
      autoplay: true,
      autoplaySpeed: 4000
    };
  }
}
