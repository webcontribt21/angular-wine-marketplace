import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Author } from 'src/app/shared/interfaces/author.interface';

@Component({
  selector: 'app-author-card',
  templateUrl: './author-card.component.html',
  styleUrls: ['./author-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthorCardComponent implements OnInit {
  @Input() author: Author;

  constructor() {
  }

  ngOnInit() {
  }

}
