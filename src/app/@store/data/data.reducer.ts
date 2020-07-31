import {Action, createReducer, on} from '@ngrx/store';

import * as dataActions from './data.action';
import { Supplier } from 'src/app/shared/interfaces/supplier.interface';

export interface DataState {
  isLoading: boolean;
  isLoaded: boolean;
  isLoadingVendorFilters: boolean;
  isLoadedVendorFilters: boolean;
  vendorFilters: Supplier[];
}

const initialState: DataState = {
  isLoading: false,
  isLoaded: false,
  isLoadingVendorFilters: false,
  isLoadedVendorFilters: false,
  vendorFilters: []
};

const dataReducer = createReducer(
  initialState,
  on(dataActions.loadData, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(dataActions.loadDataSuccess, (state) => {
    return {
      ...state,
      isLoading: false,
      isLoaded: true
    };
  }),

  on(dataActions.loadVendorFilterData, (state) => {
    return {
      ...state,
      isLoadingVendorFilters: true,
    };
  }),
  on(dataActions.loadVendorFilterDataSuccess, (state, { vendorFilters }) => {
    return {
      ...state,
      vendorFilters,
      isLoadingVendorFilters: false,
      isLoadedVendorFilters: true
    };
  }),
);

export function reducer(state: DataState | undefined, action: Action) {
  return dataReducer(state, action);
}
