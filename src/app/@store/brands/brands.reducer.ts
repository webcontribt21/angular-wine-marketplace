import {Action, createReducer, on} from '@ngrx/store';
import {Brand} from '../../shared/interfaces/brands.interface';

import * as brandActions from './brands.actions';

export interface BrandState {
  brands: Brand[];
}

const initialState: BrandState = {
  brands: [],
};

const brandReducer = createReducer(
  initialState,
  on(brandActions.loadBrandsSuccess, (state, { brands }) => {
    return {
      ...state,
      brands: [...brands],
    };
  }),
);

export function reducer(state: BrandState | undefined, action: Action) {
  return brandReducer(state, action);
}
