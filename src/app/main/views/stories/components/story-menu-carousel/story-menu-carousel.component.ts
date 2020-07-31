import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-story-menu-carousel',
  templateUrl: './story-menu-carousel.component.html',
  styleUrls: ['./story-menu-carousel.component.scss']
})
export class StoryMenuCarouselComponent implements OnInit {
  @Input() targetContentLink: string;
  sliders: Object[];

  constructor() {
    this.sliders = [
      {
        label: 'Featured Stories',
        link: 'featured-stories'
      },
      {
        label: 'Most Popular',
        link: 'most-popular'
      },
      {
        label: 'Top Contributors',
        link: 'top-contributors'
      },
      {
        label: 'Videos',
        link: 'videos'
      },
    ];
  }

  ngOnInit() {
  }

}
