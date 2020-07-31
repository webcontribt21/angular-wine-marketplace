import {Action, createReducer, on} from '@ngrx/store';
import {UserDetail, UserAddress, UserCard} from '../../user/common/interfaces';

import * as userActions from './user.actions';
import * as authActions from '../auth/auth.actions';


export interface UserState {
  userDetail: UserDetail;
  userAddresses: UserAddress[];
  userCards: UserCard[];
}

export const initialState: UserState = {
  userDetail: {
    _id: '',
    shop_id: '',
    supplier_id: '',
    name: '',
    email: '',
    password: '',
    status: false,
    userTypeNo: [],
    dateCreated: '',
  },
  userAddresses: [],
  userCards: []
};

export const userReducer = createReducer(
  initialState,
  on(userActions.loadUserDataSuccess, (state, { userDetail }) => {
    return {
      ...state,
      userDetail: {
        ...state.userDetail,
        ...userDetail,
      }
    };
  }),
  on(userActions.loadUserCardsDataSuccess, (state, { userCards }) => {
    return {
      ...state,
      userCards: (userCards && [...userCards]) || []
    };
  }),
  on(userActions.loadUserAddressesDataSuccess, (state, { userAddresses }) => {
    return {
      ...state,
      userAddresses: (userAddresses && [...userAddresses]) || []
    };
  }),
  on(userActions.deleteUserAddressSuccess, (state, { _id }) => {
    return {
      ...state,
      userAddresses: state.userAddresses.filter(f => f._id !== _id)
    };
  }),
  on(userActions.createUserAddressSuccess, (state, { address }) => {
    return {
      ...state,
      userAddresses: [...state.userAddresses, address]
    };
  }),
  on(userActions.editUserAddressSuccess, (state, { address }) => {
    const userAddresses = state.userAddresses.map(f => {
      if (f._id === address._id) {
        return {
          ...f,
          ...address
        };
      }
      return f;
    });
    return {
      ...state,
      userAddresses
    };
  }),
  on(userActions.editUserAddressSetDeliveryDefaultSuccess, (state, { _id }) => {
    const userAddresses = state.userAddresses.map(f => {
      if (f._id === _id) {
        return {
          ...f,
          isDeliveryDefault: true
        };
      }
      return {
        ...f,
        isDeliveryDefault: false
      };
    });
    return {
      ...state,
      userAddresses
    };
  }),
  on(userActions.editUserAddressSetBillingDefaultSuccess, (state, { _id }) => {
    const userAddresses = state.userAddresses.map(f => {
      if (f._id === _id) {
        return {
          ...f,
          isBillingDefault: true
        };
      }
      return {
        ...f,
        isBillingDefault: false
      };
    });
    return {
      ...state,
      userAddresses
    };
  }),
  on(authActions.logout, (state) => {
    return {
      ...initialState,
    };
  })
);

export function reducer(state: UserState | undefined, action: Action) {
  return userReducer(state, action);
}
