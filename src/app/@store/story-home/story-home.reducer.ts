import { Action, createReducer, on } from '@ngrx/store';

import { Article } from 'src/app/shared/interfaces/article.interface';
import * as actions from './story-home.actions';
import { Author } from 'src/app/shared/interfaces/author.interface';

export interface StoryHomeState {
  latestStory: Article;
  featuredArticles: Article[];
  mostPopularArticles: Article[];
  topContributors: Author[];
  videoStories: Article[];
  isLoadingLatestStory: boolean;
  isLoadingFeaturedArticles: boolean;
  isLoadingMostPopularArticles: boolean;
  isLoadingTopContributors: boolean;
  isLoadingVideoStories: boolean;
}

const initialState: StoryHomeState = {
  latestStory: {
    _id: '',
    title: '',
    titleShort: ''
  },
  featuredArticles: [],
  mostPopularArticles: [],
  topContributors: [],
  videoStories: [],
  isLoadingLatestStory: false,
  isLoadingFeaturedArticles: false,
  isLoadingMostPopularArticles: false,
  isLoadingTopContributors: false,
  isLoadingVideoStories: false
};

const storyHomeReducer = createReducer(
  initialState,
  // load latest story
  on(actions.loadLatestStory, (state) => {
    return {
      ...state,
      isLoadingLatestStory: true
    };
  }),
  on(actions.loadLatestStorySuccess, (state, { article }) => {
    return {
      ...state,
      latestStory: article,
      isLoadingLatestStory: false
    };
  }),
  // load featured stories
  on(actions.loadFeaturedStories, (state) => {
    return {
      ...state,
      isLoadingFeaturedArticles: true
    };
  }),
  on(actions.loadFeaturedStoriesSuccess, (state, { articleItems }) => {
    const featuredArticles = articleItems.map((item: object) => item['article'][0]).slice(0, 2);

    return {
      ...state,
      featuredArticles,
      isLoadingFeaturedArticles: false
    };
  }),
  // load most popular stories
  on(actions.loadMostPopularStories, (state) => {
    return {
      ...state,
      isLoadingMostPopularArticles: true
    };
  }),
  on(actions.loadMostPopularStoriesSuccess, (state, { articles }) => {
    return {
      ...state,
      mostPopularArticles: articles,
      isLoadingMostPopularArticles: false
    };
  }),
  // load top authors
  on(actions.loadTopContributors, (state) => {
    return {
      ...state,
      isLoadingTopContributors: true
    };
  }),
  on(actions.loadTopContributorsSuccess, (state, { topContributors }) => {
    return {
      ...state,
      topContributors,
      isLoadingTopContributors: false
    };
  }),
  // load video stories
  on(actions.loadVideoStories, (state) => {
    return {
      ...state,
      isLoadingVideoStories: true
    };
  }),
  on(actions.loadVideoStoriesSuccess, (state, { videoItems }) => {
    const videoStories = videoItems.map((item: object) => item['article'][0]).slice(0, 2);
    return {
      ...state,
      videoStories,
      isLoadingVideoStories: false
    };
  }),
);

export function reducer(state: StoryHomeState | undefined, action: Action) {
  return storyHomeReducer(state, action);
}
