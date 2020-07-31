import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserOrderState } from './user-order.reducer';

export const userOrderFeatureSelector = createFeatureSelector<UserOrderState>('userOrderReducer');

// orders
export const isLoadingOrdersSelector = createSelector(
  userOrderFeatureSelector,
  ({ isLoadingOrders }: UserOrderState) => isLoadingOrders
);

export const ordersSelector = createSelector(
  userOrderFeatureSelector,
  ({ orders }: UserOrderState) => orders
);

export const ordersLimitSelector = createSelector(
  userOrderFeatureSelector,
  ({ ordersLimit }: UserOrderState) => ordersLimit
);

export const ordersSkipSelector = createSelector(
  userOrderFeatureSelector,
  ({ ordersSkip }: UserOrderState) => ordersSkip
);

// order summaries
export const orderSummariesSelector = createSelector(
  userOrderFeatureSelector,
  ({ orderSummaries }: UserOrderState) => orderSummaries
);

// order shipment trackings
export const trackingResultStatesSelector = createSelector(
  userOrderFeatureSelector,
  ({ trackingResultStates }: UserOrderState) => trackingResultStates
);
