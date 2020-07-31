import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { RootState } from 'src/app/@store/reducers/reducers';
import { Order } from 'src/app/shared/interfaces/order.interface';
import {
  isLoadingOrdersSelector,
  ordersSelector,
  loadCustomerOrders,
  clearOrderSummaries,
  clearShipmentTracking,
} from 'src/app/@store/user-order';

@Component({
  selector: 'app-user-order-history',
  templateUrl: './user-order-history.component.html',
  styleUrls: ['./user-order-history.component.scss']
})
export class UserOrderHistoryComponent implements OnInit {
  orders$: Observable<Order[]> = this.store$.pipe(select(ordersSelector));
  isOrders$: Observable<boolean> = this.store$.pipe(select(isLoadingOrdersSelector));

  first: number;

  constructor(private store$: Store<RootState>) {
    this.first = 0;
  }

  ngOnInit() {
    this.loadOrders(2, 0);
  }

  onPaginate(event: Object) {
    this.first = event['first'];
    this.loadOrders(2, this.first);
  }

  loadOrders(limit: number, skip: number) {
    this.store$.dispatch(clearOrderSummaries());
    this.store$.dispatch(clearShipmentTracking());
    this.store$.dispatch(loadCustomerOrders({
      limit: limit,
      skip: skip
    }));
  }

}
