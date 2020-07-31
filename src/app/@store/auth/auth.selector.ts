import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AuthState} from './auth.reducer';

const authFeatureSelector = createFeatureSelector<AuthState>('authReducer');

export const isShowModalSelector = createSelector(
  authFeatureSelector,
  ({ ui }: AuthState, props) => ui.isOpenModal,
);

export const isAuth = createSelector(
  authFeatureSelector,
  ({ auth }: AuthState, props) => auth.auth,
);
