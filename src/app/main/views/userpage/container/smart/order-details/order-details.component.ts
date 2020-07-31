import { Component, OnInit, Input } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { OrderSummary } from 'src/app/shared/interfaces/order.interface';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  @Input() orderSummary: OrderSummary;

  constructor() { }

  ngOnInit() {
    console.log('orderSummary: ', this.orderSummary)
  }

}
