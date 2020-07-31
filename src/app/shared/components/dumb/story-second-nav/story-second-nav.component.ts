import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-story-second-nav',
  templateUrl: './story-second-nav.component.html',
  styleUrls: ['./story-second-nav.component.scss']
})
export class StorySecondNavComponent implements OnInit, OnChanges {
  @Input() categories: Object[];
  @Output() closeNavMenu$: EventEmitter<any> = new EventEmitter<any>();

  storiesMenus: Object[];

  constructor() {
    this.storiesMenus = [];
  }

  ngOnInit() {
    this.init();
  }

  ngOnChanges() {
    this.init();
  }

  init() {
    this.storiesMenus = [
      {
        name: 'Home',
        link: 'home'
      },
      {
        name: 'All Categories',
        link: 'all'
      }
    ];

    for (let index = 0; index < this.categories.length; index++) {
      const category = this.categories[index];

      this.storiesMenus.push({
        name: category['description'],
        link: `category/${category['articleCategoryNo']}`
      });
    }

    this.storiesMenus.push({
      name: 'Contributors',
      link: 'contributors'
    });
  }

  onClose() {
    this.closeNavMenu$.emit();
  }

}
