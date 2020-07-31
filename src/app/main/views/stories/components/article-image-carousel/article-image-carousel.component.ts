import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-article-image-carousel',
  templateUrl: './article-image-carousel.component.html',
  styleUrls: ['./article-image-carousel.component.scss']
})
export class ArticleImageCarouselComponent implements OnInit {
  @Input() medias: Object[];

  slideConfig: Object;

  constructor() {
    this.slideConfig = {};
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
      centerMode: true,
      centerPadding: '22%',
      responsive: [
        {
          breakpoint: 600,
          settings: {
            infinite: false,
            slidesToShow: 1.22,
            centerMode: false
          }
        }
      ]
    };
  }

}
