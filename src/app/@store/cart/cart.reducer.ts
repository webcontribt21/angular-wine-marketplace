import {Action, createReducer, on} from '@ngrx/store';
import {AddItemToCart, ItemInCart} from '../../shared/interfaces/cart/add-item-to-cart.interface';
import { CartSummary } from 'src/app/shared/interfaces/cart/cart-summary.interface';
import { cloneDeep } from 'lodash';

import * as cartActions from './cart.actions';
import { OrderSummary } from 'src/app/shared/interfaces/checkout/order-summary.interface';

export interface CartState {
  _id: string;
  tempCartUserToken: string;
  isLoading: boolean;
  summary: CartSummary;
  quantity: number;
  // itemsDataIntoCart: ItemInCart[];
  isLoadingApplyVoucher: boolean;
  voucherError: string;
  successUpdateVoucherData: any;
  cartError: string;
}

function cartItemCount(cartSummary: CartSummary) {
  return (
    (cartSummary &&
      cartSummary.shipments &&
      cartSummary.shipments.length &&
      cartSummary.shipments
        .map(m => m.cartItems.map(c => c.quantity || 0).reduce((total, value) => (total += value)))
        .reduce((total, value) => (total += value))) ||
    0
  );
}

const initialState: CartState = {
  _id: null,
  tempCartUserToken: null,
  isLoading: false,
  summary: null,
  quantity: 0,
  isLoadingApplyVoucher: false,
  voucherError: '',
  successUpdateVoucherData: null,
  cartError: ''
  // itemsDataIntoCart: [],
};

const cartReduce = createReducer(
  initialState,
  on(cartActions.cartCreateSuccess, (state: CartState, { _id, tempCartUserToken }) => {
    return {
      ...state,
      _id,
      tempCartUserToken
    };
  }),
  on(cartActions.cartOnLogin, (state: CartState) => {
    return {
      ...state,
      isLoading: true
    };
  }),
  on(cartActions.cartOnLoginSuccess, (state: CartState, { _id, tempCartUserToken }) => {
    return {
      ...state,
      _id,
      tempCartUserToken,
      isLoading: false
    };
  }),
  on(cartActions.cartOnLoginFailure, (state: CartState) => {
    return {
      ...state,
      isLoading: false
    };
  }),
  on(cartActions.cartOnLogout, cartActions.cartResetAndClear, (state: CartState) => {
    return {
      ...initialState
    };
  }),
  on(cartActions.loadSummary, (state: CartState) => {
    return {
      ...state,
      isLoading: true
    };
  }),
  on(cartActions.loadSummarySuccess, (state: CartState, { summary }) => {
    return {
      ...state,
      isLoading: false,
      summary,
      quantity: cartItemCount(summary)
    };
  }),
  on(cartActions.loadSummaryFailure, (state: CartState) => {
    return {
      ...state,
      isLoading: false
    };
  }),

  on(cartActions.addItemToCartSuccess, (state: CartState, { quantity }) => {
    return {
      ...state,
      quantity: state.quantity + quantity
    };
  }),
  on(cartActions.addItemToCartFailure, (state: CartState, { message: cartError }) => {
    return {
      ...state,
      cartError
    };
  }),
  on(cartActions.addItemToCartClearError, (state: CartState) => {
    return {
      ...state,
      cartError: ''
    };
  }),
  on(cartActions.removeItemFromCartSuccess, (state: CartState, { _id, quantity }) => {
    return {
      ...state,
      quantity: state.quantity - quantity
    };
  }),

  // voucher
  on(cartActions.applyVoucherRequest, (state: CartState) => {
    return {
      ...state,
      isLoadingApplyVoucher: true,
      voucherError: ''
    };
  }),
  on(cartActions.applyVoucherSuccess, (state: CartState, { data }) => {
    return {
      ...state,
      successUpdateVoucherData: data,
      isLoadingApplyVoucher: false,
      voucherError: ''
    };
  }),
  on(cartActions.applyVoucherFailure, (state: CartState, { error }) => {
    return {
      ...state,
      isLoadingApplyVoucher: false,
      voucherError: error
    };
  }),
  // on(cartActions.removeAllItemsFromCartSuccess, (state: CartState) => {
  //   return {
  //     ...state,
  //     quantity: 0
  //   };
  // }),
);

export function reducer(state: CartState | undefined, action: Action) {
  return cartReduce(state, action);
}
