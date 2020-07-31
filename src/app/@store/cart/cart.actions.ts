import {createAction, props} from '@ngrx/store';
import {
  CART_LOAD_SUMMARY,
  CART_LOAD_SUMMARY_SUCCESS,
  CART_LOAD_SUMMARY_FAILURE,
  CART_ADD_ITEM,
  CART_ADD_ITEM_SUCCESS,
  CART_SET_QUANTITY,
  CART_SET_QUANTITY_SUCCESS,
  CART_DECREMENT_QUANTITY,
  CART_DECREMENT_QUANTITY_SUCCESS,
  CART_INCREMENT_QUANTITY,
  CART_INCREMENT_QUANTITY_SUCCESS,
  CART_REMOVE_ALL_ITEMS,
  CART_REMOVE_ALL_ITEMS_SUCCESS,
  CART_REMOVE_ITEM,
  CART_REMOVE_ITEM_SUCCESS,
  CART_UPDATE_ITEM_INTO_CART,
  CART_UPDATE_ITEM_INTO_CART_SUCCESS,
  CART_CREATE,
  CART_CREATE_SUCCESS,
  CART_ON_LOGIN,
  CART_ON_LOGIN_SUCCESS,
  CART_ON_LOGIN_FAILURE,
  CART_ON_LOGOUT,
  CART_RESET,
  CART_APPLY_VOUCHER_REQUEST,
  CART_APPLY_VOUCHER_SUCCESS,
  CART_APPLY_VOUCHER_FAILURE,
  CART_ADD_ITEM_FAILURE,
  CART_ADD_ITEM_CLEAR_ERROR
} from './cart.types';

import {CartSummary} from '../../shared/interfaces/cart/cart-summary.interface';
import {AddItemToCart, ItemInCart} from '../../shared/interfaces/cart/add-item-to-cart.interface';
import {UpdateItemIntoCart} from '../../shared/interfaces/cart/update-quantity-item-into-cart.interface';

export const loadSummary: any = createAction(
  CART_LOAD_SUMMARY,
);

export const loadSummarySuccess: any = createAction(
  CART_LOAD_SUMMARY_SUCCESS,
  props<{ summary: CartSummary }>()
);

export const loadSummaryFailure: any = createAction(
  CART_LOAD_SUMMARY_FAILURE,
);

export const addItemToCart: any = createAction(
  CART_ADD_ITEM,
  props<{ itemDataToCart: AddItemToCart }>()
);

export const addItemToCartSuccess: any = createAction(
  CART_ADD_ITEM_SUCCESS,
  props<{ itemDataToCart: ItemInCart }>()
);

export const addItemToCartFailure: any = createAction(
  CART_ADD_ITEM_FAILURE,
  props<{ message: string }>()
);

export const addItemToCartClearError: any = createAction(
  CART_ADD_ITEM_CLEAR_ERROR
);

export const updateItemFromCart: any = createAction(
  CART_UPDATE_ITEM_INTO_CART,
  props<{ itemDataToCart: UpdateItemIntoCart}>()
);

export const updateItemFromCartSuccess: any = createAction(
  CART_UPDATE_ITEM_INTO_CART_SUCCESS,
  props<{ itemDataToCart: ItemInCart}>()
);

export const removeItemFromCart: any = createAction(
  CART_REMOVE_ITEM,
  props<{ _id: string, quantity: number }>()
);

export const removeItemFromCartSuccess: any = createAction(
  CART_REMOVE_ITEM_SUCCESS,
  props<{ _id: string, quantity: number }>()
);

// export const removeAllItemsFromCart: any = createAction(
//   CART_REMOVE_ALL_ITEMS,
// );

// export const removeAllItemsFromCartSuccess: any = createAction(
//   CART_REMOVE_ALL_ITEMS_SUCCESS,
// );

export const setQuantity: any = createAction(
  CART_SET_QUANTITY,
  props<{ _id: string, quantity: number }>()
);

export const setQuantitySuccess: any = createAction(
  CART_SET_QUANTITY_SUCCESS,
  props<{ _id: string, quantity: number }>()
);

// export const incrementQuantity: any = createAction(
//   CART_INCREMENT_QUANTITY,
//   props<{ itemDataToCart: UpdateItemIntoCart}>()
// );

// export const incrementQuantitySuccess: any = createAction(
//   CART_INCREMENT_QUANTITY_SUCCESS,
//   props<{ itemDataToCart: ItemInCart}>()
// );

// export const decrementQuantity: any = createAction(
//   CART_DECREMENT_QUANTITY,
//   props<{ itemDataToCart: UpdateItemIntoCart}>()
// );

// export const decrementQuantitySuccess: any = createAction(
//   CART_DECREMENT_QUANTITY_SUCCESS,
//   props<{ itemDataToCart: ItemInCart}>()
// );

export const cartCreate: any = createAction(
  CART_CREATE
);

export const cartCreateSuccess: any = createAction(
  CART_CREATE_SUCCESS,
  props<{ _id: string, tempCartUserToken: string }>()
);

export const cartOnLogin: any = createAction(
  CART_ON_LOGIN
);

export const cartOnLoginSuccess: any = createAction(
  CART_ON_LOGIN_SUCCESS,
  props<{ _id: string, tempCartUserToken: string }>()
);

export const cartOnLoginFailure: any = createAction(
  CART_ON_LOGIN_FAILURE
);

export const cartOnLogout: any = createAction(
  CART_ON_LOGOUT
);

export const cartResetAndClear: any = createAction(
  CART_RESET
);

// voucher
export const applyVoucherRequest: any = createAction(
  CART_APPLY_VOUCHER_REQUEST,
  props<{ voucherCode: string }>()
);

export const applyVoucherSuccess: any = createAction(
  CART_APPLY_VOUCHER_SUCCESS,
  props<{ data: any }>()
);

export const applyVoucherFailure: any = createAction(
  CART_APPLY_VOUCHER_FAILURE,
  props<{ error: string }>()
);
