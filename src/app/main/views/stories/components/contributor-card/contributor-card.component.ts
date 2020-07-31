import { Component, OnInit, Input } from '@angular/core';
import { Author } from 'src/app/shared/interfaces/author.interface';

@Component({
  selector: 'app-contributor-card',
  templateUrl: './contributor-card.component.html',
  styleUrls: ['./contributor-card.component.scss']
})
export class ContributorCardComponent implements OnInit {
  @Input() author: Author;

  constructor() { }

  ngOnInit() {
  }

}
