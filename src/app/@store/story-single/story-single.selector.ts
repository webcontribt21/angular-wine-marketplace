import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StorySingleState } from './story-single.reducer';

export const storySingleFeatureSelector = createFeatureSelector<StorySingleState>('storySingleReducer');

// related wines
export const isLoadingRelatedWinesSelector = createSelector(
  storySingleFeatureSelector,
  ({ isLoadingRelatedWines }: StorySingleState) => isLoadingRelatedWines
);

export const relatedWineItemsSelector = createSelector(
  storySingleFeatureSelector,
  ({ relatedWineItems }: StorySingleState) => relatedWineItems
);

export const articleIdSelector = createSelector(
  storySingleFeatureSelector,
  ({ articleId }: StorySingleState) => articleId
);

// related articles
export const isLoadingRelatedArticlesSelector = createSelector(
  storySingleFeatureSelector,
  ({ isLoadingRelatedArticles }: StorySingleState) => isLoadingRelatedArticles
);

export const relatedArticlesSelector = createSelector(
  storySingleFeatureSelector,
  ({ relatedArticles }: StorySingleState) => relatedArticles
);
