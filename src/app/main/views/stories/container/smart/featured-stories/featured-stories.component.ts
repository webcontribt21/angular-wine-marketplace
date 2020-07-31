import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-featured-stories',
  templateUrl: './featured-stories.component.html',
  styleUrls: ['./featured-stories.component.scss']
})
export class FeaturedStoriesComponent implements OnInit {
  @Input() featuredStories: Object[];

  articleStyles: object;

  constructor() {
    this.articleStyles = {
      categoryFont: '12px',
      padding: '25px 30px 0',
      titleFont: '20px'
    };
  }

  ngOnInit() {
  }

}
