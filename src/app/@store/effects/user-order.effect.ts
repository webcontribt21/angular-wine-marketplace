import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, catchError, withLatestFrom, switchMap, mergeMap } from 'rxjs/operators';
import { ErrorResponse } from 'apollo-link-error';

import { UserOrderApiService } from 'src/app/shared/services/api';
import {
  loadCustomerOrders,
  loadCustomerOrdersSuccess,
  ordersLimitSelector,
  ordersSkipSelector,
  loadCustomerOrderSummary,
  loadCustomerOrderSummarySuccess,
  loadShipmentTracking,
  loadShipmentTrackingSuccess,
} from '../user-order';
import * as errorActions from '../errors';
import { Order, OrderSummary } from 'src/app/shared/interfaces/order.interface';
import { RootState } from '../reducers/reducers';
import { Store, select } from '@ngrx/store';

@Injectable()
export class UserOrderEffect {

  // orders
  loadOrders$: Observable<any> = createEffect(() => this.action$.pipe(
    ofType(loadCustomerOrders),
    withLatestFrom(
      this.store$.pipe(select(ordersLimitSelector)),
      this.store$.pipe(select(ordersSkipSelector))
    ),
    switchMap(([props, limit, skip]) =>
      this.userOrderApiService.getOrdersData(limit, skip)
      .pipe(
        map((orders: Order[]) => loadCustomerOrdersSuccess({ orders })),
        catchError((responseError: ErrorResponse) => {
          if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
            return of(errorActions.setRequestErrors({ errors: [...responseError.graphQLErrors] }))
          }
        })
      )
    )
  ));

  // order summaries
  loadOrderSummaries$: Observable<any> = createEffect(() => this.action$.pipe(
    ofType(loadCustomerOrderSummary),
    mergeMap(({ orderId }) =>
      this.userOrderApiService.getOrderSummaryData(orderId)
      .pipe(
        map(({orderSummary, orderId}) => loadCustomerOrderSummarySuccess({ orderSummary, orderId})),
        catchError((responseError: ErrorResponse) => {
          if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
            return of(errorActions.setRequestErrors({ errors: [...responseError.graphQLErrors] }))
          }
        })
      )
    )
  ));

  // order shipment tracking
  loadShipmentTracking$: Observable<any> = createEffect(() => this.action$.pipe(
    ofType(loadShipmentTracking),
    mergeMap(({ trackingNumber }) =>
      this.userOrderApiService.getTrackingsData(trackingNumber)
      .pipe(
        map(({trackingResults, trackingNumber}) => loadShipmentTrackingSuccess({ trackingResults, trackingNumber})),
        catchError((responseError: ErrorResponse) => {
          if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
            return of(errorActions.setRequestErrors({ errors: [...responseError.graphQLErrors] }))
          }
        })
      )
    )
  ));

  constructor(
    private action$: Actions,
    private store$: Store<RootState>,
    private userOrderApiService: UserOrderApiService
  ) {}
}
