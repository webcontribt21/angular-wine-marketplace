import { Component, OnInit, Input } from '@angular/core';
import { Author } from 'src/app/shared/interfaces/author.interface';

@Component({
  selector: 'app-top-contributors',
  templateUrl: './top-contributors.component.html',
  styleUrls: ['./top-contributors.component.scss']
})
export class TopContributorsComponent implements OnInit {
  @Input() topContributors: Author[];
  @Input() isMobileView: boolean = false;

  contributors: Author[];

  constructor() {
    this.contributors = [];
  }

  ngOnInit() {
    if (this.isMobileView) {
      this.contributors = this.topContributors.slice(0, 7);
    } else {
      this.contributors = this.topContributors.slice(0, 6);
    }
  }

}
