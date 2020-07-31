import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ErrorResponse } from 'apollo-link-error';
import { Store } from '@ngrx/store';

import { StoryHomeApiService } from 'src/app/shared/services/api';
import { RootState } from '../reducers/reducers';
import * as actions from '../story-home/story-home.actions';
import * as errorActions from '../errors';
import { Article } from 'src/app/shared/interfaces/article.interface';

@Injectable()
export class StoryHomeEffect {
  // latest story
  loadLatestStory$: Observable<any> = createEffect(() => this.action$.pipe(
    ofType(actions.loadLatestStory),
    mergeMap(() => this.storyHomeApiService.getLatestStoryData()
      .pipe(
        map((article: Article) => actions.loadLatestStorySuccess({ article })),
        catchError((responseError: ErrorResponse) => {
          if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
            return of(errorActions.setRequestErrors({ errors: [...responseError.graphQLErrors] }))
          }
        })
      )
    )
  ));

  // featured stories
  loadFeaturedStories$: Observable<any> = createEffect(() => this.action$.pipe(
    ofType(actions.loadFeaturedStories),
    mergeMap(() => this.storyHomeApiService.getFeaturedStoriesData()
      .pipe(
        map((articleItems: object[]) => actions.loadFeaturedStoriesSuccess({ articleItems })),
        catchError((responseError: ErrorResponse) => {
          if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
            return of(errorActions.setRequestErrors({ errors: [...responseError.graphQLErrors] }))
          }
        })
      )
    )
  ));

  // most popular stories
  loadMostPopularStories$: Observable<any> = createEffect(() => this.action$.pipe(
    ofType(actions.loadMostPopularStories),
    mergeMap(() => this.storyHomeApiService.getMostPopularStoriesData()
      .pipe(
        map((articles: Article[]) => actions.loadMostPopularStoriesSuccess({ articles })),
        catchError((responseError: ErrorResponse) => {
          if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
            return of(errorActions.setRequestErrors({ errors: [...responseError.graphQLErrors] }))
          }
        })
      )
    )
  ));

  // top contributors
  loadTopContributors$: Observable<any> = createEffect(() => this.action$.pipe(
    ofType(actions.loadTopContributors),
    mergeMap(() => this.storyHomeApiService.getTopAuthorsData()
      .pipe(
        map((topContributors: object[]) => actions.loadTopContributorsSuccess({ topContributors })),
        catchError((responseError: ErrorResponse) => {
          if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
            return of(errorActions.setRequestErrors({ errors: [...responseError.graphQLErrors] }));
          }
        })
      )
    )
  ));

  // video stories
  loadVideoStories$: Observable<any> = createEffect(() => this.action$.pipe(
    ofType(actions.loadVideoStories),
    mergeMap(() => this.storyHomeApiService.getVideoStoriesData()
      .pipe(
        map((videoItems: object[]) => actions.loadVideoStoriesSuccess({ videoItems })),
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
    private storyHomeApiService: StoryHomeApiService,
  ) {}
}
