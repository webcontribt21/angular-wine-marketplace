import {createFeatureSelector, createSelector} from '@ngrx/store';
import {CartState} from './cart.reducer';

export const cartFeatureSelector = createFeatureSelector<CartState>('cartReducer');

export const isLoadingCartSelector = createSelector(
  cartFeatureSelector,
  ({ isLoading }: CartState, props) => isLoading
);

export const currentCartIdSelector = createSelector(
  cartFeatureSelector,
  ({ _id }: CartState, props) => _id
);

export const tempCartUserTokenSelector = createSelector(
  cartFeatureSelector,
  ({ tempCartUserToken }: CartState, props) => tempCartUserToken
);

export const cartSummarySelector = createSelector(
  cartFeatureSelector,
  ({ summary }: CartState, props) => summary
);

export const cartQuantitySelector = createSelector(
  cartFeatureSelector,
  ({ quantity }: CartState, props) => quantity
);

// voucher update
export const isLoadingApplyVoucherSelector = createSelector(
  cartFeatureSelector,
  ({ isLoadingApplyVoucher }: CartState) => isLoadingApplyVoucher
);

export const voucherErrorSelector = createSelector(
  cartFeatureSelector,
  ({ voucherError }: CartState) => voucherError
);

export const successUpdateVoucherDataSelector = createSelector(
  cartFeatureSelector,
  ({ successUpdateVoucherData }: CartState) => successUpdateVoucherData
);

export const cartErrorSelector = createSelector(
  cartFeatureSelector,
  ({ cartError }: CartState) => cartError
);
