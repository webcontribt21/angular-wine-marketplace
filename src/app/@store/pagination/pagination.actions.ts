import {createAction, props} from '@ngrx/store';
import {
  PAGINATION__LOAD_FAILURE,
  PAGINATION__LOAD_SUCCESS,
  PAGINATION__LOAD_WITH_FILTERS,
  PAGINATION__LOAD_WITH_LOAD_PAGE
} from './pagination.types';
import {Page} from '../../shared/interfaces/page.interface';

export const loadPAGINATIONSuccess: any = createAction(
  PAGINATION__LOAD_SUCCESS,
  props<{ pagination: Page}>()
);

export const loadPAGINATIONError: any = createAction(
  PAGINATION__LOAD_FAILURE,
  props()
);

export const loadPAGINATIONWithFilters: any = createAction(
  PAGINATION__LOAD_WITH_FILTERS,
);

export const loadPAGINATIONWithLoadPage: any = createAction(
  PAGINATION__LOAD_WITH_LOAD_PAGE,
  props()
);
