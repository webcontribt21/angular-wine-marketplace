import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-story-view',
  templateUrl: './story-view.component.html',
  styleUrls: ['./story-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StoryViewComponent implements OnInit {
  @Input() articles: Object[];
  @Input() type: string = 'multi';

  throttleTime: number;
  noLink: boolean;

  constructor() {
    this.throttleTime = 0;
    this.noLink = false;
  }

  ngOnInit() {
    this.throttleTime = Math.floor(this.articles.length / 25) * 10;
  }

  onMove(isMove: boolean) {
    this.noLink = isMove;
  }

}
