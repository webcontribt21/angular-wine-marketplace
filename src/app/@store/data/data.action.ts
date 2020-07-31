import {createAction, props} from '@ngrx/store';
import {DATA__LOAD_DATA, DATA__LOAD_DATA_SUCCESS, VENDOR_FILTER_DATA_REQUEST, VENDOR_FILTER_DATA_SUCCESS} from './data.types';
import { Supplier } from 'src/app/shared/interfaces/supplier.interface';

export const loadData: any = createAction(
  DATA__LOAD_DATA,
);

export const loadDataSuccess: any = createAction(
  DATA__LOAD_DATA_SUCCESS,
  props()
);

export const loadVendorFilterData: any = createAction(
  VENDOR_FILTER_DATA_REQUEST,
);

export const loadVendorFilterDataSuccess: any = createAction(
  VENDOR_FILTER_DATA_SUCCESS,
  props<{ vendorFilters: Supplier[] }>()
);
