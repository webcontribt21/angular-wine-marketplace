import { Component, OnInit, Input } from '@angular/core';

import { ArticleType } from 'src/app/shared/interfaces/home';

@Component({
  selector: 'app-story-details',
  templateUrl: './story-details.component.html',
  styleUrls: ['./story-details.component.scss']
})
export class StoryDetailsComponent implements OnInit {
  @Input() article: ArticleType;

  constructor() { }

  ngOnInit() {
  }

}
