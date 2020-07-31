import {Action, createReducer, on} from '@ngrx/store';
import * as checkoutActions from './checkout.actions';
import { UserAddress, UserCardFull } from 'src/app/user/common/interfaces';
import { OrderSummary, OtpCheckoutMode } from 'src/app/shared/interfaces/checkout/order-summary.interface';
import { PaymentGatewayMethodNumber } from 'src/app/shared/enums/payment-gateway-method.enum';
import { PaymentMethodNumber } from 'src/app/shared/enums/payment-method.enum';
import { PaymentStatusNumber } from 'src/app/shared/enums/payment-status.enum';
import { PaymentCurrencyNumber } from 'src/app/shared/enums/payment-currency.enum';
import { PaymentGatewayNumber } from 'src/app/shared/enums/payment-gateway.enum';
import { PendingPaymentStatus } from 'src/app/shared/interfaces/payment.interface';

export interface CheckoutState {
  ui: {
    giftMessageInEditMode: boolean;
    addressInAddMode: boolean;
    addressInEditMode: boolean;
  };
  deliveryAddressId: string;
  billingAddressId: string;
  additionInformation: string;
  isGift: boolean;
  giftMessage: string;
  addressAddEdit: UserAddress;
  orderId: string;
  paymentId: string;
  paymentMethodNumber: PaymentMethodNumber;
  paymentStatusNumber: PaymentStatusNumber;
  paymentCurrencyNumber: PaymentCurrencyNumber;
  newCard: boolean;
  otpCheckoutMode: OtpCheckoutMode;
  paymentStatus: PendingPaymentStatus;
  orderSummary: OrderSummary;
  userCardFull: UserCardFull;
  isProcessingOrder: boolean;
}

const initialState: CheckoutState = {
  ui: {
    giftMessageInEditMode: false,
    addressInAddMode: false,
    addressInEditMode: false,
  },
  deliveryAddressId: null,
  billingAddressId: null,
  additionInformation: null,
  isGift: false,
  giftMessage: null,
  addressAddEdit: null,
  orderId: null,
  paymentId: null,
  paymentMethodNumber: PaymentMethodNumber.CreditCard,
  paymentStatusNumber: PaymentStatusNumber.Open,
  paymentCurrencyNumber: PaymentCurrencyNumber.ZAR,
  newCard: false,
  otpCheckoutMode: {
    otpRequired: false,
    url: '',
    MD: '',
    PaReq: '',
    TermUrl: '',
    connector: ''
  },
  paymentStatus: null,
  orderSummary: null,
  userCardFull: null,
  isProcessingOrder: false
};

const checkoutReducer = createReducer(
  initialState,
   on(checkoutActions.setIsGift, (state, { isGift }) => {
     return {
       ...state,
       isGift
     };
   }),
   on(checkoutActions.setPaymentMethod, (state, { paymentMethod }) => {
    return {
      ...state,
      paymentMethodNumber: paymentMethod,
      newCard: false
    };
  }),
  on(checkoutActions.setDeliveryAddress, (state, { _id }) => {
    return {
       ...state,
       deliveryAddressId: _id
     };
   }),
   on(checkoutActions.setBillingAddress, (state, { _id }) => {
    return {
      ...state,
      billingAddressId: _id
    };
  }),
  on(checkoutActions.setNewCard, (state, { newCard }) => {
    return {
      ...state,
      newCard
    };
  }),
  on(checkoutActions.setNewCardDetails, (state, { userCardFull }) => {
    return {
      ...state,
      userCardFull: { ...userCardFull }
    };
  }),
  on(checkoutActions.clearNewCardDetails, (state) => {
    return {
      ...state,
      userCardFull: null
    };
  }),
  on(checkoutActions.setOtpCheckoutMode, (state, { otpCheckoutMode }) => {
    return {
      ...state,
      otpCheckoutMode: { ...otpCheckoutMode }
    };
  }),
  on(checkoutActions.beginAddAddress, (state, { address }) => {
    return {
      ...state,
      ui: {
        ...state.ui,
        addressInEditMode: false,
        addressInAddMode: true
      },
      addressAddEdit: {...address}
    };
  }),
  on(checkoutActions.endAddAddress, (state) => {
    return {
      ...state,
      ui: {
        ...state.ui,
        addressInAddMode: false
      },
      addressAddEdit: null
    };
  }),
  on(checkoutActions.beginEditAddress, (state, { address }) => {
    return {
      ...state,
      ui: {
        ...state.ui,
        addressInAddMode: false,
        addressInEditMode: true
      },
      addressAddEdit: {...address}
    };
  }),
  on(checkoutActions.endEditAddress, (state) => {
    return {
      ...state,
      ui: {
        ...state.ui,
        addressInEditMode: false
      },
      addressAddEdit: null
    };
  }),
  on(checkoutActions.createOrder, (state: CheckoutState) => {
    return {
      ...state,
      isProcessingOrder: true
    };
  }),
  on(checkoutActions.createOrderSuccess, (state: CheckoutState, { order_id }) => {
    return {
      ...state,
      orderId: order_id,
      isProcessingOrder: false
    };
  }),
  on(checkoutActions.createPayment, (state: CheckoutState) => {
    return {
      ...state,
      isProcessingOrder: true
    };
  }),
  on(checkoutActions.createPaymentSuccess, (state: CheckoutState, { paymentStatus }) => {
    return {
      ...state,
      isProcessingOrder: false,
      paymentId: paymentStatus._id,
      paymentStatus
    };
  }),
  on(checkoutActions.checkPaymentStatusSuccess, (state: CheckoutState, { paymentStatus }) => {
    return {
      ...state,
      paymentStatus
    };
  }),
  on(checkoutActions.loadOrder, (state: CheckoutState) => {
    return {
      ...state,
      orderSummary: null
      // isLoading: true
    };
  }),
  on(checkoutActions.loadOrderSuccess, (state: CheckoutState, summary) => {
    return {
      ...state,
      orderSummary: summary
    };
  }),
  on(checkoutActions.loadOrderFailure, (state: CheckoutState) => {
    return {
      ...state,
      // isLoading: false
    };
  }),
  on(checkoutActions.clearOrder, (state: CheckoutState) => {
    return {
      ...state,
      orderId: null,
      orderSummary: null,
      otpCheckoutMode: initialState.otpCheckoutMode
    };
  }),
);

export function reducer(state: CheckoutState | undefined, action: Action) {
  return checkoutReducer(state, action);
}
