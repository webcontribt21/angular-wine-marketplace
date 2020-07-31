import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap, withLatestFrom } from 'rxjs/operators';
import { ErrorResponse } from 'apollo-link-error';
import { Store, select } from '@ngrx/store';

import { StorySingleApiService } from 'src/app/shared/services/api';
import { RootState } from '../reducers/reducers';
import * as errorActions from '../errors';
import { ArticleItem, Article } from 'src/app/shared/interfaces/article.interface';
import {
  loadRelatedWines,
  articleIdSelector,
  loadRelatedWinesSuccess
} from '../story-single';
import { loadRelatedStories, loadRelatedStoriesSuccess } from '../story-single/story-single.actions';

@Injectable()
export class StorySingleEffect {
  // related wines
  loadRelatedWines$: Observable<any> = createEffect(() => this.action$.pipe(
    ofType(loadRelatedWines),
    withLatestFrom(
      this.store$.pipe(select(articleIdSelector))
    ),
    switchMap(([props, articleId]) =>
      this.storySingleApiService.getRelatedWinesData(articleId)
        .pipe(
          map((articleItems: ArticleItem[]) => loadRelatedWinesSuccess({ articleItems })),
          catchError((responseError: ErrorResponse) => {
            if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
              return of(errorActions.setRequestErrors({ errors: [...responseError.graphQLErrors] }))
            }
          })
      )
    )
  ));

  // related wines
  loadRelatedArticles$: Observable<any> = createEffect(() => this.action$.pipe(
    ofType(loadRelatedStories),
    withLatestFrom(
      this.store$.pipe(select(articleIdSelector))
    ),
    switchMap(([props, articleId]) =>
      this.storySingleApiService.getRelatedArticlesData(articleId)
        .pipe(
          map((articles: Article[]) => loadRelatedStoriesSuccess({ articles })),
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
    private storySingleApiService: StorySingleApiService,
    private store$: Store<RootState>,
  ) {}
}
