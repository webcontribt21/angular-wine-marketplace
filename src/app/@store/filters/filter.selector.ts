import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FilterState } from './filter.reducer';
import { selectRouteType, selectRouteDescription, selectRouteSegments } from '../router/router.selector';
import { FilterData } from 'src/app/shared/interfaces/filter.interface';
import { UrlFriendlyPipe } from 'src/app/shared/pipes/url-friendly.pipe';
import { ProductListHelper } from 'src/app/shared/helpers';

export const filterFeatureSelector = createFeatureSelector<FilterState>('filterReducer');

export const filtersSelector = createSelector(filterFeatureSelector, ({ filters }: FilterState, props) => filters);

export const showUnavailableWinesSelector = createSelector(
  filterFeatureSelector,
  ({ showUnavailableWines }: FilterState, props) => showUnavailableWines);

export const priceRangeValuesSelector = createSelector(
  filterFeatureSelector,
  ({ priceRangeValues }: FilterState, props) => priceRangeValues);

export const ratingRangeValuesSelector = createSelector(
  filterFeatureSelector,
  ({ ratingRangeValues }: FilterState, props) => ratingRangeValues);

export const compositeFiltersSelector = createSelector(
  filterFeatureSelector,
  ({ compositeFilters }: FilterState, props) => compositeFilters);

export const customFiltersSelector = createSelector(filterFeatureSelector, ({ customFilters }: FilterState, props) => customFilters || []);

export const customFiltersWithRouterSelector = createSelector(
  selectRouteSegments,
  filtersSelector,
  (segments: string[], filters) => {

    segments = segments || [];
    const routeCustomFilters = ProductListHelper.getCustomFiltersFromRoute(filters, segments);
    return routeCustomFilters;
  });

export const sortValueSelector = createSelector(
  filterFeatureSelector,
  ({ sortValue }: FilterState) => sortValue);
