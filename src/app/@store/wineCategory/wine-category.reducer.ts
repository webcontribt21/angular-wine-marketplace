import {Action, createReducer, on} from '@ngrx/store';
import {ItemDetailType} from '../../shared/interfaces/Item-detail-type.interface';
import {Facet} from '../../shared/interfaces/facet.interface';

import * as wineCategoryActions from './wine-category.actions';

export interface ItemDetailTypeState {
  allCategories: ItemDetailType[];
  facets: Facet[];
}

const initialState: ItemDetailTypeState = {
  allCategories: [],
  facets: [],
};

const wineCategoryReducer = createReducer(
  initialState,
  on(wineCategoryActions.loadWineCategoriesAllSuccess, (state, { itemDetailTypesWithCount, facets }) => {
    return {
      ...state,
      allCategories: [...itemDetailTypesWithCount],
      facets: [...facets],
    }
  }),
);

export function reducer(state: ItemDetailTypeState | undefined, action: Action) {
  return wineCategoryReducer(state, action);
}
