import {Action, createReducer, on} from '@ngrx/store';
import {Auth} from '../../auth/common/interfaces';

import * as routerActions from '../router/router.actions';
import * as authActions from './auth.actions';

export interface AuthState {
  ui: {
    isOpenModal: boolean,
  };
  auth: Auth;
}

export const initialState: AuthState = {
  ui: {
    isOpenModal: false,
  },
  auth: {
    auth: false,
    token: {
      user_id: '',
      token: '',
    },
  },
};

export const authReducer = createReducer(
  initialState,
  on(routerActions.routeNavigation, (state, { payload }) => {
    return {
      ...state,
      ui: {
        isOpenModal: initialState.ui.isOpenModal,
      },
    };
  }),
  on(authActions.authUiSet, (state, { payload }) => {
    return {
      ...state,
      ui: {
        isOpenModal: !state.ui.isOpenModal,
      },
    };
  }),
  on(authActions.closeOpenedModal, (state, { payload }) => {
    return {
      ...state,
      ui: {
        isOpenModal: initialState.ui.isOpenModal,
      },
    };
  }),
  on(authActions.registrationSuccess, (state, { auth, token }) => {
    return {
      ...state,
      auth: {
        ...state.auth,
        auth,
        ...token,
      },
    };
  }),
  on(authActions.loginRequestSuccess, (state, { auth, token }) => {
    return {
      ...state,
      auth: {
        ...state.auth,
        auth,
        ...token,
      },
    };
  }),
  on(authActions.logout, (state) => {
    return {
      ...initialState,
    };
  }),
);

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}
