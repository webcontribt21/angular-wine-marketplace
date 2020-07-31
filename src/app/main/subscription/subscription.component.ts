import { Component, OnInit } from '@angular/core';
import {IMG_URLS} from '../../shared/constants';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

  letter: string = IMG_URLS.LETTER;

  constructor() { }

  ngOnInit() {
  }

  addSubscribe(name, email) {

  }

}
