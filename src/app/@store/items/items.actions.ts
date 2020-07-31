import {createAction, props} from '@ngrx/store';
import {
  ITEMS__LOAD_FAILURE,
  ITEMS__LOAD_SUCCESS,
  ITEMS__LOAD_WITH_FILTERS,
  ITEMS__LOAD_WITH_LOAD_PAGE
} from './items.types';
import {Item} from '../../shared/interfaces/item.interface';

export const loadItemsSuccess: any = createAction(
  ITEMS__LOAD_SUCCESS,
  props<{ items: Item[] }>()
);

export const loadItemsError: any = createAction(
  ITEMS__LOAD_FAILURE,
  props()
);

export const loadItemsWithFilters: any = createAction(
  ITEMS__LOAD_WITH_FILTERS,
);

export const loadItemsWithLoadPage: any = createAction(
  ITEMS__LOAD_WITH_LOAD_PAGE,
  props<{ nextPage: number }>()
);
