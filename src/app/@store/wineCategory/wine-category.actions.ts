import {createAction, props} from '@ngrx/store';
import {
  WINES__GET_ITEMS_DETAIL_TYPE,
  WINES__LOAD_WINE_CATEGORIES, WINES__LOAD_WINE_CATEGORIES_ALL_SUCCESS,
  WINES__LOAD_WINE_CATEGORIES_FAILURE,
  WINES__LOAD_WINE_CATEGORIES_SUCCESS,
} from './wine-category.types';
import {ItemDetailTypeState} from './wine-category.reducer';
import {Facet} from '../../shared/interfaces/facet.interface';

export const loadWineCategoriesSuccess: any = createAction(
  WINES__LOAD_WINE_CATEGORIES_SUCCESS,
  props<ItemDetailTypeState>()
);

export const loadWineCategoriesError: any = createAction(
  WINES__LOAD_WINE_CATEGORIES_FAILURE,
  props()
);

export const loadWineCategories: any = createAction(
  WINES__LOAD_WINE_CATEGORIES,
);

export const getItemsDetailType: any = createAction(
  WINES__GET_ITEMS_DETAIL_TYPE,
  props()
);

export const loadWineCategoriesAllSuccess: any = createAction(
  WINES__LOAD_WINE_CATEGORIES_ALL_SUCCESS,
  props<{ itemDetailTypesWithCount: ItemDetailTypeState[], facets: Facet[] }>()
);
