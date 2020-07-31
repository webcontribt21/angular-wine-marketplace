import {Action, createReducer, on} from '@ngrx/store';
import {Shop} from '../../shared/interfaces/shop.interface';

import * as shopActions from './shop.actions';

export interface ShopState {
  shop: Shop;
}

const initialState: ShopState = {
  shop: null,
};

const shopReducer = createReducer(
  initialState,
  on(shopActions.loadShopSuccess, (state, { shop }) => {
    return {
      ...state,
      shop,
    }
  }),
);

export function reducer(state: ShopState | undefined, action: Action) {
  return shopReducer(state, action);
}
