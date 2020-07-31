import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { select, Store, ActionsSubject } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { catchError, map, tap, takeUntil } from 'rxjs/operators';
import { RootState } from '../../../../@store/reducers/reducers';
import { CartSummary } from 'src/app/shared/interfaces/cart/cart-summary.interface';
import { OtpCheckoutMode, OrderSummary } from 'src/app/shared/interfaces/checkout/order-summary.interface';
import { UserAddress, UserCard, UserCardFull } from 'src/app/user/common/interfaces';


import {
  cartSummarySelector,
  isLoadingApplyVoucherSelector,
  voucherErrorSelector,
  successUpdateVoucherDataSelector,
  isLoadingCartSelector,
  currentCartIdSelector
} from '../../../../@store/cart/cart.selector';
import {
  deliveryAddressSelector,
  paymentMethodNumberSelector,
  paymentMethodDescrSelector,
  newCardSelector,
  otpCheckoutModeSelector,
  paymentStatusNumberSelector,
  orderSummarySelector,
  orderIdSelector,
  newCardDetailsSelector,
  orderIsProcessingSelector
} from 'src/app/@store/checkout/checkout.selector';
import * as checkoutActions from 'src/app/@store/checkout/checkout.actions';
import * as cartActions from '../../../../@store/cart/cart.actions';
import * as userActions from '../../../../@store/user/user.actions';
import { PaymentMethodNumber } from 'src/app/shared/enums/payment-method.enum';
import { CardDetails, PendingPaymentStatus, PaymentStatus } from 'src/app/shared/interfaces/payment.interface';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { PaymentStatusNumber } from 'src/app/shared/enums/payment-status.enum';
import { ofType } from '@ngrx/effects';
import { userCardsSelector } from 'src/app/@store/user';

interface Quantity {
  name: string;
  code: string;
}

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit {
  destroyed$ = new Subject<boolean>();
  cartSummary$: Observable<CartSummary> = this.store$.pipe(select(cartSummarySelector));
  isLoadingCartSummary$: Observable<boolean> = this.store$.pipe(select(isLoadingCartSelector));
  checkoutDeliveryAddress$: Observable<UserAddress> = this.store$.pipe(select(deliveryAddressSelector));
  paymentMethodNumber$: Observable<PaymentMethodNumber> = this.store$.pipe(select(paymentMethodNumberSelector));
  newCard$: Observable<boolean> = this.store$.pipe(select(newCardSelector));
  paymentMethodDescr$: Observable<string> = this.store$.pipe(select(paymentMethodDescrSelector));
  isLoadingApplyVoucher$: Observable<boolean> = this.store$.pipe(select(isLoadingApplyVoucherSelector));
  voucherError$: Observable<string> = this.store$.pipe(select(voucherErrorSelector));
  voucherSuccessData$: Observable<any> = this.store$.pipe(select(successUpdateVoucherDataSelector));
  orderId$: Observable<any> = this.store$.pipe(select(orderIdSelector));
  orderSummary$: Observable<OrderSummary> = this.store$.pipe(select(orderSummarySelector));
  userCards$: Observable<UserCard[]> = this.store$.pipe(select(userCardsSelector));
  newCardFull$: Observable<UserCardFull> = this.store$.pipe(select(newCardDetailsSelector));
  orderIsProcessingSelector$: Observable<boolean> = this.store$.pipe(select(orderIsProcessingSelector));

  otpCheckoutMode$: Observable<OtpCheckoutMode> = this.store$.pipe(select(otpCheckoutModeSelector));
  otpCheckoutMode: OtpCheckoutMode;
  otpInitialLoad = true;
  otpOrderComplete = false;

  paymentStatusNumber$: Observable<PaymentStatusNumber> = this.store$.pipe(select(paymentStatusNumberSelector));

  orderSummary: OrderSummary;
  orderId: string;
  orderIsProcessing: boolean = false;

  newCardFull: UserCardFull;

  constructor(
    private store$: Store<RootState>,
    private http: HttpClient,
    private actions$: ActionsSubject
  ) { }

  private paymentMethod: PaymentMethodNumber;

  ngOnInit() {

    this.store$.dispatch(checkoutActions.clearOrder());
    this.store$.dispatch(checkoutActions.clearNewCardDetails());

    this.orderIsProcessingSelector$.subscribe(r => {
      this.orderIsProcessing = r;
    });

    this.paymentMethodNumber$.subscribe(r => {
      if (r) {
        this.paymentMethod = r;
      }
    });

    this.voucherSuccessData$.subscribe(data => {
      if (data) {
        this.store$.dispatch(cartActions.loadSummary());
      }
    });

    this.otpCheckoutMode$.subscribe(data => {
      if (data) {
        this.otpCheckoutMode = data;
        if ( data.otpRequired ) {
          this.submitOtpForm();
        }
      }
    });

    this.orderSummary$.subscribe(r => {
      if (r) {
        this.orderSummary = r;
        if (this.orderSummary.orderPayment[0].paymentStatusNumber !== 1 && !this.otpOrderComplete) {
          this.otpOrderComplete = true;
          this.store$.dispatch(checkoutActions.createPaymentSuccess({ paymentStatus: this.orderSummary.orderPayment[0].paymentStatus }));
        }
      }
    });

    this.newCardFull$.subscribe(r => {
      if (r) {
        this.newCardFull = r;
      }
    });

    this.store$.dispatch(checkoutActions.setOtpCheckoutMode({ otpCheckoutMode: { otpRequired: false } }));

    // force add if no cards
    this.actions$.pipe(
      ofType(userActions.loadUserCardsDataSuccess),
      takeUntil(this.destroyed$),
    ).subscribe(({userCards}) => {
      if (!(userCards && userCards.length > 0)) {
        this.onNewCard(true);
      }
    });
    this.store$.dispatch(userActions.loadUserCardsData());

  }

  submitOtpForm() {
    if (this.otpInitialLoad) {
      this.otpInitialLoad = false;
      setTimeout(() => {
        // tslint:disable-next-line:no-string-literal
        document.forms['otpForm'].submit();
      }, 500);
    }
  }

  continueCaption() {
    return 'Pay with Instant EFT';
  }

  onCheckoutClick() {
    // Peach Payment Test Cards.
    // VISA. Number: 4012888888881881 (3D secure)
    //  or 4111111111111111 (3D secure)
    // VISAELECTRON. Number: 4012888888881881
    // MASTER. Number: 5105105105105100
    // DISCOVER. Number: 6011587918359498
    // AMEX. Number: 311111111111117
    // MAESTRO UK. Number: 6799851000000032
    // SOLO. Number: 6334580500000000
    if (this.paymentMethod === PaymentMethodNumber.CreditCard) {
      const cardDetails: CardDetails = {
        cardHolder: this.newCardFull.cardName, // 'Joe Black',
        cardNumber: this.newCardFull.cardNumber, // '4012888888881881',
        expiryMonth: this.newCardFull.expiryDateMonth, // '11',
        expiryYear: this.newCardFull.expiryDateYear, // '2020',
        cvv: this.newCardFull.cvv, // '123'
        // remember: this.newCardFull.remember
      };
      console.log('cardDetails', cardDetails);
      this.store$.dispatch(checkoutActions.createOrder({ cardDetails }));
    } else {
      this.store$.dispatch(checkoutActions.createOrder());
    }
  }

  onPaymentMethodChanged(paymentMethod: PaymentMethodNumber) {
    this.paymentMethod = paymentMethod;
    this.store$.dispatch(checkoutActions.setPaymentMethod({ paymentMethod }));
  }

  onNewCard(newCard) {
    this.store$.dispatch(checkoutActions.setNewCard({ newCard }));
  }

  onApplyVoucher(voucherCode: string) {
    this.store$.dispatch(cartActions.applyVoucherRequest({ voucherCode }));
  }

  onOtpIframeLoadEvent() {
    this.store$.dispatch(checkoutActions.loadOrder(this.orderId));
  }

}
