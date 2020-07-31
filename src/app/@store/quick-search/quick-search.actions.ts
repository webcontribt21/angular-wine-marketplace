
import { createAction, props } from '@ngrx/store';

import {
  QUICK_SEARCH_POPULAR_LOAD,
  QUICK_SEARCH_POPULAR_LOAD_SUCCESS,
  QUICK_SEARCH_POPULAR_LOAD_FAIL,
  QUICK_SEARCH_QUERY_LOAD,
  QUICK_SEARCH_QUERY_LOAD_SUCCESS,
  QUICK_SEARCH_QUERY_LOAD_FAIL,
  SET_QUICK_SEARCH_QUERY_TEXT_VALUE,
} from './quick-search.types';
import {
  QuickSearchType
} from 'src/app/shared/interfaces/quick-search';

export const loadQuickSearchPopular: any = createAction(QUICK_SEARCH_POPULAR_LOAD);
export const loadQuickSearchPopularSuccess: any = createAction(
  QUICK_SEARCH_POPULAR_LOAD_SUCCESS,
  props<{ contents: object[] }>()
);
export const loadQuickSearchPopularError: any = createAction(QUICK_SEARCH_POPULAR_LOAD_FAIL);

export const loadQuickSearchQuery: any = createAction(QUICK_SEARCH_QUERY_LOAD);
export const loadQuickSearchQuerySuccess: any = createAction(
  QUICK_SEARCH_QUERY_LOAD_SUCCESS,
  props<{ contents: object[] }>()
);
export const loadQuickSearchQueryError: any = createAction(QUICK_SEARCH_QUERY_LOAD_FAIL);

export const setQuickSearchQueryTextSelectorValue: any = createAction(
  SET_QUICK_SEARCH_QUERY_TEXT_VALUE,
  props<{ quicksearchQueryText: string }>()
);




