import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, mergeMap, withLatestFrom, catchError } from 'rxjs/operators';
import { RootState } from '../reducers/reducers';
import { customFiltersSelector, filtersSelector, ratingRangeValuesSelector, priceRangeValuesSelector, showUnavailableWinesSelector } from '../filters/filter.selector';
import {ErrorResponse} from 'apollo-link-error';
import {Helper, ProductListHelper} from '../../shared/helpers';

import * as filtersActions from '../filters/filter.actions';
import * as itemActions from '../items/items.actions';
import * as wineCategoryActions from '../wineCategory';
import * as countryActions from '../country/country.actions';
import * as brandActions from '../brands/brands.actions';
import * as errorActions from '../errors';

import { brandsSelector } from '../brands/brands.selector';
import { countriesSelector } from '../country/country.selector';
import { getAllItemDetailTypes } from '../wineCategory/wine-category.selector';
import { Facet } from 'src/app/shared/interfaces/facet.interface';
import { ItemDetailType } from 'src/app/shared/interfaces/Item-detail-type.interface';
import { Country } from 'src/app/shared/interfaces/country.interface';
import { Brand } from 'src/app/shared/interfaces/brands.interface';
import { Location } from '@angular/common';
import { vendorFiltersSelector } from '../data';
import { Supplier } from 'src/app/shared/interfaces/supplier.interface';

@Injectable()
export class FiltersEffect {
  constructor(private action$: Actions, private store$: Store<RootState>, private location: Location) {}

  toggleFilter$: Observable<any> = createEffect(() =>
    this.action$.pipe(
      ofType(filtersActions.toggleCurrentFilter),
      withLatestFrom(this.store$.pipe(select(customFiltersSelector))),
      mergeMap(([{ filter }, customFilters]) => {
        if (customFilters.filter(f => f.parentTypeNo === filter.parentTypeNo && f.description === filter.description).length !== 0) {
          // return [filtersActions.removeCustomFilter({ customFilter: filter }), itemActions.loadItemsWithFilters()];
          return [filtersActions.removeCustomFilter({ customFilter: filter })];
        }

        //return [filtersActions.addCustomFilter({ customFilter: filter }), itemActions.loadItemsWithFilters()];
        return [filtersActions.addCustomFilter({ customFilter: filter })];
      })
    )
  );

  loadItemsForFilters$: Observable<any> = createEffect(() =>
    this.action$.pipe(
      ofType(
        filtersActions.removeCustomFilter,
        filtersActions.addCustomFilter,
        filtersActions.clearRatingRangeValues,
        filtersActions.setRatingRangeValues,
        filtersActions.clearPriceRangeValues,
        filtersActions.setPriceRangeValues,
        filtersActions.toggleShowUnavailableWines
      ),
      withLatestFrom(
        this.store$.pipe(select(filtersSelector)),
        this.store$.pipe(select(customFiltersSelector)),
        this.store$.pipe(select(ratingRangeValuesSelector)),
        this.store$.pipe(select(priceRangeValuesSelector)),
        this.store$.pipe(select(showUnavailableWinesSelector))
      ),
      mergeMap(([{ isUpdatePath }, filters, customFilters, ratingRangeValues, priceRangeValues, showUnavailableWines]) => {
        const url = ProductListHelper.getRouteFromCustomFilters(
          filters,
          customFilters,
          ratingRangeValues,
          priceRangeValues,
          showUnavailableWines
        );

        // this.location.replaceState(url);
        if (!isUpdatePath) {
          this.location.go(url);
        }

        return [itemActions.loadItemsWithFilters()];
      })
    )
  );

  clearAllCurrentFilters$: Observable<any> = createEffect(() =>
    this.action$.pipe(
      ofType(filtersActions.clearCurrentFilters),
      withLatestFrom(
        this.store$.pipe(select(filtersSelector)),
        this.store$.pipe(select(customFiltersSelector)),
        this.store$.pipe(select(ratingRangeValuesSelector)),
        this.store$.pipe(select(priceRangeValuesSelector)),
        this.store$.pipe(select(showUnavailableWinesSelector))
      ),
      map(([props, filters, customFilters, ratingRangeValues, priceRangeValues, showUnavailableWines]) => {
        const url = ProductListHelper.getRouteFromCustomFilters(
          filters,
          customFilters,
          ratingRangeValues,
          priceRangeValues,
          showUnavailableWines
        );
        this.location.go(url);
        return itemActions.loadItemsWithLoadPage({ nextPage: 0 });
      })
    )
  );

  updateFiltersCounts$: Observable<any> = createEffect(() =>
    this.action$.pipe(
      ofType(filtersActions.updateFiltersCounts),
      withLatestFrom(
        this.store$.pipe(select(getAllItemDetailTypes)),
        this.store$.pipe(select(countriesSelector)),
        this.store$.pipe(select(brandsSelector)),
        this.store$.pipe(select(vendorFiltersSelector)),
        this.store$.pipe(select(filtersSelector))
      ),
      mergeMap(([{ facets }, itemDetailTypes, countries, brands, vendors, filters1]) => {
        const newFacets: Facet[] = facets;
        const newItemDetailTypes: ItemDetailType[] = itemDetailTypes;
        const newCountries: Country[] = countries;
        const newBrands: Brand[] = brands;
        const newVendors: Supplier[] = vendors;

        const itemDetailTypesWithCount = Helper.setCountForItemDetailTypeValue(
          newItemDetailTypes,
          newFacets,
        );

        const helpedCountries = Helper.setCountToCountries(newCountries, newFacets);
        const helpedBrands = Helper.setCountToBrands(newBrands, newFacets);
        const helpedVendors = Helper.setCountToFilters(newVendors, newFacets);
        const itemDetailTypesForFilter = Helper.foundItemDetailsType(itemDetailTypesWithCount, 'filters');
        const filters = ProductListHelper.filtersSortedBySequence(
          Helper.convertDataToFilter(itemDetailTypesForFilter, helpedCountries, helpedBrands, helpedVendors, filters1)
        );

        return [
          wineCategoryActions.loadWineCategoriesAllSuccess({itemDetailTypesWithCount, facets: newFacets}),
          countryActions.loadCountriesSuccess({ countries: helpedCountries}),
          brandActions.loadBrandsSuccess({ brands: helpedBrands}),
          filtersActions.loadFiltersSuccess({ filters }),
          filtersActions.updateFiltersCountsSuccess()
        ];
      }),
      catchError((responseError: ErrorResponse) => {
        if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
          return of(errorActions.setRequestErrors({errors: [...responseError.graphQLErrors]}));
        }
      })
    )
  );

  setSortValue$: Observable<any> = createEffect(() =>
    this.action$.pipe(
      ofType(filtersActions.setWineListSortValue),
      map(({ nextPage }) => {
        return itemActions.loadItemsWithLoadPage({ nextPage });
      })
    )
  );
}
