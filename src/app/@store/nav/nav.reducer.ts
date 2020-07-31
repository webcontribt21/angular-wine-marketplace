import {Action, createReducer, on} from '@ngrx/store';

import * as navActions from './nav.actions';

export interface NavState {
  ui: {
    isOpenModal: boolean,
    selected: string,
    clicked: string
  },
  mobileDropDownMenu: {
    isOpenMenu: boolean,
  }
}

export const initialState: NavState = {
  ui: {
    isOpenModal: false,
    selected: '',
    clicked: ''
  },
  mobileDropDownMenu: {
    isOpenMenu: false,
  }
};

export const navReducer = createReducer(
  initialState,
  on(navActions.navUiSet, (state, { payload }) => {
    return {
      ...state,
      ui: {
        ...state.ui,
        ...payload,
      },
    }
  }),
  on(navActions.setMobileDropDownMenuData, (state, { payload }) => {
    return {
      ...state,
      mobileDropDownMenu: {
        ...state.mobileDropDownMenu,
        ...payload,
      }
    }
  })
);


export function reducer(state: NavState | undefined, action: Action) {
  return navReducer(state, action);
}
