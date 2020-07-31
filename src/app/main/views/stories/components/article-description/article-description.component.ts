import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-article-description',
  templateUrl: './article-description.component.html',
  styleUrls: ['./article-description.component.scss']
})
export class ArticleDescriptionComponent implements OnInit {
  @Input() title: string;
  @Input() titleShort: string;
  @Input() tagline: string;
  @Input() authorName: string;
  @Input() date: string;

  constructor() { }

  ngOnInit() {
  }

}
