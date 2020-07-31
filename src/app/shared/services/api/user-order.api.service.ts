import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import {
  ordersGQL,
  orderSummaryGQL,
  shipmentTrackingsGQL,
} from '../../../graphql/queries';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserOrderApiService {

  constructor(private apollo: Apollo) { }

  // orders
  getOrdersData(limit: number, skip: number): Observable<any> {
    return this.apollo
      .query({
        query: ordersGQL,
        variables: {
          limit,
          skip
        }
      })
      .pipe(
        map(result => result.data['Orders'] ? result.data['Orders'] : [])
      );
  }

  // orderSummary
  getOrderSummaryData(id: string): Observable<any> {
    return this.apollo
      .query({
        query: orderSummaryGQL,
        variables: {
          id
        }
      })
      .pipe(
        map(result => {
          return {
            orderSummary: result.data['OrderSummary'] ? result.data['OrderSummary'] : {},
            orderId: id
          }
        })
      );
  }

  // shipment trackings
  getTrackingsData(trackingNumber: string): Observable<any> {
    console.log('trackingNumber: ', trackingNumber)
    return this.apollo
      .query({
        query: shipmentTrackingsGQL,
        variables: {
          trackingNumber
        }
      })
      .pipe(
        map(result => {
          return {
            trackingResults: result.data['TrackingAramex']['results'][0] ? result.data['TrackingAramex']['results'][0]['value'] : [],
            trackingNumber
          }
        })
      );
  }
}
