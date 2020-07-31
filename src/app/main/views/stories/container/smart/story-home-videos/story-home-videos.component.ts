import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-story-home-videos',
  templateUrl: './story-home-videos.component.html',
  styleUrls: ['./story-home-videos.component.scss']
})
export class StoryHomeVideosComponent implements OnInit {
  @Input() videos: Object[];

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
