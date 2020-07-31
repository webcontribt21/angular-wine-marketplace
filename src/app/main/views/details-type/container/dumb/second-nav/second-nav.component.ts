import {Component, Input, OnInit} from '@angular/core';
import {ItemDetailTypeValue} from '../../../../../../shared/interfaces/item-detail-type-value.interface';

@Component({
  selector: 'app-second-nav',
  templateUrl: './second-nav.component.html',
  styleUrls: ['./second-nav.component.scss']
})
export class SecondNavComponent implements OnInit {
  @Input() links: ItemDetailTypeValue[] = [];

  constructor() { }

  ngOnInit() {
  }

}
