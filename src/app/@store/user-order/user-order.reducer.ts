import { Action, createReducer, on } from '@ngrx/store';

import * as actions from './user-order.actions';
import { Order, OrderSummary, TrackingResult } from 'src/app/shared/interfaces/order.interface';

export interface UserOrderSummaryState {
  orderId: string;
  orderSummary: OrderSummary;
  isLoadingOrderSummary: boolean;
}

const initialOrderSummaryState: UserOrderSummaryState = {
  orderId: '',
  orderSummary: {
    order_id: ''
  },
  isLoadingOrderSummary: false
};

export interface TrackingResultsState {
  trackingNumber: string;
  trackingResults: TrackingResult[];
  isLoadingTrackingResults: boolean;
}

const initialTrackingResultState: TrackingResultsState = {
  trackingNumber: '',
  trackingResults: [],
  isLoadingTrackingResults:  false
};

export interface UserOrderState {
  orders: Order[];
  isLoadingOrders: boolean;
  ordersLimit: number;
  ordersSkip: number;
  orderSummaries: UserOrderSummaryState[];
  trackingResultStates: TrackingResultsState[];
}

const initialState: UserOrderState = {
  orders: [],
  isLoadingOrders: false,
  ordersLimit: 2,
  ordersSkip: 0,
  orderSummaries: [],
  trackingResultStates: []
};

const userOrderReducer = createReducer(
  initialState,
  // load orders
  on(actions.loadCustomerOrders, (state, { limit, skip }) => {
    return {
      ...state,
      isLoadingOrders: true,
      ordersLimit: limit,
      ordersSkip: skip
    };
  }),
  on(actions.loadCustomerOrdersSuccess, (state, { orders }) => {
    return {
      ...state,
      orders: orders,
      isLoadingOrders: false
    };
  }),
  // load order summaries
  on(actions.clearOrderSummaries, (state) => {
    return {
      ...state,
      orderSummaries: []
    };
  }),
  on(actions.loadCustomerOrderSummary, (state, { orderId }) => {
    const ind = state.orderSummaries.findIndex(orderSummary => orderSummary.orderId === orderId);

    if (ind === -1) {
      return {
        ...state,
        orderSummaries: [
          ...state.orderSummaries,
          {
            ...initialOrderSummaryState,
            isLoadingOrderSummary: true,
            orderId,
          }
        ]
      };
    }

    return {
      ...state,
      orderSummaries: [
        ...state.orderSummaries.slice(0, ind),
        {
          ...initialOrderSummaryState,
          isLoadingOrderSummary: true,
          orderId
        },
        ...state.orderSummaries.slice(ind + 1)
      ]
    };
  }),
  on(actions.loadCustomerOrderSummarySuccess, (state, { orderSummary, orderId }) => {
    const ind = state.orderSummaries.findIndex(orderSummary => orderSummary.orderId === orderId);

    return {
      ...state,
      orderSummaries: [
        ...state.orderSummaries.slice(0, ind),
        {
          ...state.orderSummaries[ind],
          orderSummary,
          isLoadingOrderSummary: false
        },
        ...state.orderSummaries.slice(ind + 1)
      ]
    };
  }),
  // load order shipment trackings
  on(actions.clearOrderSummaries, (state) => {
    return {
      ...state,
      trackingResultStates: []
    };
  }),
  on(actions.loadShipmentTracking, (state, { trackingNumber }) => {
    const ind = state.trackingResultStates.findIndex(trackingResultState => trackingResultState.trackingNumber === trackingNumber);

    if (ind === -1) {
      return {
        ...state,
        trackingResultStates: [
          ...state.trackingResultStates,
          {
            ...initialTrackingResultState,
            isLoadingTrackingResults: true,
            trackingNumber,
          }
        ]
      };
    }

    return {
      ...state,
      trackingResultStates: [
        ...state.trackingResultStates.slice(0, ind),
        {
          ...initialTrackingResultState,
          isLoadingTrackingResults: true,
          trackingNumber
        },
        ...state.trackingResultStates.slice(ind + 1)
      ]
    };
  }),
  on(actions.loadShipmentTrackingSuccess, (state, { trackingNumber, trackingResults }) => {
    const ind = state.trackingResultStates.findIndex(trackingResultState => trackingResultState.trackingNumber === trackingNumber);

    return {
      ...state,
      trackingResultStates: [
        ...state.trackingResultStates.slice(0, ind),
        {
          ...state.trackingResultStates[ind],
          trackingResults,
          isLoadingTrackingResults: false
        },
        ...state.trackingResultStates.slice(ind + 1)
      ]
    };
  }),
);

export function reducer(state: UserOrderState | undefined, action: Action) {
  return userOrderReducer(state, action);
}
