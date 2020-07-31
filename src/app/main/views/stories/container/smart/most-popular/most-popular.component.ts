import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/shared/interfaces/article.interface';

@Component({
  selector: 'app-most-popular',
  templateUrl: './most-popular.component.html',
  styleUrls: ['./most-popular.component.scss']
})
export class MostPopularComponent implements OnInit {
  @Input() mostPopularStories: Article[];
  @Input() isMobileView: boolean = false;

  displayStories: Article[];
  articleStyles: object;

  constructor() {
    this.displayStories = [];
    this.articleStyles = {
      categoryFont: '12px',
      padding: '0 30px 0',
      titleFont: '20px'
    };
  }

  ngOnInit() {
    this.init();
  }

  init() {
    if (this.isMobileView) {
      this.displayStories = this.mostPopularStories.slice(0, 5);
    } else {
      this.displayStories = this.mostPopularStories.slice(0, 6);
    }
  }

}
