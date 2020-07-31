import { Action, createReducer, on } from '@ngrx/store';

import * as homeActions from './home.actions';
import {
  ArticleType,
  AdvertType
} from 'src/app/shared/interfaces/home';

export interface Homestate {
  topArticleContents: ArticleType[];
  topAdvertsContents: AdvertType[];
  featuredWines: Object[];
  mideArticles: Object[];
  popularWines: Object[];
  advertLeft: Object;
  storyRight: Object;
  topBannerDetail: Object;
  topBannerMobileDetail: Object;
  isLoadingTopArticleContents: boolean;
  isLoadingTopAdvertsContents: boolean;
  isLoadingTopFeaturedWines: boolean;
  isLoadingAdvertLeft: boolean;
  isLoadingStoryRight: boolean;
  isLoadingMidArticles: boolean;
  isLoadingTopBannerDetail: boolean;
  isLoadingPopularWines: boolean;
  isTopBannerMobileDetail: boolean;
}

const initialState: Homestate = {
  topArticleContents: [],
  topAdvertsContents: [],
  featuredWines: [],
  mideArticles: [],
  popularWines: [],
  advertLeft: {},
  storyRight: {},
  topBannerDetail: {},
  topBannerMobileDetail: {},
  isLoadingTopArticleContents: false,
  isLoadingTopAdvertsContents: false,
  isLoadingTopFeaturedWines: false,
  isLoadingAdvertLeft: false,
  isLoadingStoryRight: false,
  isLoadingMidArticles: false,
  isLoadingTopBannerDetail: false,
  isLoadingPopularWines: false,
  isTopBannerMobileDetail: false
};

const homeReducer = createReducer(
  initialState,
  on(homeActions.loadHomeTopArticles, (state) => {
    return {
      ...state,
      isLoadingTopArticleContents: true
    };
  }),
  on(homeActions.loadHomeTopArticlesSuccess, (state, { contents }) => {
    const updatedContents = contents.map(content => (content.article && content.article[0]) ? content.article[0] : {});

    return {
      ...state,
      topArticleContents: updatedContents,
      isLoadingTopArticleContents: false
    };
  }),
  on(homeActions.loadHomeTopAdverts, (state) => {
    return {
      ...state,
      isLoadingTopAdvertsContents: true
    };
  }),
  on(homeActions.loadHomeTopAdvertsSuccess, (state, { contents }) => {
    return {
      ...state,
      topAdvertsContents: contents,
      isLoadingTopAdvertsContents: false
    };
  }),
  on(homeActions.loadHomeFeaturedWines, (state) => {
    return {
      ...state,
      isLoadingTopFeaturedWines: true
    };
  }),
  on(homeActions.loadHomeFeaturedWinesSuccess, (state, { wines }) => {
    const featuredWines = wines.map(wine => wine.item && wine.item[0] ? wine.item[0] : {});

    return {
      ...state,
      featuredWines,
      isLoadingTopFeaturedWines: false
    };
  }),
  on(homeActions.loadHomeBottomAdvertLeft, (state) => {
    return {
      ...state,
      isLoadingAdvertLeft: true
    };
  }),
  on(homeActions.loadHomeBottomAdvertLeftSuccess, (state, { advert }) => {
    return {
      ...state,
      advertLeft: advert,
      isLoadingAdvertLeft: false
    };
  }),
  on(homeActions.loadHomeBottomStoryRight, (state) => {
    return {
      ...state,
      isLoadingStoryRight: true
    };
  }),
  on(homeActions.loadHomeBottomStoryRightSuccess, (state, { article }) => {
    return {
      ...state,
      storyRight: article && article[0] ? article[0] : {},
      isLoadingStoryRight: false
    };
  }),
  on(homeActions.loadHomeMidArticles, (state) => {
    return {
      ...state,
      isLoadingMidArticles: true
    };
  }),
  on(homeActions.loadHomeMidArticlesSuccess, (state, { articles }) => {
    const updatedArticles = articles.map(content => (content.article && content.article[0]) ? content.article[0] : {});

    return {
      ...state,
      mideArticles: updatedArticles,
      isLoadingMidArticles: false
    };
  }),
  // Top Features
  on(homeActions.loadHomeTopFeatures, (state) => {
    return {
      ...state,
      isLoadingTopBannerDetail: true
    };
  }),
  on(homeActions.loadHomeTopFeaturesSuccess, (state, { detail }) => {
    return {
      ...state,
      topBannerDetail: detail,
      isLoadingTopBannerDetail: false
    };
  }),
  // Popular Wines
  on(homeActions.loadHomePopularWines, (state) => {
    return {
      ...state,
      isLoadingPopularWines: true
    };
  }),
  on(homeActions.loadHomePopularWinesSuccess, (state, { wines }) => {
    return {
      ...state,
      popularWines: wines,
      isLoadingPopularWines: false
    };
  }),
  // Top Banner Mobile
  on(homeActions.loadHomeTopBannerMobile, (state) => {
    return {
      ...state,
      isTopBannerMobileDetail: true
    };
  }),
  on(homeActions.loadHomeTopBannerMobileSuccess, (state, { detail }) => {
    return {
      ...state,
      topBannerMobileDetail: detail,
      isTopBannerMobileDetail: false
    };
  }),
);

export function reducer(state: Homestate | undefined, action: Action) {
  return homeReducer(state, action);
}
