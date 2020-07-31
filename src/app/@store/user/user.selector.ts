import {createFeatureSelector, createSelector} from '@ngrx/store';
import {UserState} from './user.reducer';

const userFeatureSelector = createFeatureSelector<UserState>('userReducer');

export const userDetailSelector = createSelector(
  userFeatureSelector,
  ({ userDetail }: UserState, props) => userDetail.name);

export const userCardsSelector = createSelector(
  userFeatureSelector,
  ({ userCards }: UserState, props) => userCards);

export const userAddressesSelector = createSelector(
  userFeatureSelector,
  ({ userAddresses }: UserState, props) => userAddresses);

export const userDetailNameSelector = createSelector(
  userFeatureSelector,
  ({ userDetail }: UserState, props) => userDetail.name);
