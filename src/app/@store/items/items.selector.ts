import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ItemsState } from './items.reducer';

export const itemsFeatureSelector = createFeatureSelector<ItemsState>('itemsReducer');

export const itemsSelector = createSelector(itemsFeatureSelector, ({ items }: ItemsState, props) => items);
