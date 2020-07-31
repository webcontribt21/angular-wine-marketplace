import {createAction, props} from '@ngrx/store';
import {ROUTER_NAVIGATED, ROUTER_NAVIGATION} from '@ngrx/router-store';

export const routeNavigation: any = createAction(
  ROUTER_NAVIGATION,
  props()
);

export const routeNavigated: any = createAction(
  ROUTER_NAVIGATED,
  props()
);
