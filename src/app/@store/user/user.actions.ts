import {createAction, props} from '@ngrx/store';
import {
  USER_LOAD_DETAIL,
  USER_LOAD_DETAIL_SUCCESS,
  USER_LOAD_CARDS,
  USER_LOAD_CARDS_SUCCESS,
  USER_LOAD_ADDRESSES,
  USER_LOAD_ADDRESSES_SUCCESS,
  USER_DELETE_ADDRESS,
  USER_DELETE_ADDRESS_SUCCESS,
  USER_CREATE_ADDRESS,
  USER_CREATE_ADDRESS_SUCCESS,
  USER_EDIT_ADDRESS,
  USER_EDIT_ADDRESS_SUCCESS,
  USER_EDIT_ADDRESS_SET_BILLING_DEFAULT,
  USER_EDIT_ADDRESS_SET_BILLING_DEFAULT_SUCCESS,
  USER_EDIT_ADDRESS_SET_DELIVERY_DEFAULT,
  USER_EDIT_ADDRESS_SET_DELIVERY_DEFAULT_SUCCESS
} from './user.types';
import {UserDetail, UserAddress, UserCard} from '../../user/common/interfaces';
import {UserDetailDto} from '../../user/common/dto';

export const loadUserData: any = createAction(
  USER_LOAD_DETAIL,
  props<UserDetailDto>()
);

export const loadUserDataSuccess: any = createAction(
  USER_LOAD_DETAIL_SUCCESS,
  props<UserDetail>()
);

export const loadUserCardsData: any = createAction(
  USER_LOAD_CARDS,
  props()
);

export const loadUserCardsDataSuccess: any = createAction(
  USER_LOAD_CARDS_SUCCESS,
  props<{ userCards: UserCard[] }>()
);

export const loadUserAddressesData: any = createAction(
  USER_LOAD_ADDRESSES,
  props<UserDetailDto>()
);

export const loadUserAddressesDataSuccess: any = createAction(
  USER_LOAD_ADDRESSES_SUCCESS,
  props<{ userAddresses: UserAddress[] }>()
);

export const createUserAddress: any = createAction(
  USER_CREATE_ADDRESS,
  props<UserAddress>()
);

export const createUserAddressSuccess: any = createAction(
  USER_CREATE_ADDRESS_SUCCESS,
  props<UserAddress>()
);

export const deleteUserAddress: any = createAction(
  USER_DELETE_ADDRESS,
  props<{ _id: string}>()
);

export const deleteUserAddressSuccess: any = createAction(
  USER_DELETE_ADDRESS_SUCCESS,
  props<{ _id: string}>()
);

export const editUserAddress: any = createAction(
  USER_EDIT_ADDRESS,
  props<UserAddress>()
);

export const editUserAddressSuccess: any = createAction(
  USER_EDIT_ADDRESS_SUCCESS,
  props<UserAddress>()
);

export const editUserAddressSetDeliveryDefault: any = createAction(
  USER_EDIT_ADDRESS_SET_DELIVERY_DEFAULT,
  props<{_id: string, _fromId: string}>()
);

export const editUserAddressSetDeliveryDefaultSuccess: any = createAction(
  USER_EDIT_ADDRESS_SET_DELIVERY_DEFAULT_SUCCESS,
  props<{ _id: string}>()
);

export const editUserAddressSetBillingDefault: any = createAction(
  USER_EDIT_ADDRESS_SET_BILLING_DEFAULT,
  props<{ _id: string, _fromId: string}>()
);

export const editUserAddressSetBillingDefaultSuccess: any = createAction(
  USER_EDIT_ADDRESS_SET_BILLING_DEFAULT_SUCCESS,
  props<{ _id: string}>()
);
