import { createAction, props } from '@ngrx/store';
import {
    ITEM__LOAD_FAILURE,
    ITEM__LOAD_SUCCESS,
    ITEM__LOAD,
    ITEM__LOAD_OTHER_BRAND_ITEMS_FAILURE,
    ITEM__LOAD_OTHER_BRAND_ITEMS_SUCCESS,
    ITEM__LOAD_OTHER_BRAND_ITEMS,
    ITEM__LOAD_RELATED_ARTICLES_FAILURE,
    ITEM__LOAD_RELATED_ARTICLES_SUCCESS,
    ITEM__LOAD_RELATED_ARTICLES
} from './item.types';
import { Item } from '../../shared/interfaces/item.interface';
import { ItemRelatedArticle } from 'src/app/shared/interfaces/item-related-article.interface';

export const loadItemSuccess: any = createAction(ITEM__LOAD_SUCCESS, props<{ item: Item }>());

export const loadItemError: any = createAction(ITEM__LOAD_FAILURE);

export const loadItem: any = createAction(ITEM__LOAD);

export const loadItemOtherBrandItemsSuccess: any = createAction(ITEM__LOAD_OTHER_BRAND_ITEMS_SUCCESS, props<{ items: Item[] }>());

export const loadItemOtherBrandItemsError: any = createAction(ITEM__LOAD_OTHER_BRAND_ITEMS_FAILURE);

export const loadItemOtherBrandItems: any = createAction(ITEM__LOAD_OTHER_BRAND_ITEMS, props<{ description: string }>());

export const loadItemRelatedArticlesSuccess: any = createAction(
    ITEM__LOAD_RELATED_ARTICLES_SUCCESS,
    props<{ articles: ItemRelatedArticle[] }>()
);

export const loadItemRelatedArticlesError: any = createAction(ITEM__LOAD_RELATED_ARTICLES_FAILURE);

export const loadItemRelatedArticles: any = createAction(ITEM__LOAD_RELATED_ARTICLES, props<{ _id: string }>());
