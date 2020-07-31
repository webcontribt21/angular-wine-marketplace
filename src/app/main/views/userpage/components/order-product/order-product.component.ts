import { Component, OnInit, Input } from '@angular/core';
import { OrderItem } from 'src/app/shared/interfaces/order.interface';

@Component({
  selector: 'app-order-product',
  templateUrl: './order-product.component.html',
  styleUrls: ['./order-product.component.scss']
})
export class OrderProductComponent implements OnInit {
  @Input() shipmentItem: OrderItem;

  constructor() { }

  ngOnInit() {
  }

}
