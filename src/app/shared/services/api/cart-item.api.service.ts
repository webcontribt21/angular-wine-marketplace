import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { createCartItemQuery, editCartItemQuantityQuery, deleteCartItemQuery } from 'src/app/graphql/mutations/cart-item.mutations';

@Injectable({
  providedIn: 'root'
})
export class CartItemApiService {

  constructor(private apollo: Apollo) {}

  createCartItem(
      tempCartUserToken: string,
      cartId: string,
      itemId: string,
      itemSupplierId: string,
      quantity: number
    ): Observable<any> {
    return this.apollo
      .query({
        query: createCartItemQuery,
        variables: {
          tempCartUserToken,
          cartId,
          itemId,
          itemSupplierId,
          quantity
        }
      })
      .pipe(
        map(result => {
          if (result.errors) {
            return {
              error: result.errors[0]['error']['message'] || 'Server Error'
            };
          }
          // tslint:disable-next-line:no-string-literal
          return result.data && result.data['createCartItem'];
        })
      );
  }

  editCartItemQuantity(
    tempCartUserToken: string,
    cartId: string,
    cartItemId: string,
    quantity: number
  ): Observable<{_id: string, quantity: number}> {
  return this.apollo
    .query({
      query: editCartItemQuantityQuery,
      variables: {
        tempCartUserToken,
        cartId,
        cartItemId,
        quantity
      }
    })
    .pipe(
      map(result => {
        // tslint:disable-next-line:no-string-literal
        return result.data && result.data['editCartItem'];
      })
    );
  }

  removeCartItem(
      tempCartUserToken: string,
      cartId: string,
      cartItemId: string
    ): Observable<any> {
    return this.apollo
      .query({
        query: deleteCartItemQuery,
        variables: {
          tempCartUserToken,
          cartId,
          cartItemId
        }
      })
      .pipe(
        map(result => {
          // tslint:disable-next-line:no-string-literal
          return result.data && result.data['editCartItem'];
        })
      );
  }

  removeAllCartItems(
      tempCartUserToken: string,
      cartId: string
    ): Observable<any> {
    return this.apollo
      .query({
        query: deleteCartItemQuery,
        variables: {
          cartId
        }
      })
      .pipe(
        map(result => {
          // tslint:disable-next-line:no-string-literal
          return result.data && result.data['editCartItem'];
        })
      );
  }
}

