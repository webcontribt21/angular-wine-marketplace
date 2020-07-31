import {createFeatureSelector, createSelector} from '@ngrx/store';
import {DataState} from './data.reducer';

export const dataFeatureSelector = createFeatureSelector<DataState>('dataReducer');

export const isLoadingDataSelector = createSelector(
  dataFeatureSelector,
  ({ isLoading }: DataState, props) => isLoading

);
