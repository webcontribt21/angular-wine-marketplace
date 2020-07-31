import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ItemDetailTypeState} from './wine-category.reducer';
import {All_SECTIONS} from '../../shared/constants';
import {Helper} from '../../shared/helpers';
import { cloneDeep } from 'lodash';

export const getWineCategories = createFeatureSelector<ItemDetailTypeState>('wineCategoryReducer');

export const getAllItemDetailTypes = createSelector(
  getWineCategories,
  ({ allCategories }: ItemDetailTypeState, props) => allCategories
);

export const getItemDetailTypes = createSelector(
  getWineCategories,
  ({ allCategories, facets }: ItemDetailTypeState, props) => {
    const wineCategory = cloneDeep(allCategories.find(el => el.description.toLowerCase() === props.type.toLowerCase()));

    if (props.type.toLowerCase() === 'type') {
      const newItemDetailTypeValues = Helper.createNewItemDetailTypeValue('All Wines');

      if (wineCategory) {
        wineCategory.itemDetailTypeValues = [
          newItemDetailTypeValues,
          ...wineCategory.itemDetailTypeValues
        ];
      }
    }

    return wineCategory ? wineCategory.itemDetailTypeValues : [];
  }
);

export const itemDetailTypesByKeySelector = createSelector(
  getWineCategories,
  ({ allCategories, facets }: ItemDetailTypeState, props: { key: string }) => {
    const foundItemDetailsType = Helper.foundItemDetailsType(allCategories, props.key);

    if (All_SECTIONS.hasOwnProperty(props.key.toUpperCase())) {
      const section = All_SECTIONS[props.key.toUpperCase()];

      if (section.hasOwnProperty('DESCRIPTION_ITEM_DETAIL_TYPE') && section.hasOwnProperty('DESCRIPTION')) {

        const descriptionItemDetailType = All_SECTIONS[props.key.toUpperCase()].DESCRIPTION_ITEM_DETAIL_TYPE.toLowerCase();
        const description = All_SECTIONS[props.key.toUpperCase()].DESCRIPTION;

        const categories = Helper.addAllSection(
          descriptionItemDetailType,
          description,
          foundItemDetailsType,
          facets,
        );

        return categories;
      } else {
        console.warn('itemDetailTypesByKeySelector: All_SECTIONS has key, but object hasn\'t property' +
          'DESCRIPTION_ITEM_DETAIL_TYPE or DESCRIPTION');
      }
    } else {
      console.warn('itemDetailTypesByKeySelector: All_SECTIONS hasn\'t property ' + props.key);
    }

    return foundItemDetailsType;
  }
);

export const filtersByKeySelector = createSelector(
  getWineCategories,
  ({ allCategories, facets }: ItemDetailTypeState, props: { key: string }) => {
    return Helper.foundItemDetailsType(allCategories, props.key);
  }
);
