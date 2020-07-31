import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError, switchMap, withLatestFrom } from 'rxjs/operators';
import { ErrorResponse } from 'apollo-link-error';
import { Store, select } from '@ngrx/store';

import { StoryApiService } from 'src/app/shared/services/api';
import * as storyActions from '../story/story.actions';
import * as errorActions from '../errors';
import { RootState } from '../reducers/reducers';
import {
  articleCategoryNoSelector,
  singleArticleIdSelector,
  singleCategorySkipSelector,
  speicalAuthorIdSelector,
  contributorsSortSelector,
  singleCategorySortSelector
} from '../story/story.selector';
import { ARTICLES_LIMIT } from '../story/story.reducer';
import { Article } from 'src/app/shared/interfaces/article.interface';
import { Author } from 'src/app/shared/interfaces/author.interface';

@Injectable()
export class StoryEffect {
  articleCategories$: Observable<any> = createEffect(() => this.action$.pipe(
    ofType(storyActions.loadStoryAllArticles),
    mergeMap(() => this.storyApiService.getStoryArticlesData()
      .pipe(
        map((categories: Object[]) => storyActions.loadStoryAllArticlesSuccess({ categories })),
        catchError((responseError: ErrorResponse) => {
          if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
            return of(errorActions.setRequestErrors({ errors: [...responseError.graphQLErrors] }))
          }
        })
      )
    )
  ));

  categories$: Observable<any> = createEffect(() => this.action$.pipe(
    ofType(storyActions.loadStoryAllCategories),
    mergeMap(() => this.storyApiService.getStoryCategoriesData()
      .pipe(
        map((categories: Object[]) => storyActions.loadStoryAllCategoriesSuccess({ categories })),
        catchError((responseError: ErrorResponse) => {
          if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
            return of(errorActions.setRequestErrors({ errors: [...responseError.graphQLErrors] }))
          }
        })
      )
    )
  ));

  singleCategoryArticles$: Observable<any> = createEffect(() => this.action$.pipe(
    ofType(storyActions.loadStorySingleCategoryArticles),
    withLatestFrom(this.store$.pipe(select(articleCategoryNoSelector))),
    switchMap(([props, articleCategoryNo]) => this.storyApiService.getSingleCategoryArticlesData(articleCategoryNo)
      .pipe(
        map((category: Object) => storyActions.loadStorySingleCategoryArticlesSuccess({ category })),
        catchError((responseError: ErrorResponse) => {
          if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
            return of(errorActions.setRequestErrors({ errors: [...responseError.graphQLErrors] }))
          }
        })
      )
    )
  ));

  singleArticle$: Observable<any> = createEffect(() => this.action$.pipe(
    ofType(storyActions.loadStorySingleArticle),
    withLatestFrom(this.store$.pipe(select(singleArticleIdSelector))),
    switchMap(([props, singleArticleId]) => this.storyApiService.getSingleArticleData(singleArticleId)
      .pipe(
        map((article: Object) => storyActions.loadStorySingleArticleSuccess({ article })),
        catchError((responseError: ErrorResponse) => {
          if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
            return of(errorActions.setRequestErrors({ errors: [...responseError.graphQLErrors] }))
          }
        })
      )
    )
  ));

  moreCategoryArticles$: Observable<any> = createEffect(() => this.action$.pipe(
    ofType(storyActions.loadStoryMoreCategoryArticles),
    withLatestFrom(
      this.store$.pipe(select(articleCategoryNoSelector)),
      this.store$.pipe(select(singleCategorySkipSelector)),
      this.store$.pipe(select(singleCategorySortSelector))
    ),
    switchMap(([props, articleCategoryNo, skip, sort]) =>
      this.storyApiService.getMoreCategoryArticlesData(ARTICLES_LIMIT, skip, articleCategoryNo, sort)
      .pipe(
        map((articles: Article[]) => storyActions.loadStoryMoreCategoryArticlesSuccess({ articles })),
        catchError((responseError: ErrorResponse) => {
          if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
            return of(errorActions.setRequestErrors({ errors: [...responseError.graphQLErrors] }))
          }
        })
      )
    )
  ));

  // Load Contributors Sort
  loadAllAuthors$: Observable<any> = createEffect(() => this.action$.pipe(
    ofType(storyActions.loadStoryAllContributors),
    withLatestFrom(
      this.store$.pipe(select(contributorsSortSelector))
    ),
    switchMap(([props, sort]) =>
      this.storyApiService.getAllAuthorsData(sort)
      .pipe(
        map((authors: Author) => storyActions.loadStoryAllContributorsSuccess({ authors })),
        catchError((responseError: ErrorResponse) => {
          if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
            return of(errorActions.setRequestErrors({ errors: [...responseError.graphQLErrors] }))
          }
        })
      )
    )
  ));

  // Special Author
  specialAuthor$: Observable<any> = createEffect(() => this.action$.pipe(
    ofType(storyActions.loadStorySpecialAuthor),
    withLatestFrom(
      this.store$.pipe(select(speicalAuthorIdSelector))
    ),
    switchMap(([props, id]) =>
      this.storyApiService.getSpecialAuthorData(id)
      .pipe(
        map((author: Author) => storyActions.loadStorySpecialAuthorSuccess({ author })),
        catchError((responseError: ErrorResponse) => {
          if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
            return of(errorActions.setRequestErrors({ errors: [...responseError.graphQLErrors] }))
          }
        })
      )
    )
  ));

  // single category articles
  loadSingleCategoryArticles$: Observable<any> = createEffect(() => this.action$.pipe(
    ofType(storyActions.sortStorySingleArticles),
    mergeMap((props) =>
      this.storyApiService.getSingleCategoryArticles(props.sort, props.articleCategoryNo)
        .pipe(
          map(({ articles, articleCategoryNo }) => storyActions.sortStorySingleArticlesSuccess({ articles, articleCategoryNo })),
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
    private storyApiService: StoryApiService,
    private store$: Store<RootState>
  ) {}
}
