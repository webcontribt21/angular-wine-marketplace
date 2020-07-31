import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { RootState } from '../reducers/reducers';
import { Observable, of } from 'rxjs';
import { Item } from '../../shared/interfaces/item.interface';
import { map, mergeMap, switchMap, withLatestFrom, catchError } from 'rxjs/operators';
import { Helper, ProductListHelper } from '../../shared/helpers';
import { GRAPHQL_CONFIG } from '../../../config';

import * as itemActions from '../item/item.actions';
import * as errorActions from '../errors';

import { find, isUndefined } from 'lodash';
import { ItemsApiService } from '../../shared/services';
import { selectRouteId } from '../router/router.selector';
import { itemSelector, brandDescriptionSelector } from '../item/item.selector';
import { ErrorResponse } from 'apollo-link-error';
import { SearchItemsApiService } from 'src/app/shared/services/api';
import { FilterData } from 'src/app/shared/interfaces/filter.interface';
import { SearchFilter } from 'src/app/shared/interfaces/search-filter.interface';
import { sortValueSelector } from '../filters/filter.selector';

@Injectable({
  providedIn: 'root'
})
export class ItemEffect {
  constructor(
    private action$: Actions,
    private store$: Store<RootState>,
    private itemsApiService: ItemsApiService,
    private searchItemsApiService: SearchItemsApiService) {}

  loadItem$: Observable<any> = createEffect(() =>
    this.action$.pipe(
      ofType(itemActions.loadItem),
      withLatestFrom(this.store$.pipe(select(selectRouteId)), this.store$.pipe(select(brandDescriptionSelector))),
      switchMap(([props, id, brandDescripion]: any) => {
        return this.itemsApiService.getItem(id).pipe(
          mergeMap(item => {
            const response = [itemActions.loadItemSuccess({ item })];
            const itemBrandName = item.brand && item.brand.name;
            if (itemBrandName && (itemBrandName !== brandDescripion || brandDescripion == null)) {
              response.push(itemActions.loadItemOtherBrandItems({ description: itemBrandName }));
            }
            response.push(itemActions.loadItemRelatedArticles({ _id: item._id }));
            return response;
          }),
          catchError((responseError: ErrorResponse) => {
            if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
              return of([
                errorActions.setRequestErrors({errors: [...responseError.graphQLErrors]}),
                itemActions.loadItemError()
              ]);
            }
          })
        );
      }),
    )
  );

  loadItemOtherBrandItems$: Observable<any> = createEffect(() =>
    this.action$.pipe(
      ofType(itemActions.loadItemOtherBrandItems),
      withLatestFrom(
        this.store$.pipe(select(itemSelector)),
        this.store$.pipe(select(sortValueSelector))
      ),
      switchMap(([{description}, item, sort]) => {
        // {name: "brand", value: ["Domaine Albert Morot"]}
        const searchFilters: SearchFilter[] = [{
          name: 'brand',
          value: [description]
        },
        {
          name: 'price_zar_stock',
          value: ['{"from": 1}']
        }];
        return this.searchItemsApiService.searchItems('', 10, 1, searchFilters, sort).pipe(
          mergeMap(data => {
            const items = Helper.setPriceToItem(data.items.filter(f => f._id !== item._id));
            return [itemActions.loadItemOtherBrandItemsSuccess({ description, items })];
          }),
          catchError((responseError: ErrorResponse) => {
            if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
              return of([
                errorActions.setRequestErrors({errors: [...responseError.graphQLErrors]}),
                itemActions.loadItemOtherBrandItemsError()
              ]);
            }
          })
        );
      }),
    )
  );

  loadItemRelatedArticles$: Observable<any> = createEffect(() =>
    this.action$.pipe(
      ofType(itemActions.loadItemRelatedArticles),
      withLatestFrom(this.store$.pipe(select(itemSelector))),
      switchMap(([{_id }, item]) => {
        return this.itemsApiService.getItemRelatedArticles(_id).pipe(
          mergeMap(articles => {
            return [itemActions.loadItemRelatedArticlesSuccess({ articles })];
          }),
          catchError((responseError: ErrorResponse) => {
            if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
              return of([
                errorActions.setRequestErrors({errors: [...responseError.graphQLErrors]}),
                itemActions.loadItemRelatedArticlesError()
              ]);
            }
          })
        );
      }),
    )
  );
}
