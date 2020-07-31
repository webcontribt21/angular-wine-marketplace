import {createAction, props} from '@ngrx/store';
import {
    CHECKOUT_SET_IS_GIFT,
    CHECKOUT_SET_PAYMENT_METHOD,
    CHECKOUT_SET_DELIVERY_ADDRESS,
    CHECKOUT_SET_BILLING_ADDRESS,
    CHECKOUT_SET_NEWCARD,
    CHECKOUT_CLEAR_NEWCARDDETAILS,
    CHECKOUT_SET_OTPCHECKOUTMODE,
    CHECKOUT_ADD_ADDRESS,
    CHECKOUT_ADD_ADDRESS_COMPLETE,
    CHECKOUT_EDIT_ADDRESS,
    CHECKOUT_EDIT_ADDRESS_COMPLETE,
    CHECKOUT_CREATE_ORDER,
    CHECKOUT_CREATE_ORDER_SUCCESS,
    CHECKOUT_CREATE_ORDER_FAILURE,
    CHECKOUT_LOAD_ORDER,
    CHECKOUT_LOAD_ORDER_SUCCESS,
    CHECKOUT_LOAD_ORDER_FAILURE,
    CHECKOUT_CREATE_PAYMENT,
    CHECKOUT_CREATE_PAYMENT_FAILURE,
    CHECKOUT_CREATE_PAYMENT_SUCCESS,
    CHECKOUT_CHECK_PAYMENT_STATUS,
    CHECKOUT_CHECK_PAYMENT_STATUS_FAILURE,
    CHECKOUT_CHECK_PAYMENT_STATUS_SUCCESS,
    CHECKOUT_CLEAR_ORDER,
    CHECKOUT_SET_NEWCARDDETAILS,
} from './checkout.types';
import { UserAddress, UserCardFull } from 'src/app/user/common/interfaces';
import { OrderSummary, OtpCheckoutMode } from 'src/app/shared/interfaces/checkout/order-summary.interface';
import { PaymentMethodNumber } from 'src/app/shared/enums/payment-method.enum';
import { PendingPaymentStatus, CardDetails } from 'src/app/shared/interfaces/payment.interface';

export const setIsGift: any = createAction(
    CHECKOUT_SET_IS_GIFT,
    props<{ isGift: boolean }>()
);

export const setPaymentMethod: any = createAction(
    CHECKOUT_SET_PAYMENT_METHOD,
    props<{ paymentMethod: PaymentMethodNumber }>()
);

export const setDeliveryAddress: any = createAction(
    CHECKOUT_SET_DELIVERY_ADDRESS,
    props<{ _id: string }>()
);

export const setBillingAddress: any = createAction(
    CHECKOUT_SET_BILLING_ADDRESS,
    props<{ _id: string }>()
);

export const setNewCard: any = createAction(
    CHECKOUT_SET_NEWCARD,
    props<{ newCard: boolean }>()
);

export const setNewCardDetails: any = createAction(
    CHECKOUT_SET_NEWCARDDETAILS,
    props<{ userCardFull: UserCardFull }>()
);

export const clearNewCardDetails: any = createAction(
    CHECKOUT_CLEAR_NEWCARDDETAILS,
    props()
);

export const setOtpCheckoutMode: any = createAction(
    CHECKOUT_SET_OTPCHECKOUTMODE,
    props<{ otpCheckoutMode: OtpCheckoutMode }>()
);

export const beginAddAddress: any = createAction(
    CHECKOUT_ADD_ADDRESS,
    props<{ address: UserAddress }>()
);

export const endAddAddress: any = createAction(
    CHECKOUT_ADD_ADDRESS_COMPLETE
);

export const beginEditAddress: any = createAction(
    CHECKOUT_EDIT_ADDRESS,
    props<{ address: UserAddress }>()
);

export const endEditAddress: any = createAction(
    CHECKOUT_EDIT_ADDRESS_COMPLETE
);

export const createOrder: any = createAction(
    CHECKOUT_CREATE_ORDER,
    props<{ cardDetails: CardDetails }>()
);

export const createOrderFailure: any = createAction(
    CHECKOUT_CREATE_ORDER_FAILURE
);

export const createOrderSuccess: any = createAction(
    CHECKOUT_CREATE_ORDER_SUCCESS,
    props<{ order_id: string }>()
);

export const createPayment: any = createAction(
    CHECKOUT_CREATE_PAYMENT
);

export const createPaymentFailure: any = createAction(
    CHECKOUT_CREATE_PAYMENT_FAILURE
);

export const createPaymentSuccess: any = createAction(
    CHECKOUT_CREATE_PAYMENT_SUCCESS,
    props<{ paymentStatus: PendingPaymentStatus }>()
);

export const checkPaymentStatus: any = createAction(
    CHECKOUT_CHECK_PAYMENT_STATUS
);

export const checkPaymentStatusFailure: any = createAction(
    CHECKOUT_CHECK_PAYMENT_STATUS_FAILURE
);

export const checkPaymentStatusSuccess: any = createAction(
    CHECKOUT_CHECK_PAYMENT_STATUS_SUCCESS,
    props<{ paymentStatus: PendingPaymentStatus }>()
);

export const loadOrder: any = createAction(
    CHECKOUT_LOAD_ORDER,
    props<{ _id: string }>()
);

export const loadOrderFailure: any = createAction(
    CHECKOUT_LOAD_ORDER_FAILURE
);

export const loadOrderSuccess: any = createAction(
    CHECKOUT_LOAD_ORDER_SUCCESS,
    props<{ summary: OrderSummary }>()
);

export const clearOrder: any = createAction(
  CHECKOUT_CLEAR_ORDER
);
