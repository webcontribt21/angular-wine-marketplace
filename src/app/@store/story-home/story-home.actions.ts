import { createAction, props } from '@ngrx/store';

import {
  STORY_HOME_LATEST_STORY_LOAD,
  STORY_HOME_LATEST_STORY_LOAD_SUCCESS,
  STORY_HOME_LATEST_STORY_LOAD_FAIL,
  STORY_HOME_FEATURED_STORIES_LOAD,
  STORY_HOME_FEATURED_STORIES_LOAD_SUCCESS,
  STORY_HOME_FEATURED_STORIES_LOAD_FAIL,
  STORY_HOME_POPULAR_STORIES_LOAD,
  STORY_HOME_POPULAR_STORIES_LOAD_SUCCESS,
  STORY_HOME_POPULAR_STORIES_LOAD_FAIL,
  STORY_HOME_TOP_CONTRIBUTORS_LOAD,
  STORY_HOME_TOP_CONTRIBUTORS_LOAD_SUCCESS,
  STORY_HOME_TOP_CONTRIBUTORS_LOAD_FAIL,
  STORY_HOME_VIDEO_STORIES_LOAD,
  STORY_HOME_VIDEO_STORIES_LOAD_SUCCESS,
  STORY_HOME_VIDEO_STORIES_LOAD_FAIL
} from './story-home.types';
import { Article } from 'src/app/shared/interfaces/article.interface';

// load latest story
export const loadLatestStory: any = createAction(STORY_HOME_LATEST_STORY_LOAD);
export const loadLatestStorySuccess: any = createAction(
  STORY_HOME_LATEST_STORY_LOAD_SUCCESS,
  props<{ article: Article }>()
);
export const loadLatestStoryError: any = createAction(STORY_HOME_LATEST_STORY_LOAD_FAIL);

// load featured stories
export const loadFeaturedStories: any = createAction(STORY_HOME_FEATURED_STORIES_LOAD);
export const loadFeaturedStoriesSuccess: any = createAction(
  STORY_HOME_FEATURED_STORIES_LOAD_SUCCESS,
  props<{ articleItems: object[] }>()
);
export const loadFeaturedStoriesError: any = createAction(STORY_HOME_FEATURED_STORIES_LOAD_FAIL);

// load most popular stories
export const loadMostPopularStories: any = createAction(STORY_HOME_POPULAR_STORIES_LOAD);
export const loadMostPopularStoriesSuccess: any = createAction(
  STORY_HOME_POPULAR_STORIES_LOAD_SUCCESS,
  props<{ articles: Article[] }>()
);
export const loadMostPopularStoriesError: any = createAction(STORY_HOME_POPULAR_STORIES_LOAD_FAIL);

// load top contributors
export const loadTopContributors: any = createAction(STORY_HOME_TOP_CONTRIBUTORS_LOAD);
export const loadTopContributorsSuccess: any = createAction(
  STORY_HOME_TOP_CONTRIBUTORS_LOAD_SUCCESS,
  props<{ topContributors: object[] }>()
);
export const loadTopContributorsError: any = createAction(STORY_HOME_TOP_CONTRIBUTORS_LOAD_FAIL);

// load video stories
export const loadVideoStories: any = createAction(STORY_HOME_VIDEO_STORIES_LOAD);
export const loadVideoStoriesSuccess: any = createAction(
  STORY_HOME_VIDEO_STORIES_LOAD_SUCCESS,
  props<{ videoItems: object[] }>()
);
export const loadVideoStoriesError: any = createAction(STORY_HOME_VIDEO_STORIES_LOAD_FAIL);
