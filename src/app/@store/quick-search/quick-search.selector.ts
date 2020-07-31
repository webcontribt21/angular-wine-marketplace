import { createFeatureSelector, createSelector } from '@ngrx/store';
import { QuickSearchState } from './quick-search.reducer';

export const quickSearchPopularSelector = createFeatureSelector<QuickSearchState>('quickSearchReducer');

export const isLoadingquickSearchPopularSelector = createSelector(
  quickSearchPopularSelector,
  ({ isLoadingQuickSearchPopularContents }: QuickSearchState) => isLoadingQuickSearchPopularContents
);

export const quickSearchPopularContentsSelector = createSelector(
  quickSearchPopularSelector,
  ({ quickSearchPopularContents }: QuickSearchState) => quickSearchPopularContents
);

export const quickSearchQuerySelector = createFeatureSelector<QuickSearchState>('quickSearchReducer');

export const quicksearchQueryTextSelector = createSelector(
  quickSearchQuerySelector,
  ({ quicksearchQueryText }: QuickSearchState, props) => quicksearchQueryText);

export const isLoadingquickSearchQuerySelector = createSelector(
  quickSearchQuerySelector,
  ({ isLoadingQuickSearchQueryContents }: QuickSearchState) => isLoadingQuickSearchQueryContents
);

export const quickSearchQueryContentsSelector = createSelector(
  quickSearchQuerySelector,
  ({ quickSearchQueryContents }: QuickSearchState) => quickSearchQueryContents
);
