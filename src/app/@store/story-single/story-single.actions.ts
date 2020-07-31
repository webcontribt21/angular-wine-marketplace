import { createAction, props } from '@ngrx/store';

import {
  SINGLE_STORY_RELATED_WINES_LOAD,
  SINGLE_STORY_RELATED_WINES_LOAD_SUCCESS,
  SINGLE_STORY_RELATED_WINES_LOAD_FAILURE,
  SINGLE_STORY_RELATED_STORIES_LOAD,
  SINGLE_STORY_RELATED_STORIES_LOAD_SUCCESS,
  SINGLE_STORY_RELATED_STORIES_LOAD_FAILURE,
} from './story-single.types';
import { ArticleItem, Article } from 'src/app/shared/interfaces/article.interface';

// related wines
export const loadRelatedWines: any = createAction(
  SINGLE_STORY_RELATED_WINES_LOAD,
  props<{ articleId: string }>()
);
export const loadRelatedWinesSuccess: any = createAction(
  SINGLE_STORY_RELATED_WINES_LOAD_SUCCESS,
  props<{ articleItems: ArticleItem[] }>()
);
export const loadRelatedWinesError: any = createAction(SINGLE_STORY_RELATED_WINES_LOAD_FAILURE);

// related stories
export const loadRelatedStories: any = createAction(
  SINGLE_STORY_RELATED_STORIES_LOAD,
  props<{ articleId: string }>()
);
export const loadRelatedStoriesSuccess: any = createAction(
  SINGLE_STORY_RELATED_STORIES_LOAD_SUCCESS,
  props<{ articles: Article[] }>()
);
export const loadRelatedStoriesError: any = createAction(SINGLE_STORY_RELATED_STORIES_LOAD_FAILURE);
