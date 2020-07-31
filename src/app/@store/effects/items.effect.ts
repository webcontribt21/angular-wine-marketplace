import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { find, isUndefined } from 'lodash';

import { SearchItemsApiService } from '../../shared/services/api';
import { RootState } from '../reducers/reducers';
import {
  customFiltersSelector,
  filtersSelector,
  showUnavailableWinesSelector,
  ratingRangeValuesSelector,
  priceRangeValuesSelector,
  sortValueSelector
} from '../filters/filter.selector';
import { SearchFilter } from '../../shared/interfaces/search-filter.interface';
import { Helper } from '../../shared/helpers';
import { FilterData } from '../../shared/interfaces/filter.interface';
import { GRAPHQL_CONFIG } from '../../../config';

import * as itemActions from '../items/items.actions';
import * as filtersActions from '../filters/filter.actions';
import * as paginationActions from '../pagination/pagination.actions';
import { selectRouteSegments } from '../router/router.selector';

@Injectable({
  providedIn: 'root'
})
export class ItemsEffect {
  constructor(private action$: Actions, private store$: Store<RootState>, private searchItemsApiService: SearchItemsApiService) {}

  searchItems$: Observable<any> = createEffect(() =>
    this.action$.pipe(
      ofType(itemActions.loadItemsWithFilters),
      withLatestFrom(
        this.store$.pipe(select(selectRouteSegments)),
        this.store$.pipe(select(customFiltersSelector)),
        this.store$.pipe(select(ratingRangeValuesSelector)),
        this.store$.pipe(select(priceRangeValuesSelector)),
        this.store$.pipe(select(showUnavailableWinesSelector)),
        this.store$.pipe(select(filtersSelector)),
        this.store$.pipe(select(sortValueSelector))
      ),
      switchMap(([
        props, segments, customFilters, ratingRangeValues, priceRangeValues, showUnavailableWines, filters, sort
      ]: any) => {
        const searchFilters: SearchFilter[] = [];
        // const routeCustomFilters = ProductListHelper.getCustomFiltersFromRoute(filters, segments);
        // const currentCustomFilters: FilterData[] = [...customFilters, ...routeCustomFilters];
        const currentCustomFilters: FilterData[] = [...customFilters];
        let name = '';

        currentCustomFilters.forEach((customFilter: FilterData) => {
          if (customFilter.filterValue) {
            name = customFilter.filterName;
          } else if (customFilter.hasOwnProperty('parentTypeNo') && !isUndefined(customFilter.parentTypeNo)) {
            name = Helper.getFacetName(customFilter.parentTypeNo);
          } else {
            name = customFilter.parent.toLowerCase();
          }

          const findFilter: SearchFilter = find(searchFilters, ['name', name]);

          if (isUndefined(findFilter)) {
            const filter = new SearchFilter(name, []);
            if (customFilter.filterValue) {
              filter.value.push(customFilter.filterValue);
            } else {
              filter.value.push(customFilter.description);
            }
            searchFilters.push(filter);
          } else {
            if (customFilter.filterValue) {
              findFilter.value.push(customFilter.filterValue);
            } else {
              findFilter.value.push(customFilter.description);
            }
          }
        });

        if (ratingRangeValues) {
          const filterValue = `{"from":${ratingRangeValues[0]},"to":${ratingRangeValues[1]}}`;
          const filter = new SearchFilter('value_2', [filterValue]);
          searchFilters.push(filter);
        }

        if (priceRangeValues) {
          let filterValue = `{"from":${priceRangeValues[0]},"to":${priceRangeValues[1]}}`;
          if (priceRangeValues[0] === 0) {
            filterValue = `{"to":${priceRangeValues[1]}}`;
          } else if (priceRangeValues[1] === 1000) {
            filterValue = `{"from":${priceRangeValues[0]}}`;
          }
          const filter = new SearchFilter('price_zar', [filterValue]);
          searchFilters.push(filter);
        }

        if (!showUnavailableWines) {
          const filterValue = `{"from":1}`;
          const filter = new SearchFilter('price_zar_stock', [filterValue]);
          searchFilters.push(filter);
        }

        return this.searchItemsApiService.searchItems(
          '',
          GRAPHQL_CONFIG.searchItemsLimit,
          GRAPHQL_CONFIG.startPageForSearchItems,
          searchFilters,
          sort
        );
      }),
      mergeMap(data => {
        const items = Helper.setPriceToItem(data.items);
        const facets = data.facets;
        const paginationData = data.page;
        return [
          filtersActions.updateFiltersCounts({ facets }),
          paginationActions.loadPAGINATIONSuccess({ pagination: paginationData }),
          itemActions.loadItemsSuccess({ items })
        ];
      })
    )
  );

  loadItemsOnLoadPage$: Observable<any> = createEffect(() =>
    this.action$.pipe(
      ofType(itemActions.loadItemsWithLoadPage),
      withLatestFrom(
        this.store$.pipe(select(selectRouteSegments)),
        this.store$.pipe(select(customFiltersSelector)),
        this.store$.pipe(select(ratingRangeValuesSelector)),
        this.store$.pipe(select(priceRangeValuesSelector)),
        this.store$.pipe(select(showUnavailableWinesSelector)),
        this.store$.pipe(select(filtersSelector)),
        this.store$.pipe(select(sortValueSelector))
      ),
      switchMap(([
        props, segments, customFilters, ratingRangeValues, priceRangeValues, showUnavailableWines, filters, sort
      ]: any) => {
        const { nextPage } = props;
        const searchFilters: SearchFilter[] = [];
        // const routeCustomFilters = ProductListHelper.getCustomFiltersFromRoute(filters, segments);
        // const currentCustomFilters: FilterData[] = [...customFilters, ...routeCustomFilters];
        const currentCustomFilters: FilterData[] = [...customFilters];
        let name = '';

        currentCustomFilters.forEach((customFilter: FilterData) => {
          if (customFilter.filterValue) {
            name = customFilter.filterName;
          } else if (customFilter.hasOwnProperty('parentTypeNo') && !isUndefined(customFilter.parentTypeNo)) {
            name = Helper.getFacetName(customFilter.parentTypeNo);
          } else {
            name = customFilter.parent.toLowerCase();
          }

          const findFilter: SearchFilter = find(searchFilters, ['name', name]);

          if (isUndefined(findFilter)) {
            const filter = new SearchFilter(name, []);
            if (customFilter.filterValue) {
              filter.value.push(customFilter.filterValue);
            } else {
              filter.value.push(customFilter.description);
            }
            searchFilters.push(filter);
          } else {
            if (customFilter.filterValue) {
              findFilter.value.push(customFilter.filterValue);
            } else {
              findFilter.value.push(customFilter.description);
            }
          }
        });

        if (ratingRangeValues) {
          const filterValue = `{"from":${ratingRangeValues[0]},"to":${ratingRangeValues[1]}}`;
          const filter = new SearchFilter('value_2', [filterValue]);
          searchFilters.push(filter);
        }

        if (priceRangeValues) {
          let filterValue = `{"from":${priceRangeValues[0]},"to":${priceRangeValues[1]}}`;
          if (priceRangeValues[0] === 0) {
            filterValue = `{"to":${priceRangeValues[1]}}`;
          } else if (priceRangeValues[1] === 1000) {
            filterValue = `{"from":${priceRangeValues[0]}}`;
          }
          const filter = new SearchFilter('price_zar', [filterValue]);
          searchFilters.push(filter);
        }

        if (!showUnavailableWines) {
          const filterValue = `{"from":1}`;
          const filter = new SearchFilter('price_zar_stock', [filterValue]);
          searchFilters.push(filter);
        }

        return this.searchItemsApiService.searchItems(
          '',
          GRAPHQL_CONFIG.searchItemsLimit,
          nextPage,
          searchFilters,
          sort
        );
      }),
      mergeMap(data => {
        const items = Helper.setPriceToItem(data.items);
        const facets = data.facets;
        const paginationData = data.page;

        return [
          filtersActions.updateFiltersCounts({ facets }),
          paginationActions.loadPAGINATIONSuccess({ pagination: paginationData }),
          itemActions.loadItemsSuccess({ items })
        ];
      })
    )
  );
}
