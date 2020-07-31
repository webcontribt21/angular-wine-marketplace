import { Component, OnInit, Input } from '@angular/core';
import { Author } from 'src/app/shared/interfaces/author.interface';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {
  @Input() authors: Author[];

  updatedAuthors: Author[];

  constructor() {
    this.updatedAuthors = [];
  }

  ngOnInit() {
    this.updateAuthors();
  }

  updateAuthors() {
    this.updatedAuthors = this.authors.map(author => {
      const newAuthor = Object.assign({}, author);

      if (newAuthor.articles.length > 3) {
        newAuthor.articles = newAuthor.articles.slice(0, 3);
      }

      return newAuthor;
    });
  }
}
