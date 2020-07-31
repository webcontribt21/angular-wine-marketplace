import {createFeatureSelector, createSelector} from '@ngrx/store';
import {NavState} from './nav.reducer';

const navModalFeatureSelector = createFeatureSelector<NavState>('navReducer');

export const navModalSelector = createSelector(
  navModalFeatureSelector,
  ({ ui }: NavState, props) => ui,
);

export const selectNavSectionSelector = createSelector(
  navModalFeatureSelector,
  ({ ui }: NavState, props) => ui.selected
);

export const isOpenNavSectionSelector = createSelector(
  navModalFeatureSelector,
  ({ ui }: NavState, props) => ui.isOpenModal
);

export const navMobileDropDownSelector = createSelector(
  navModalFeatureSelector,
  ({ mobileDropDownMenu }: NavState, props) => mobileDropDownMenu.isOpenMenu,
);

export const selectNavClickedSelector = createSelector(
  navModalFeatureSelector,
  ({ ui }: NavState, props) => ui.clicked
);
