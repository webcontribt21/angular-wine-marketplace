import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DataState } from './data.reducer';

export const dataFeatureSelector = createFeatureSelector<DataState>('dataReducer');

export const isLoadingVendorFiltersSelector = createSelector(
  dataFeatureSelector,
  ({ isLoadingVendorFilters }: DataState, props) => isLoadingVendorFilters
);

export const vendorFiltersSelector = createSelector(
  dataFeatureSelector,
  ({ vendorFilters }: DataState, props) => vendorFilters
);

export const isLoadedVendorFiltersSelector = createSelector(
  dataFeatureSelector,
  ({ isLoadedVendorFilters }: DataState, props) => isLoadedVendorFilters
);