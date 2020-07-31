import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Homestate } from './home.reducer';

export const homeFeatureSelector = createFeatureSelector<Homestate>('homeReducer');

export const isLoadingTopArticleContentsSelector = createSelector(
  homeFeatureSelector,
  ({ isLoadingTopArticleContents }: Homestate) => isLoadingTopArticleContents
);

export const homeTopArticleContentsSelector = createSelector(
  homeFeatureSelector,
  ({ topArticleContents }: Homestate) => topArticleContents
);

export const isLoadingTopAdvertsContentsSelector = createSelector(
  homeFeatureSelector,
  ({ isLoadingTopAdvertsContents }: Homestate) => isLoadingTopAdvertsContents
);

export const homeTopAdvertsContentsSelector = createSelector(
  homeFeatureSelector,
  ({ topAdvertsContents }: Homestate) => topAdvertsContents
);

export const isLoadingTopFeaturedWinesSelector = createSelector(
  homeFeatureSelector,
  ({ isLoadingTopFeaturedWines }: Homestate) => isLoadingTopFeaturedWines
);

export const homeFeaturedWinesSelector = createSelector(
  homeFeatureSelector,
  ({ featuredWines }: Homestate) => featuredWines
);

export const isLoadingAdvertLeftSelector = createSelector(
  homeFeatureSelector,
  ({ isLoadingAdvertLeft }: Homestate) => isLoadingAdvertLeft
);

export const homeAdvertLeftSelector = createSelector(
  homeFeatureSelector,
  ({ advertLeft }: Homestate) => advertLeft
);

export const isLoadingStoryRightSelector = createSelector(
  homeFeatureSelector,
  ({ isLoadingStoryRight }: Homestate) => isLoadingStoryRight
);

export const homeStoryRightSelector = createSelector(
  homeFeatureSelector,
  ({ storyRight }: Homestate) => storyRight
);

export const isLoadingMidArticlesSelector = createSelector(
  homeFeatureSelector,
  ({ isLoadingMidArticles }: Homestate) => isLoadingMidArticles
);

export const homeMidArticlesSelector = createSelector(
  homeFeatureSelector,
  ({ mideArticles }: Homestate) => mideArticles
);

// Top Features
export const isLoadingHomeTopBannerDetailSelector = createSelector(
  homeFeatureSelector,
  ({ isLoadingTopBannerDetail }: Homestate) => isLoadingTopBannerDetail
);

export const homeTopBannerDetailSelector = createSelector(
  homeFeatureSelector,
  ({ topBannerDetail }: Homestate) => topBannerDetail
);

// Popular Wines
export const isLoadingPopularWinesSelector = createSelector(
  homeFeatureSelector,
  ({ isLoadingPopularWines }: Homestate) => isLoadingPopularWines
);

export const popularWinesSelector = createSelector(
  homeFeatureSelector,
  ({ popularWines }: Homestate) => popularWines
);

// Top Features Mobile
export const isLoadingHomeTopBannerMobileSelector = createSelector(
  homeFeatureSelector,
  ({ isTopBannerMobileDetail }: Homestate) => isTopBannerMobileDetail
);

export const homeTopBannerMobileSelector = createSelector(
  homeFeatureSelector,
  ({ topBannerMobileDetail }: Homestate) => topBannerMobileDetail
);
