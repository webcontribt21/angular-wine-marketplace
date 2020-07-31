import {createAction, props} from '@ngrx/store';
import {
  NAV__CLOSE_MOBILE_DROP_DOWN_MENU, NAV__MOBILE_DROP_DOWN_MENU_SET_DATA,
  NAV__MODAL_CLOSE,
  NAV__TOGGLE_MOBILE_DROP_DOWN_MENU,
  NAV__TOGGLE_MODAL,
  NAV__UI_SET_DATA,
  NAV__CLICK_CATEGORY
} from './nav.types';
import {Nav} from '../../shared/interfaces/nav.interface';

export const navToggleModal: any = createAction(
  NAV__TOGGLE_MODAL,
  props<Nav>()
);

export const navCloseModal: any = createAction(
  NAV__MODAL_CLOSE,
);

export const navUiSet: any = createAction(
  NAV__UI_SET_DATA,
  props()
);

export const navToggleMobileDropDownMenu: any = createAction(
  NAV__TOGGLE_MOBILE_DROP_DOWN_MENU,
);

export const navCloseMobileDropDownMenu: any = createAction(
  NAV__CLOSE_MOBILE_DROP_DOWN_MENU
);

export const setMobileDropDownMenuData: any = createAction(
  NAV__MOBILE_DROP_DOWN_MENU_SET_DATA,
  props()
);

export const navClickCategory: any = createAction(
  NAV__CLICK_CATEGORY,
  props<Nav>()
);
