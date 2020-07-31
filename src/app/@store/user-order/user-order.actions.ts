import { createAction, props } from '@ngrx/store';

import {
  CUSTOMER_ORDERS_LOAD,
  CUSTOMER_ORDERS_LOAD_SUCCESS,
  CUSTOMER_ORDERS_LOAD_FAIL,
  CUSTOMER_ORDER_SUMMARY_LOAD,
  CUSTOMER_ORDER_SUMMARY_LOAD_SUCCESS,
  CUSTOMER_ORDER_SUMMARY_LOAD_FAIL,
  CUSTOMER_ORDER_SUMMARIES_CLEAR,
  CUSTOMER_ORDER_SHIPMENT_TRACKING_LOAD,
  CUSTOMER_ORDER_SHIPMENT_TRACKING_LOAD_SUCCESS,
  CUSTOMER_ORDER_SHIPMENT_TRACKING_LOAD_FAIL,
  CUSTOMER_ORDER_SHIPMENT_TRACKING_CLEAR,
} from './user-order.types';
import { Order, OrderSummary, TrackingResult } from 'src/app/shared/interfaces/order.interface';

// load orders
export const loadCustomerOrders: any = createAction(
  CUSTOMER_ORDERS_LOAD,
  props<{ limit: number, skip: number }>()
);
export const loadCustomerOrdersSuccess: any = createAction(
  CUSTOMER_ORDERS_LOAD_SUCCESS,
  props<{ orders: Order[] }>()
);
export const loadCustomerOrdersError: any = createAction(CUSTOMER_ORDERS_LOAD_FAIL);

// load order summary
export const loadCustomerOrderSummary: any = createAction(
  CUSTOMER_ORDER_SUMMARY_LOAD,
  props<{ orderId: string }>()
);
export const loadCustomerOrderSummarySuccess: any = createAction(
  CUSTOMER_ORDER_SUMMARY_LOAD_SUCCESS,
  props<{ orderSummary: OrderSummary, orderId: string }>()
);
export const loadCustomerOrderSummaryError: any = createAction(CUSTOMER_ORDER_SUMMARY_LOAD_FAIL);
export const clearOrderSummaries: any = createAction(CUSTOMER_ORDER_SUMMARIES_CLEAR);

// load order shipment tracking
export const loadShipmentTracking: any = createAction(
  CUSTOMER_ORDER_SHIPMENT_TRACKING_LOAD,
  props<{ trackingNumber: string }>()
);
export const loadShipmentTrackingSuccess: any = createAction(
  CUSTOMER_ORDER_SHIPMENT_TRACKING_LOAD_SUCCESS,
  props<{ trackingNumber: string, trackingResults: TrackingResult[] }>()
);
export const loadShipmentTrackingError: any = createAction(CUSTOMER_ORDER_SHIPMENT_TRACKING_LOAD_FAIL);
export const clearShipmentTracking: any = createAction(CUSTOMER_ORDER_SHIPMENT_TRACKING_CLEAR);
