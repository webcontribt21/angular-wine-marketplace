import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ShopState} from './shop.reducer';
import { Shop } from 'src/app/shared/interfaces/shop.interface';

export const shopFeatureSelector = createFeatureSelector<ShopState>('shopReducer');

export const shopSelector = createSelector(
  shopFeatureSelector,
  ({ shop }: ShopState, props) => shop
);
