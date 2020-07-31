import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ErrorState} from './error.reducer';

const errorFeatureSelector = createFeatureSelector<ErrorState>('errorReducer');

export const errorSelector = createSelector(
  errorFeatureSelector,
  ({ errors }: ErrorState) => errors,
);
