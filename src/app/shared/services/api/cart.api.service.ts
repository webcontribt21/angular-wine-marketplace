import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {cartSummaryQuery} from '../../../graphql/queries';
import {CartSummary } from '../../interfaces/cart/cart-summary.interface';
import {
  createCartQuery,
  editCartToOrderQuery,
  createPaymentQuery,
  applyVoucherQuery,
  removeVoucherQuery,
  payQuery
} from 'src/app/graphql/mutations/cart.mutations';
import { cartsQuery, cartOnLoginQuery, orderSummaryQuery, paymentStatusQuery } from 'src/app/graphql/queries/cart.queries';
import { OrderSummary } from '../../interfaces/checkout/order-summary.interface';
import { PendingPaymentStatus, PayStatus } from '../../interfaces/payment.interface';
import { PaymentGatewayMethodNumber } from '../../enums/payment-gateway-method.enum';
import { PaymentStatusNumber } from '../../enums/payment-status.enum';
import { PaymentCurrencyNumber } from '../../enums/payment-currency.enum';
import { PaymentGateway } from '../../interfaces/payment.interface';
import { PaymentGatewayNumber } from '../../enums/payment-gateway.enum';
import { PaymentMethodNumber } from '../../enums/payment-method.enum';
import { getPaymentGatewayNumber, getPaymentGatewayMethodNumber } from '../../helpers/payment-method-helpers';

@Injectable({
  providedIn: 'root'
})
export class CartApiService {

  constructor(private apollo: Apollo) {}

  summary(id: string, tempCartUserToken: string): Observable<CartSummary> {
    return this.apollo
      .query({
        query: cartSummaryQuery,
        variables: {
            id,
            tempCartUserToken
        }
      })
      .pipe(
        map(result => {
          // tslint:disable-next-line:no-string-literal
          return result.data && result.data['CartSummary'];
        })
      );
  }

  orderSummary(id: string): Observable<OrderSummary> {
    return this.apollo
      .query({
        query: orderSummaryQuery,
        variables: {
            id
        }
      })
      .pipe(
        map(result => {
          // tslint:disable-next-line:no-string-literal
          return result.data && result.data['OrderSummary'];
        })
      );
  }

  createCart(tempCartUserToken: string): Observable<{ _id: string, tempCartUserToken: string }> {
    return this.apollo
      .query({
        query: createCartQuery,
        variables: {
          tempCartUserToken
        }
      })
      .pipe(
        map(result => {
          // tslint:disable-next-line:no-string-literal
          return result.data && result.data['createCart'];
        })
      );
  }

  carts(tempCartUserToken: string): Observable<CartSummary> {
    return this.apollo
      .query({
        query: cartsQuery,
        variables: {
          tempCartUserToken
        }
      })
      .pipe(
        map(result => {
          // tslint:disable-next-line:no-string-literal
          return result.data && result.data['Carts'];
        })
      );
  }

  cartOnLogin(tempCartUserToken: string): Observable<{ _id: string, tempCartUserToken: string }> {
    return this.apollo
      .query({
        query: cartOnLoginQuery,
        variables: {
          tempCartUserToken
        }
      })
      .pipe(
        map(result => {
          // tslint:disable-next-line:no-string-literal
          return result.data && result.data['CartOnLogin'];
        })
      );
  }

  editCartToOrder(
    cartId: string,
    billingAddressId: string,
    shippingAddressId: string,
    additionalInformation: string,
    isGift: boolean,
    giftSender: string,
    giftRecipient: string,
    giftMessage: string
    ): Observable<{ order_id: string }> {
    return this.apollo
      .query({
        query: editCartToOrderQuery,
        variables: {
          cartId,
          billingAddressId,
          shippingAddressId,
          additionalInformation,
          isGift,
          giftSender,
          giftRecipient,
          giftMessage
        }
      })
      .pipe(
        map(result => {
          // tslint:disable-next-line:no-string-literal
          return result.data && result.data['editCartToOrder'];
        })
      );
  }

  createPayment(
    orderId: string,
    paymentMethodNumber: PaymentMethodNumber,
    paymentStatusNumber: PaymentStatusNumber,
    paymentCurrencyNumber: PaymentCurrencyNumber,
    amount_gross: PaymentCurrencyNumber
    ): Observable<PendingPaymentStatus> {

     const paymentGatewayNumber = getPaymentGatewayNumber(paymentMethodNumber);
     const paymentGatewayMethodNumber = getPaymentGatewayMethodNumber(paymentMethodNumber);

     return this.apollo
      .query({
        query: createPaymentQuery,
        variables: {
          orderId,
          paymentGatewayMethodNumber,
          paymentGatewayNumber,
          paymentStatusNumber,
          paymentCurrencyNumber,
          amount_gross
        }
      })
      .pipe(
        map(result => {
          // tslint:disable-next-line:no-string-literal
          return result.data && result.data['createPayment'];
        })
      );
  }

  pay(
    id: string,
    cardNumber: string,
    cardHolder: string,
    expiryMonth: string,
    expiryYear: string,
    cvv: string
    ): Observable<PayStatus> {

     return this.apollo
      .query({
        query: payQuery,
        variables: {
          id,
          cardNumber,
          cardHolder,
          expiryMonth,
          expiryYear,
          cvv
        }
      })
      .pipe(
        map(result => {
          // tslint:disable-next-line:no-string-literal
          return result.data && result.data['Pay'];
        })
      );
  }

  paymentStatus(paymentId: string): Observable<PendingPaymentStatus> {
    return this.apollo
      .query({
        query: paymentStatusQuery,
        variables: {
          paymentId
        }
      })
      .pipe(
        map(result => {
          // tslint:disable-next-line:no-string-literal
          return result.data && result.data['Payment'];
        })
      );
  }

  editCartWithVoucher(cartId: string, voucherCode: string) {
    if (!voucherCode) {
      return this.apollo
        .query({
          query: removeVoucherQuery,
          variables: {
            cartId
          }
        }).pipe (
          map(result => {
            return result;
          })
        );
    }

    return this.apollo
      .query({
        query: applyVoucherQuery,
        variables: {
          cartId,
          voucherCode
        }
      }).pipe (
        map(result => {
          return result;
        })
      );
  }

}



