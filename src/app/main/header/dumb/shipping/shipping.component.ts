import {Component, Input, OnInit} from '@angular/core';
import {HEADER_ICONS} from '../../../../shared/constants';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {
  @Input() downArrow: string;
  country: string = 'South Africa';

  constructor() { }

  ngOnInit() {
  }

}
