import { Component, OnInit, Input } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { RootState } from 'src/app/@store/reducers/reducers';
import { Order } from 'src/app/shared/interfaces/order.interface';
import {
  orderSummariesSelector,
  loadCustomerOrderSummary
} from 'src/app/@store/user-order';
import { UserOrderSummaryState } from 'src/app/@store/user-order/user-order.reducer';

@Component({
  selector: 'app-user-order-list',
  templateUrl: './user-order-list.component.html',
  styleUrls: ['./user-order-list.component.scss']
})
export class UserOrderListComponent implements OnInit {
  @Input() orders: Order[];

  orderSummaries$: Observable<UserOrderSummaryState[]> = this.store$.pipe(select(orderSummariesSelector));

  constructor(private store$: Store<RootState>) { }

  ngOnInit() {
    if (this.orders.length > 0) {
      for (const order of this.orders) {
        this.store$.dispatch(loadCustomerOrderSummary({
          orderId: order._id
        }));
      }
    }
  }

}
