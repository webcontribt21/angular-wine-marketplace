import {createAction, props} from '@ngrx/store';
import {ItemDetailTypeState} from './spirits.reducer';
import {SPIRITS__LOAD_SPIRITS, SPIRITS__LOAD_SPIRITS_FAILURE, SPIRITS__LOAD_SPIRITS_SUCCESS} from './spirits.types';

export const loadSpiritsSuccess: any = createAction(
  SPIRITS__LOAD_SPIRITS_SUCCESS,
  props<ItemDetailTypeState>()
);

export const loadSpiritsError: any = createAction(
  SPIRITS__LOAD_SPIRITS_FAILURE,
  props()
);

export const loadSpirits: any = createAction(
  SPIRITS__LOAD_SPIRITS,
);
