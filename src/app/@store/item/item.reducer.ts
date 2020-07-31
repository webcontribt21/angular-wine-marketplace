import { Action, createReducer, on } from '@ngrx/store';
import { Item } from '../../shared/interfaces/item.interface';

import * as itemActions from './item.actions';
import { ItemRelatedArticle } from 'src/app/shared/interfaces/item-related-article.interface';

export interface ItemState {
  isLoading: boolean;
  item: Item;
  brandDescription: string;
  brandItems: Item[];
  itemRelatedArticles: ItemRelatedArticle[];
}

const initialState: ItemState = {
  isLoading: false,
  item: null,
  brandDescription: null,
  brandItems: [],
  itemRelatedArticles: []
};

const itemReducer = createReducer(
  initialState,
  on(itemActions.loadItem, state => {
    return {
      ...state,
      isLoading: true,
      item: null
    };
  }),
  on(itemActions.loadItemSuccess, (state, { item }) => {
    return {
      ...state,
      isLoading: false,
      item
    };
  }),
  on(itemActions.loadItemOtherBrandItems, state => {
    return {
      ...state,
      isLoading: true,
      brandDescription: null,
      brandItems: []
    };
  }),
  on(itemActions.loadItemOtherBrandItemsSuccess, (state, { description, items }) => {
    return {
      ...state,
      isLoading: false,
      brandDescription: description,
      brandItems: items
    };
  }),
  on(itemActions.loadItemRelatedArticles, state => {
    return {
      ...state,
      isLoading: true,
      itemRelatedArticles: []
    };
  }),
  on(itemActions.loadItemRelatedArticlesSuccess, (state, { articles }) => {
    return {
      ...state,
      isLoading: false,
      itemRelatedArticles: articles
    };
  })
);

export function reducer(state: ItemState | undefined, action: Action) {
  return itemReducer(state, action);
}
