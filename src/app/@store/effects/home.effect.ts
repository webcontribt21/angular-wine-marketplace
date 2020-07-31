import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ErrorResponse } from 'apollo-link-error';

import { HomeApiService } from 'src/app/shared/services/api';
import {
  AdvertType
} from 'src/app/shared/interfaces/home';
import * as homeActions from '../home/home.actions';
import * as errorActions from '../errors';

@Injectable()
export class HomeEffect {

  loadTopArticles$: Observable<any> = createEffect(() => this.action$.pipe(
    ofType(homeActions.loadHomeTopArticles),
    mergeMap(() => this.homeApiService.getHomeTopArticlesData()
      .pipe(
        map((contents: object[]) => homeActions.loadHomeTopArticlesSuccess({ contents })),
        catchError((responseError: ErrorResponse) => {
          if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
            return of(errorActions.setRequestErrors({ errors: [...responseError.graphQLErrors] }))
          }
        })
      )
    )
  ));

  loadTopAdverts$: Observable<any> = createEffect(() => this.action$.pipe(
    ofType(homeActions.loadHomeTopAdverts),
    mergeMap(() => this.homeApiService.getHomeTopAdvertsData()
      .pipe(
        map((contents: AdvertType[]) => homeActions.loadHomeTopAdvertsSuccess({ contents })),
        catchError((responseError: ErrorResponse) => {
          if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
            return of(errorActions.setRequestErrors({ errors: [...responseError.graphQLErrors] }))
          }
        })
      )
    )
  ));

  loadFeaturedWines$: Observable<any> = createEffect(() => this.action$.pipe(
    ofType(homeActions.loadHomeFeaturedWines),
    mergeMap(() => this.homeApiService.getHomeFeaturedWinesData()
      .pipe(
        map((wines: Object[]) => homeActions.loadHomeFeaturedWinesSuccess({ wines })),
        catchError((responseError: ErrorResponse) => {
          if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
            return of(errorActions.setRequestErrors({ errors: [...responseError.graphQLErrors] }))
          }
        })
      )
    )
  ));

  loadAdvertLeft$: Observable<any> = createEffect(() => this.action$.pipe(
    ofType(homeActions.loadHomeBottomAdvertLeft),
    mergeMap(() => this.homeApiService.getHomeBottomAdvertLeftData()
      .pipe(
        map((advert: Object) => homeActions.loadHomeBottomAdvertLeftSuccess({ advert })),
        catchError((responseError: ErrorResponse) => {
          if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
            return of(errorActions.setRequestErrors({ errors: [...responseError.graphQLErrors] }))
          }
        })
      )
    )
  ));

  loadStoryRight$: Observable<any> = createEffect(() => this.action$.pipe(
    ofType(homeActions.loadHomeBottomStoryRight),
    mergeMap(() => this.homeApiService.getHomeBottomStoryRightGQLData()
      .pipe(
        map((article: Object) => homeActions.loadHomeBottomStoryRightSuccess({ article })),
        catchError((responseError: ErrorResponse) => {
          if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
            return of(errorActions.setRequestErrors({ errors: [...responseError.graphQLErrors] }))
          }
        })
      )
    )
  ));

  loadMidArticles$: Observable<any> = createEffect(() => this.action$.pipe(
    ofType(homeActions.loadHomeMidArticles),
    mergeMap(() => this.homeApiService.getHomeMidArticlesGQLData()
      .pipe(
        map((articles: Object[]) => homeActions.loadHomeMidArticlesSuccess({ articles })),
        catchError((responseError: ErrorResponse) => {
          if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
            return of(errorActions.setRequestErrors({ errors: [...responseError.graphQLErrors] }))
          }
        })
      )
    )
  ));

  // Top Features
  loadTopFeatures$: Observable<any> = createEffect(() => this.action$.pipe(
    ofType(homeActions.loadHomeTopFeatures),
    mergeMap(() => this.homeApiService.getHomeTopFeaturesGQLData()
      .pipe(
        map((detail: Object) => homeActions.loadHomeTopFeaturesSuccess({ detail })),
        catchError((responseError: ErrorResponse) => {
          if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
            return of(errorActions.setRequestErrors({ errors: [...responseError.graphQLErrors] }))
          }
        })
      )
    )
  ));

  // Popular Wines
  loadPopularWines$: Observable<any> = createEffect(() => this.action$.pipe(
    ofType(homeActions.loadHomePopularWines),
    mergeMap(() => this.homeApiService.getHomePopularWinesData()
      .pipe(
        map((wines: Object[]) => homeActions.loadHomePopularWinesSuccess({ wines })),
        catchError((responseError: ErrorResponse) => {
          if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
            return of(errorActions.setRequestErrors({ errors: [...responseError.graphQLErrors] }))
          }
        })
      )
    )
  ));

  // Top Banner Mobile
  loadTopBannerMobile$: Observable<any> = createEffect(() => this.action$.pipe(
    ofType(homeActions.loadHomeTopBannerMobile),
    mergeMap(() => this.homeApiService.getHomeTopBannerMobileGQLData()
      .pipe(
        map((detail: Object) => homeActions.loadHomeTopBannerMobileSuccess({ detail })),
        catchError((responseError: ErrorResponse) => {
          if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
            return of(errorActions.setRequestErrors({ errors: [...responseError.graphQLErrors] }))
          }
        })
      )
    )
  ));

  constructor(
    private action$: Actions,
    private homeApiService: HomeApiService
  ) {}
}
