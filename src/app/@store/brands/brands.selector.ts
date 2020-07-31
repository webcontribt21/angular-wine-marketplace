import {createFeatureSelector, createSelector} from '@ngrx/store';
import {BrandState} from './brands.reducer';

export const brandFeatureSelector = createFeatureSelector<BrandState>('brandReducer');

export const brandsSelector = createSelector(
  brandFeatureSelector,
  ({ brands }: BrandState, props) => brands
);
