import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, exhaustMap, map, switchMap, mergeMap, withLatestFrom} from 'rxjs/operators';
import {ErrorResponse} from 'apollo-link-error';
import {Router} from '@angular/router';
// import {ErrorResponse} from 'apollo-link-error';
import {AuthApiService} from '../../auth/services/auth.api.service';

// import * as errorActions from '../errors';
// import * as authActions from '../auth/auth.actions';
import * as checkoutActions from '../checkout/checkout.actions';
import * as cartActions from '../cart/cart.actions';
import * as userActions from '../user/user.actions';
import * as errorActions from '../errors';
import { CartApiService } from 'src/app/shared/services/api/cart.api.service';
import { currentCartIdSelector, cartSummarySelector } from '../cart/cart.selector';
import { Store, select } from '@ngrx/store';
import { RootState } from '../reducers/reducers';
import {
  checkoutFeatureSelector, deliveryAddressIdSelector, billingAddressIdSelector, orderIdSelector
} from '../checkout/checkout.selector';
import { OrderSummary, OtpCheckoutMode } from 'src/app/shared/interfaces/checkout/order-summary.interface';
import { userAddressesSelector } from '../user';
import { PaymentMethodNumber } from 'src/app/shared/enums/payment-method.enum';
import { CardDetails } from 'src/app/shared/interfaces/payment.interface';
import { UserCardFull } from 'src/app/user/common/interfaces';

@Injectable({
    providedIn: 'root',
})

export class CheckoutEffect {

    constructor(
        private action$: Actions,
        private store$: Store<RootState>,
        private authApiService: AuthApiService,
        private cartApiService: CartApiService,
        private router: Router,
    ) { }

    createUserAddressSuccess$: Observable<any> = createEffect(() =>
        this.action$
            .pipe(
                ofType(userActions.createUserAddressSuccess),
                switchMap(() => [
                    checkoutActions.endAddAddress()
                ])
            )
    );

    editUserAddressSuccess$: Observable<any> = createEffect(() =>
        this.action$
            .pipe(
                ofType(userActions.editUserAddressSuccess),
                switchMap(() => [
                    checkoutActions.endEditAddress()
                ])
            )
    );

    deleteUserAddressSuccess$: Observable<any> = createEffect(() =>
        this.action$
            .pipe(
                ofType(userActions.deleteUserAddressSuccess),
                withLatestFrom(
                  this.store$.pipe(select(userAddressesSelector)),
                  this.store$.pipe(select(billingAddressIdSelector)),
                  this.store$.pipe(select(deliveryAddressIdSelector))
                ),
                switchMap(([props, addresses, billingAddressId, deliveryAddressId]) => {
                  const response = [];
                  const billingAddress = addresses.find(f => f._id === billingAddressId);
                  if (!billingAddress) {
                    response.push(checkoutActions.setBillingAddress({ _id: null }));
                  }
                  const deliveryAddress = addresses.find(f => f._id === deliveryAddressId);
                  if (!deliveryAddress) {
                    response.push(checkoutActions.setDeliveryAddress({ _id: null }));
                  }
                  return response;
                })
            )
    );

  createOrder$: Observable<any> = createEffect(() =>
    this.action$.pipe(
      ofType(checkoutActions.createOrder),
      withLatestFrom(
        this.store$.pipe(select(currentCartIdSelector)),
        this.store$.pipe(select(cartSummarySelector)),
        this.store$.pipe(select(checkoutFeatureSelector))
      ),
      switchMap(([props, cartId, cartSummary, checkout]) => {
        return this.cartApiService.editCartToOrder( // convert cart to an order
            cartId,
            checkout.billingAddressId,
            checkout.deliveryAddressId,
            checkout.additionInformation,
            checkout.isGift,
            checkout.isGift ? '' : null,
            checkout.isGift ? '' : null,
            checkout.isGift ? checkout.giftMessage : null).pipe(
              switchMap(({ order_id }) => {
                return this.cartApiService.createPayment( // create pending payment
                  order_id,
                  checkout.paymentMethodNumber,
                  checkout.paymentStatusNumber,
                  checkout.paymentCurrencyNumber,
                  cartSummary.outstandingAmount
                ).pipe(
                  switchMap((paymentStatus) => {
                    // check the payment method and proceed accordingly
                    if (checkout.paymentMethodNumber === PaymentMethodNumber.CreditCard) {
                      // credit card payment
                      const cardDetails: CardDetails = props.cardDetails;
                      return this.cartApiService.pay( // attempt payment on payment provider
                            paymentStatus._id,
                            cardDetails.cardNumber,
                            cardDetails.cardHolder,
                            cardDetails.expiryMonth,
                            cardDetails.expiryYear,
                            cardDetails.cvv
                          ).pipe(
                        switchMap((payStatus) => {
                          // check paystatus whether requires OTP
                          if (payStatus.url && payStatus.MD && payStatus.PaReq) {
                            // OTP required
                            const otpCheckoutMode: OtpCheckoutMode = {
                              otpRequired: true,
                              url: payStatus.url,
                              MD: payStatus.MD,
                              PaReq: payStatus.PaReq,
                              TermUrl: payStatus.TermUrl,
                              connector: payStatus.connector
                            };
                            return [
                              // set OTP mode via action
                              checkoutActions.createOrderSuccess({ order_id }),
                              checkoutActions.setOtpCheckoutMode({otpCheckoutMode})
                            ];
                          } else {
                            // no OTP required, check whether payment was success
                            return [
                              checkoutActions.createOrderSuccess({ order_id }),
                              checkoutActions.createPaymentSuccess({ paymentStatus })
                              // checkoutActions.checkPaymentStatus()
                            ];
                          }
                        }),
                        catchError((responseError: ErrorResponse) => {
                          if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
                            return of([
                              errorActions.setRequestErrors({errors: [...responseError.graphQLErrors]}),
                              checkoutActions.createPaymentFailure()
                            ]);
                          }
                        })
                      );
                    } else {
                      // manual eft payment
                      return [
                        checkoutActions.createOrderSuccess({ order_id }),
                        checkoutActions.createPaymentSuccess({ paymentStatus }),
                      ];
                    }
                  }),
                  catchError((responseError: ErrorResponse) => {
                    if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
                      return of([
                        errorActions.setRequestErrors({errors: [...responseError.graphQLErrors]}),
                        checkoutActions.createPaymentFailure()
                      ]);
                    }
                  })
                );
              }),
              catchError((responseError: ErrorResponse) => {
                if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
                  return of([
                    errorActions.setRequestErrors({errors: [...responseError.graphQLErrors]}),
                    checkoutActions.createOrderFailure()
                  ]);
                }
              })
          );
      })
    )
 );

  createOrderSuccess$: Observable<any> = createEffect(() =>
    this.action$
        .pipe(
            ofType(checkoutActions.createOrderSuccess),
            switchMap(({ order_id }) => [
              checkoutActions.loadOrder({ _id: order_id })
            ])
        )
  );

  // checkPayment$

  paymentSuccess$: Observable<any> = createEffect(() =>
    this.action$
        .pipe(
            ofType(checkoutActions.createPaymentSuccess, checkoutActions.checkPaymentStatusSuccess),
            withLatestFrom(this.store$.pipe(select(checkoutFeatureSelector))),
            switchMap(([{ paymentStatus }, {paymentMethodNumber, orderId }]) => {
              if (paymentStatus) {
                // if (paymentMethodNumber === PaymentMethodNumber.CreditCard) {
                //   this.router.navigate(['checkout', 'confirmation']);
                //   return [
                //     checkoutActions.loadOrder({ _id: orderId }),
                //     cartActions.cartResetAndClear(),
                //     checkoutActions.clearNewCardDetails(),
                //   ];
                // } else {
                //   this.router.navigate(['checkout', 'confirmation']);
                //   return [
                //     checkoutActions.loadOrder({ _id: orderId }),
                //     cartActions.cartResetAndClear(),
                //     checkoutActions.clearNewCardDetails(),
                //   ];
                // }
                this.router.navigate(['checkout', 'confirmation']);
                return [
                  checkoutActions.loadOrder({ _id: orderId }),
                  cartActions.cartResetAndClear(),
                  checkoutActions.clearNewCardDetails(),
                ];
              } else {
                return;
              }
            })
        )
  );

  loadOrderSummary$: Observable<any> = createEffect(() =>
     this.action$.pipe(
       ofType(checkoutActions.loadOrder),
       withLatestFrom(this.store$.pipe(select(orderIdSelector))),
       switchMap(([{ _id }, orderId]) => {
         const id = _id || orderId;
         return this.cartApiService.orderSummary(id).pipe(
          mergeMap((result: OrderSummary) => {
            return [
             checkoutActions.loadOrderSuccess(result)
            ];
          }),
          catchError((responseError: ErrorResponse) => {
            if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
              return of([
               errorActions.setRequestErrors({errors: [...responseError.graphQLErrors]}),
               checkoutActions.loadOrderFailure()
              ]);
            }
          })
         );
       }),
     )
  );
}
