import { Action, createReducer, on } from '@ngrx/store';

import { ArticleItem, Article } from 'src/app/shared/interfaces/article.interface';
import * as actions from './story-single.actions';

export interface StorySingleState {
  relatedWineItems: ArticleItem[];
  isLoadingRelatedWines: boolean;
  articleId: string;
  relatedArticles: Article[];
  isLoadingRelatedArticles: boolean;
}

const initialState: StorySingleState = {
  relatedWineItems: [],
  isLoadingRelatedWines: false,
  articleId: '',
  relatedArticles: [],
  isLoadingRelatedArticles: false
};

const storySingleReducer = createReducer(
  initialState,
  // related wines
  on(actions.loadRelatedWines, (state, { articleId }) => {
    return {
      ...state,
      articleId,
      isLoadingRelatedWines: true
    };
  }),
  on(actions.loadRelatedWinesSuccess, (state, { articleItems }) => {
    return {
      ...state,
      relatedWineItems: articleItems,
      isLoadingRelatedWines: false
    };
  }),
  // related stories
  on(actions.loadRelatedStories, (state, { articleId }) => {
    return {
      ...state,
      articleId,
      isLoadingRelatedArticles: true
    };
  }),
  on(actions.loadRelatedStoriesSuccess, (state, { articles: relatedArticles }) => {
    return {
      ...state,
      relatedArticles,
      isLoadingRelatedArticles: false
    };
  }),
);

export function reducer(state: StorySingleState | undefined, action: Action) {
  return storySingleReducer(state, action);
}
