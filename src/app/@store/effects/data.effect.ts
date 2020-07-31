import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap, map, withLatestFrom} from 'rxjs/operators';
import {DataApiService} from '../../shared/services/api/data.api.service';
import {AllData} from '../../shared/interfaces/all-data.interface';
import {Facet} from '../../shared/interfaces/facet.interface';
import {Country} from '../../shared/interfaces/country.interface';
import {Brand} from '../../shared/interfaces/brands.interface';
import {ItemDetailType} from '../../shared/interfaces/Item-detail-type.interface';
import {ErrorResponse} from 'apollo-link-error';
import {Helper, UserHelper, ProductListHelper} from '../../shared/helpers';

import * as dataActions from '../data';
import * as wineCategoryActions from '../wineCategory';
import * as countryActions from '../country/country.actions';
import * as brandActions from '../brands/brands.actions';
import * as filtersActions from '../filters/filter.actions';
import * as shopActions from '../shop/shop.actions';
import * as errorActions from '../errors';
import { Shop } from 'src/app/shared/interfaces/shop.interface';
import { Supplier } from 'src/app/shared/interfaces/supplier.interface';
import { Store, select } from '@ngrx/store';
import { RootState } from '../reducers/reducers';

@Injectable({
  providedIn: 'root',
})
export class DataEffect {

  constructor(
    private action$: Actions,
    private dataApiService: DataApiService,
    private store$: Store<RootState>,
  ) { }

  loadVendorFilters$: Observable<any> = createEffect(() =>
    this.action$.pipe(
      ofType(dataActions.loadVendorFilterData),
      switchMap(() => {
        return this.dataApiService.getVendorFilters()
          .pipe(
            map((vendorFilters: Supplier[]) => {
              return dataActions.loadVendorFilterDataSuccess({ vendorFilters });
            }),
            catchError((responseError: ErrorResponse) => {
              if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
                return of(errorActions.setRequestErrors({errors: [...responseError.graphQLErrors]}));
              }
            })
          );
      }),
    )
  );

  loadAllData$: Observable<any> = createEffect(() =>
    this.action$.pipe(
      ofType(dataActions.loadData),
      withLatestFrom(
        this.store$.pipe(select(dataActions.vendorFiltersSelector))
      ),
      switchMap(([props, _vendorFilters]) => {
        return this.dataApiService.getAllData().pipe(
          mergeMap((result: AllData) => {
            const shop: Shop = result.ShopByToken;
            const itemDetailTypes: ItemDetailType[] = result.ItemDetailTypes;
            const facets: Facet[] = result.searchItems.facets;

            const __countries: Country[] = result.Countries;
            const __brands: Brand[] = result.Brands;

            const itemDetailTypesWithCount = Helper.setCountForItemDetailTypeValue(
              itemDetailTypes,
              facets,
            );

            const countries = Helper.setCountToCountries(__countries, facets);
            const brands = Helper.setCountToBrands(__brands, facets);
            const vendorFilters = Helper.setCountToFilters(_vendorFilters, facets);
            const itemDetailTypesForFilter = Helper.foundItemDetailsType(itemDetailTypesWithCount, 'filters');

            const filters = ProductListHelper.filtersSortedBySequence(
              Helper.convertDataToFilter(itemDetailTypesForFilter, countries, brands, vendorFilters, null)
            );

            return [
              shopActions.loadShopSuccess({shop}),
              wineCategoryActions.loadWineCategoriesAllSuccess({itemDetailTypesWithCount, facets}),
              countryActions.loadCountriesSuccess({countries}),
              brandActions.loadBrandsSuccess({brands}),
              filtersActions.loadFiltersSuccess({filters}),
              dataActions.loadDataSuccess()
            ];
          }),
          catchError((responseError: ErrorResponse) => {
            if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
              return of(errorActions.setRequestErrors({errors: [...responseError.graphQLErrors]}));
            }
          })
        );
      }),
    )
  );
}
