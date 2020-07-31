import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  ViewChild
} from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'app-wines-carousel',
  templateUrl: './wines-carousel.component.html',
  styleUrls: ['./wines-carousel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WinesCarouselComponent implements OnInit {
  @Input() wines: any[];
  @Input() defaultSlidesToShow: number = 6;
  @Input() asRelatedItems = false;

  @ViewChild('slickModal', { static: false }) slickModal: SlickCarouselComponent;

  slideConfig: any;
  isDraggingCarousel: boolean;
  beforeSlide: number;

  constructor() { 
    this.slideConfig = {};
    this.isDraggingCarousel = false;
    this.beforeSlide = -1;
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.slideConfig = {
      infinite: true,
      slidesToShow: this.defaultSlidesToShow,
      slidesToScroll: 1,
      cssEase: 'ease-in-out',
      prevArrow: '<div class="carousel-arrow previous"><img src="/assets/img/icons/left-chevron.svg" alt="previous"></div>',
      nextArrow: '<div class="carousel-arrow next"><img src="/assets/img/icons/right-chevron.svg" alt="next"></div>',
      // autoplay: true,
      // autoplaySpeed: 3000,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: this.defaultSlidesToShow >= 4 ? 4 : this.defaultSlidesToShow,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 900,
          settings: {
            slidesToShow: this.defaultSlidesToShow >= 3 ? 3 : this.defaultSlidesToShow,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            infinite: false,
            slidesToScroll: 1,
            slidesToShow: this.defaultSlidesToShow >= 2.2 ? 2.2 : this.defaultSlidesToShow,
          }
        }
      ]
    };
  }

  beforeChange(event: any) {
    this.isDraggingCarousel = true;
    this.beforeSlide = event['currentSlide'];
  }

  afterChange(event: any) {
    const lastSlide = this.wines.length - 2;
    const currentSlide = event['currentSlide'];

    if (event['slick']['activeBreakpoint'] === 768) {
      if (
        currentSlide === lastSlide
        && !this.isDraggingCarousel
        && this.beforeSlide === currentSlide
      ) {
        this.slickModal.slickGoTo(0);
      }

      if (
        currentSlide === 0
        && !this.isDraggingCarousel
        && this.beforeSlide <= 0
      ) {
        this.slickModal.slickGoTo(lastSlide);
      }
    }

    this.beforeSlide = currentSlide;
    this.isDraggingCarousel = false;
  }
}
