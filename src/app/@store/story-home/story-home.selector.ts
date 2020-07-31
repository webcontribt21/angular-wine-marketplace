import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StoryHomeState } from './story-home.reducer';

export const storyHomeFeatureSelector = createFeatureSelector<StoryHomeState>('storyHomeReducer');

// latest story
export const isLoadingLatestStorySelector = createSelector(
  storyHomeFeatureSelector,
  ({ isLoadingLatestStory }: StoryHomeState) => isLoadingLatestStory
);

export const latestStorySelector = createSelector(
  storyHomeFeatureSelector,
  ({ latestStory }: StoryHomeState) => latestStory
);

// featured stories
export const isLoadingFeaturedArticlesSelector = createSelector(
  storyHomeFeatureSelector,
  ({ isLoadingFeaturedArticles }: StoryHomeState) => isLoadingFeaturedArticles
);

export const featuredArticlesSelector = createSelector(
  storyHomeFeatureSelector,
  ({ featuredArticles }: StoryHomeState) => featuredArticles
);

// most popular stories
export const isLoadingMostPopularArticlesSelector = createSelector(
  storyHomeFeatureSelector,
  ({ isLoadingMostPopularArticles }: StoryHomeState) => isLoadingMostPopularArticles
);

export const mostPopularArticlesSelector = createSelector(
  storyHomeFeatureSelector,
  ({ mostPopularArticles }: StoryHomeState) => mostPopularArticles
);

// top contributors
export const isLoadingTopContributorsSelector = createSelector(
  storyHomeFeatureSelector,
  ({ isLoadingTopContributors }: StoryHomeState) => isLoadingTopContributors
);

export const topContributorsSelector = createSelector(
  storyHomeFeatureSelector,
  ({ topContributors }: StoryHomeState) => topContributors
);

// video stories
export const isLoadingVideoStoriesSelector = createSelector(
  storyHomeFeatureSelector,
  ({ isLoadingVideoStories }: StoryHomeState) => isLoadingVideoStories
);

export const videoStoriesSelector = createSelector(
  storyHomeFeatureSelector,
  ({ videoStories }: StoryHomeState) => videoStories
);
