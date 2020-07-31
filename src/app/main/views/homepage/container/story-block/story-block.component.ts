import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-story-block',
  templateUrl: './story-block.component.html',
  styleUrls: ['./story-block.component.scss']
})
export class StoryBlockComponent implements OnInit {
  @Input() advertLeft: any;
  @Input() storyRight: any;

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
