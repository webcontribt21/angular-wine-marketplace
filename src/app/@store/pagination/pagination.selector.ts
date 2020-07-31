import {createFeatureSelector, createSelector} from '@ngrx/store';
import {PaginationState} from './pagination.reducer';

export const paginationFeatureSelector = createFeatureSelector<PaginationState>('paginationReducer');

export const paginationSelector = createSelector(
  paginationFeatureSelector,
  ( { pagination }: PaginationState, props) => pagination
);
