import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRouter from '@ngrx/router-store';
import { RouterStateUrl } from './custom-route-serializer';

export type MergedRouteReducerState = fromRouter.RouterReducerState<RouterStateUrl>;

export interface State {
  router: MergedRouteReducerState;
}

export const selectRouter = createFeatureSelector<MergedRouteReducerState>('router');

export const selectRouterState = createSelector(selectRouter, (router) => router && router.state);

export const selectRouteId = createSelector(selectRouterState, (state) => state && state.params && state.params.id);
export const selectRouteType = createSelector(selectRouterState, (state) => state && state.params && state.params.type);
export const selectRouteDescription = createSelector(selectRouterState, (state) => state && state.params && state.params.description);
export const selectRouteSegments = createSelector(selectRouterState, (state) => (state && state.segments) || []);

// const {
//   selectQueryParams, // select the current route query params
//   selectQueryParam, // factory function to select a query param
//   selectRouteParams, // select the current route params
//   selectRouteParam, // factory function to select a route param
//   selectRouteData, // select the current route data
//   selectUrl // select the current url
// } = fromRouter.getSelectors(selectRouter);

// export const selectRouteId = selectRouteParam('id');
// export const selectRouteType = selectRouteParam('type');
// export const selectRouteDescription = selectRouteParam('description');
// export const selectStatus = selectQueryParam('status');
// export const selectRouteParams1 = selectRouteParams;
