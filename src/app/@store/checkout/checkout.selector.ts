import {createFeatureSelector, createSelector} from '@ngrx/store';
import {CheckoutState} from './checkout.reducer';
import { userAddressesSelector } from '../user';
import { countriesSelector } from '../country/country.selector';
import { Country } from 'src/app/shared/interfaces/country.interface';
import { getPaymentMethodDescr } from 'src/app/shared/helpers/payment-method-helpers';
import { PaymentMethodNumber } from 'src/app/shared/enums/payment-method.enum';
import { PaymentStatus, PendingPaymentStatus } from 'src/app/shared/interfaces/payment.interface';

export const checkoutFeatureSelector = createFeatureSelector<CheckoutState>('checkoutReducer');

export const isGiftSelector = createSelector(
   checkoutFeatureSelector,
   ({ isGift }: CheckoutState, props) => isGift
);

export const deliveryCountriesSelector = createSelector(
    countriesSelector,
    (countries): Country[] => {
        return (countries || []).filter(f => f.name === 'South Africa') || [];
    }
);

export const deliveryAddressIdSelector = createSelector(
   checkoutFeatureSelector,
   ({ deliveryAddressId }: CheckoutState) => deliveryAddressId
);

export const billingAddressIdSelector = createSelector(
    checkoutFeatureSelector,
    ({ billingAddressId }: CheckoutState) => billingAddressId
);

export const checkoutHasAddressesSelected = createSelector(
    deliveryAddressIdSelector,
    billingAddressIdSelector,
    (deliveryAddressId, billingAddressId) => deliveryAddressId != null && billingAddressId != null
);

export const deliveryAddressSelector = createSelector(
    userAddressesSelector,
    deliveryAddressIdSelector,
    (addresses, deliveryAddressId) => {
        if (addresses && deliveryAddressId) {
            return (addresses || []).find(f => f._id === deliveryAddressId);
        }
        return null;
    }
);

export const billingAddressSelector = createSelector(
    userAddressesSelector,
    billingAddressIdSelector,
    (addresses, billingAddressId) => {
        if (addresses && billingAddressId) {
            return (addresses || []).find(f => f._id === billingAddressId);
        }
        return null;
    }
);

export const uiAddressInAddModeSelector = createSelector(
    checkoutFeatureSelector,
    ({ ui: { addressInAddMode } }: CheckoutState, props) => addressInAddMode
);

export const uiAddressInEditModeSelector = createSelector(
    checkoutFeatureSelector,
    ({ ui: { addressInEditMode } }: CheckoutState, props) => addressInEditMode
);

export const addressAddEditSelector = createSelector(
    checkoutFeatureSelector,
    ({ addressAddEdit }: CheckoutState, props) => addressAddEdit
);

export const paymentMethodNumberSelector = createSelector(
    checkoutFeatureSelector,
    ({ paymentMethodNumber }: CheckoutState) => paymentMethodNumber
);

export const paymentMethodDescrSelector = createSelector(
    checkoutFeatureSelector,
    ({ paymentMethodNumber }: CheckoutState) => getPaymentMethodDescr(paymentMethodNumber)
);

export const newCardSelector = createSelector(
    checkoutFeatureSelector,
    ({ paymentMethodNumber, newCard }: CheckoutState) => (paymentMethodNumber === PaymentMethodNumber.CreditCard && newCard)
);

export const newCardDetailsSelector = createSelector(
    checkoutFeatureSelector,
    ({ userCardFull }: CheckoutState) => (userCardFull)
);

export const otpCheckoutModeSelector = createSelector(
    checkoutFeatureSelector,
    ({ otpCheckoutMode }: CheckoutState) => (otpCheckoutMode)
);

export const paymentStatusNumberSelector = createSelector(
    checkoutFeatureSelector,
    ({ paymentStatusNumber }: CheckoutState, props) => paymentStatusNumber
);

export const orderSummarySelector = createSelector(
    checkoutFeatureSelector,
    ({ orderSummary }: CheckoutState, props) => orderSummary
);

export const orderIdSelector = createSelector(
    checkoutFeatureSelector,
    ({ orderId }: CheckoutState, props) => orderId
);

export const orderIsProcessingSelector = createSelector(
    checkoutFeatureSelector,
    ({ isProcessingOrder }: CheckoutState, props) => isProcessingOrder
);
