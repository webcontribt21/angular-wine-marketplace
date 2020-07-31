import { Component, OnInit, Input } from '@angular/core';

import { LinkType } from 'src/app/shared/interfaces/footer';

@Component({
  selector: 'app-link-card',
  templateUrl: './link-card.component.html',
  styleUrls: ['./link-card.component.scss']
})
export class LinkCardComponent implements OnInit {
  @Input() link: LinkType;
  @Input() type: string = '';
  @Input() links: LinkType[];


  constructor() {
  }

  ngOnInit() {
    //  console.log('qqqqqqqqqqqqqq')
  }

}
