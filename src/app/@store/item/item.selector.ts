import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ItemState } from './item.reducer';
import { selectRouter, selectRouteId } from '../router/router.selector';

export const itemFeatureSelector = createFeatureSelector<ItemState>('itemReducer');

export const isLoadingItemSelector = createSelector(itemFeatureSelector, ({ isLoading }: ItemState, props) => isLoading);

export const itemSelector = createSelector(itemFeatureSelector, ({ item }: ItemState, props) => item);

export const brandDescriptionSelector = createSelector(itemFeatureSelector, ({ brandDescription }: ItemState, props) => brandDescription);

export const brandItemsSelector = createSelector(itemFeatureSelector, ({ brandItems }: ItemState, props) => brandItems);

export const itemRelatedArticlesSelector = createSelector(
    itemFeatureSelector,
    ({ itemRelatedArticles }: ItemState, props) => itemRelatedArticles
);