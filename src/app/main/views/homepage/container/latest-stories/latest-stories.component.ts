import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Article } from 'src/app/shared/interfaces/article.interface';

@Component({
  selector: 'app-latest-stories',
  templateUrl: './latest-stories.component.html',
  styleUrls: ['./latest-stories.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LatestStoriesComponent implements OnInit {
  @Input() midArticles: Article[];

  slideConfig: Object;
  isDraggingCarousel: boolean;

  constructor() {
    this.isDraggingCarousel = false;
  }

  ngOnInit() {
    this.slideConfig = {
      infinite: false,
      slidesToShow: 1.1,
      slidesToScroll: 1,
      arrows: false
    };
  }

  beforeChange(event: any) {
    this.isDraggingCarousel = true;
  }

  afterChange(event: any) {
    this.isDraggingCarousel = false;
  }

}
