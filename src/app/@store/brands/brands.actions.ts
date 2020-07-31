import {createAction, props} from '@ngrx/store';
import {BRANDS__LOAD, BRANDS__LOAD_FAILURE, BRANDS__LOAD_SUCCESS} from './brands.types';
import {Brand} from '../../shared/interfaces/brands.interface';

export const loadBrandsSuccess: any = createAction(
  BRANDS__LOAD_SUCCESS,
  props<{ brands: Brand[] }>()
);

export const loadBrandsError: any = createAction(
  BRANDS__LOAD_FAILURE,
  props()
);

export const loadBrands: any = createAction(
  BRANDS__LOAD,
);
