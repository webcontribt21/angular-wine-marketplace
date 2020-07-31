import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, mergeMap, switchMap, catchError, withLatestFrom, debounceTime } from 'rxjs/operators';
import { ErrorResponse } from 'apollo-link-error';

import { QuickSearchApiService } from 'src/app/shared/services/api';
import {
  QuickSearchType
} from 'src/app/shared/interfaces/quick-search';
import * as quickSearchActions from '../quick-search/quick-search.actions';
import * as errorActions from '../errors';
import { quicksearchQueryTextSelector } from '../quick-search/quick-search.selector';
import { RootState } from '../reducers/reducers';

@Injectable()
export class QuickSearchEffect {

  constructor(
    private action$: Actions,
    private quickSearchApiService: QuickSearchApiService,
    private store$: Store<RootState>
  ) {}

  loadQuickSearchPopular$: Observable<any> = createEffect(() => this.action$.pipe(
    ofType(quickSearchActions.loadQuickSearchPopular),
    mergeMap(() => this.quickSearchApiService.getQuickSearchPopularData()
      .pipe(
        map((contents: object[]) => quickSearchActions.loadQuickSearchPopularSuccess({ contents })),
        catchError((responseError: ErrorResponse) => {
          if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
            return of(errorActions.setRequestErrors({ errors: [...responseError.graphQLErrors] }));
          }
        })
      )
    )
  ));

  loadQuickSearchQuery$: Observable<any> = createEffect(() => this.action$.pipe(
    debounceTime(500),
    ofType(
      quickSearchActions.loadQuickSearchQuery
    ),
    withLatestFrom(
      this.store$.pipe(select(quicksearchQueryTextSelector))
    ),
    switchMap(([props, query]: any) => {
      return this.quickSearchApiService.getQuickSearchQueryData(query)
        .pipe(
          map((contents: object[]) => quickSearchActions.loadQuickSearchQuerySuccess({ contents })),
          catchError((responseError: ErrorResponse) => {
            if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
              return of(errorActions.setRequestErrors({ errors: [...responseError.graphQLErrors] }));
            }
          })
        );
    })
  ));

  setSearchValue$: Observable<any> = createEffect(() =>
    this.action$.pipe(
      ofType(quickSearchActions.setQuickSearchQueryTextSelectorValue),
      map(({ quicksearchQueryText }) => {
        return quickSearchActions.loadQuickSearchQuery({ quicksearchQueryText });
      })
    )
  );
}
