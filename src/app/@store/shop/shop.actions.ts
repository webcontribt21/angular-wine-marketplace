import {createAction, props} from '@ngrx/store';
import {
  SHOP__LOAD,
  SHOP__LOAD_FAILURE,
  SHOP__LOAD_SUCCESS
} from './shop.types';
import {Shop} from '../../shared/interfaces/shop.interface';

export const loadShopSuccess: any = createAction(
  SHOP__LOAD_SUCCESS,
  props<{ shop: Shop }>()
);

export const loadShopError: any = createAction(
  SHOP__LOAD_FAILURE,
  props()
);

export const loadShop: any = createAction(
  SHOP__LOAD,
);
