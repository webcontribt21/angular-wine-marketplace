import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

import { AdvertType } from 'src/app/shared/interfaces/home';

@Component({
  selector: 'app-advert-card',
  templateUrl: './advert-card.component.html',
  styleUrls: ['./advert-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdvertCardComponent implements OnInit {
  @Input() advert: any;

  constructor() {
  }

  ngOnInit() {
  }

}
