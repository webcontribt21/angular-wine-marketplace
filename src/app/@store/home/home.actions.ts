
import { createAction, props } from '@ngrx/store';

import {
  HOME_TOP_ARTICLES_LOAD,
  HOME_TOP_ARTICLES_LOAD_SUCCESS,
  HOME_TOP_ARTICLES_LOAD_FAIL,
  HOME_TOP_ADVERTS_LOAD,
  HOME_TOP_ADVERTS_LOAD_SUCCESS,
  HOME_TOP_ADVERTS_LOAD_FAIL,
  HOME_FEATURED_WINES_LOAD,
  HOME_FEATURED_WINES_LOAD_SUCCESS,
  HOME_FEATURED_WINES_LOAD_FAIL,
  HOME_BOTTOM_ADVERT_LEFT_LOAD,
  HOME_BOTTOM_ADVERT_LEFT_LOAD_SUCCESS,
  HOME_BOTTOM_ADVERT_LEFT_LOAD_FAIL,
  HOME_BOTTOM_STORY_RIGHT_LOAD,
  HOME_BOTTOM_STORY_RIGHT_LOAD_SUCCESS,
  HOME_BOTTOM_STORY_RIGHT_LOAD_FAIL,
  HOME_MID_ARTICLES_LOAD,
  HOME_MID_ARTICLES_LOAD_SUCCESS,
  HOME_MID_ARTICLES_LOAD_FAIL,
  HOME_TOP_FEATURES_LOAD,
  HOME_TOP_FEATURES_LOAD_SUCCESS,
  HOME_TOP_FEATURES_LOAD_FAIL,
  HOME_POPULAR_WINES_LOAD,
  HOME_POPULAR_WINES_LOAD_SUCCESS,
  HOME_POPULAR_WINES_LOAD_FAIL,
  HOME_TOP_BANNER_LOAD,
  HOME_TOP_BANNER_LOAD_SUCCESS,
  HOME_TOP_BANNER_LOAD_FAILURE
} from './home.types';
import {
  AdvertType
} from 'src/app/shared/interfaces/home';

export const loadHomeTopArticles: any = createAction(HOME_TOP_ARTICLES_LOAD);
export const loadHomeTopArticlesSuccess: any = createAction(
  HOME_TOP_ARTICLES_LOAD_SUCCESS,
  props<{ contents: Object[] }>()
);
export const loadHomeTopArticlesError: any = createAction(HOME_TOP_ARTICLES_LOAD_FAIL);

export const loadHomeTopAdverts: any = createAction(HOME_TOP_ADVERTS_LOAD);
export const loadHomeTopAdvertsSuccess: any = createAction(
  HOME_TOP_ADVERTS_LOAD_SUCCESS,
  props<{ contents: AdvertType[] }>()
);
export const loadHomeTopAdvertsError: any = createAction(HOME_TOP_ADVERTS_LOAD_FAIL);

// Featured Wines
export const loadHomeFeaturedWines: any = createAction(HOME_FEATURED_WINES_LOAD);
export const loadHomeFeaturedWinesSuccess: any = createAction(
  HOME_FEATURED_WINES_LOAD_SUCCESS,
  props<{ wines: Object[] }>()
);
export const loadHomeFeaturedWinesError: any = createAction(HOME_FEATURED_WINES_LOAD_FAIL);

export const loadHomeBottomAdvertLeft: any = createAction(HOME_BOTTOM_ADVERT_LEFT_LOAD);
export const loadHomeBottomAdvertLeftSuccess: any = createAction(
  HOME_BOTTOM_ADVERT_LEFT_LOAD_SUCCESS,
  props<{ advert: Object }>()
);
export const loadHomeBottomAdvertLeftError: any = createAction(HOME_BOTTOM_ADVERT_LEFT_LOAD_FAIL);

export const loadHomeBottomStoryRight: any = createAction(HOME_BOTTOM_STORY_RIGHT_LOAD);
export const loadHomeBottomStoryRightSuccess: any = createAction(
  HOME_BOTTOM_STORY_RIGHT_LOAD_SUCCESS,
  props<{ article: Object }>()
);
export const loadHomeBottomStoryRightError: any = createAction(HOME_BOTTOM_STORY_RIGHT_LOAD_FAIL);

export const loadHomeMidArticles: any = createAction(HOME_MID_ARTICLES_LOAD);
export const loadHomeMidArticlesSuccess: any = createAction(
  HOME_MID_ARTICLES_LOAD_SUCCESS,
  props<{ articles: Object[] }>()
);
export const loadHomeMidArticlesError: any = createAction(HOME_MID_ARTICLES_LOAD_FAIL);

// Home Top Features
export const loadHomeTopFeatures: any = createAction(HOME_TOP_FEATURES_LOAD);
export const loadHomeTopFeaturesSuccess: any = createAction(
  HOME_TOP_FEATURES_LOAD_SUCCESS,
  props<{ detail: Object }>()
);
export const loadHomeTopFeaturesError: any = createAction(HOME_TOP_FEATURES_LOAD_FAIL);

// Home Popular Wines
export const loadHomePopularWines: any = createAction(HOME_POPULAR_WINES_LOAD);
export const loadHomePopularWinesSuccess: any = createAction(
  HOME_POPULAR_WINES_LOAD_SUCCESS,
  props<{ wines: Object[] }>()
);
export const loadHomePopularWinesError: any = createAction(HOME_POPULAR_WINES_LOAD_FAIL);

// Top Banner Mobile
export const loadHomeTopBannerMobile: any = createAction(HOME_TOP_BANNER_LOAD);
export const loadHomeTopBannerMobileSuccess: any = createAction(
  HOME_TOP_BANNER_LOAD_SUCCESS,
  props<{ detail: Object }>()
);
export const loadHomeTopBannerMobileError: any = createAction(HOME_TOP_BANNER_LOAD_FAILURE);
