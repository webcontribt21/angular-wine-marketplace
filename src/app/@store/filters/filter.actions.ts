import {createAction, props} from '@ngrx/store';
import {
  FILTERS__ADD_CURRENT_FILTER,
  FILTERS__CLEAR_ALL_CURRENT_FILTERS,
  FILTERS__LOAD,
  FILTERS__LOAD_FAILURE,
  FILTERS__LOAD_SUCCESS,
  FILTERS__REMOVE_CURRENT_FILTER,
  FILTERS__TOGGLE_CURRENT_FILTER,
  FILTERS__UPDATE_COUNTS,
  FILTERS__UPDATE_COUNTS_SUCCESS,
  FILTERS__ADD_ROUTE_CURRENT_FILTERS,
  FILTERS__TOGGLE_SHOW_UNAVAIASBLE_WINES,
  FILTERS__SET_PRICE_RANGE_VALUES,
  FILTERS__CLEAR_PRICE_RANGE_VALUES,
  FILTERS__SET_RATING_RANGE_VALUES,
  FILTERS__CLEAR_RATING_RANGE_VALUES,
  FILTERS__TOGGLE_FILTER_PANEL_OPEN,
  SET_WINE_LIST_SORT_VALUE,
  CLEAR_WINE_LIST_SORT_VALUE
} from './filter.types';
import {FilterData, Filter} from '../../shared/interfaces/filter.interface';
import { Facet } from 'src/app/shared/interfaces/facet.interface';

export const updateFiltersCountsSuccess: any = createAction(
  FILTERS__UPDATE_COUNTS_SUCCESS
);

export const updateFiltersCounts: any = createAction(
  FILTERS__UPDATE_COUNTS,
  props<{ facets: Facet[] }>()
);

export const loadFiltersSuccess: any = createAction(
  FILTERS__LOAD_SUCCESS,
  props<{ filters: any[] }>()
);

export const loadFiltersError: any = createAction(
  FILTERS__LOAD_FAILURE,
  props()
);

export const loadFilters: any = createAction(
  FILTERS__LOAD,
);

export const addCustomFilter: any = createAction(
  FILTERS__ADD_CURRENT_FILTER,
  props<FilterData>()
);

export const removeCustomFilter: any = createAction(
  FILTERS__REMOVE_CURRENT_FILTER,
  props<FilterData>()
);

export const toggleCurrentFilter: any = createAction(
  FILTERS__TOGGLE_CURRENT_FILTER,
  props<FilterData>()
);

export const clearCurrentFilters: any = createAction(
  FILTERS__CLEAR_ALL_CURRENT_FILTERS,
);

export const addRouteCustomFilters: any = createAction(
  FILTERS__ADD_ROUTE_CURRENT_FILTERS,
  props<{ customFilters: FilterData[], ratingRangeValues: number[], priceRangeValues: number[], showUnavailableWines: boolean }>()
);

export const toggleShowUnavailableWines: any = createAction(
  FILTERS__TOGGLE_SHOW_UNAVAIASBLE_WINES
);

export const setPriceRangeValues: any = createAction(
  FILTERS__SET_PRICE_RANGE_VALUES,
  props<{ priceRangeValues: number[] }>()
);

export const clearPriceRangeValues: any = createAction(
  FILTERS__CLEAR_PRICE_RANGE_VALUES
);

export const setRatingRangeValues: any = createAction(
  FILTERS__SET_RATING_RANGE_VALUES,
  props<{ ratingRangeValues: number[] }>()
);

export const clearRatingRangeValues: any = createAction(
  FILTERS__CLEAR_RATING_RANGE_VALUES
);

export const togglePanelOpen: any = createAction(
  FILTERS__TOGGLE_FILTER_PANEL_OPEN,
  props<{ filter: Filter[] }>()
);

export const setWineListSortValue: any = createAction(
  SET_WINE_LIST_SORT_VALUE,
  props<{ sort: string, nextPage: number }>()
);

export const clearWineListSortValue: any = createAction(
  CLEAR_WINE_LIST_SORT_VALUE
);
