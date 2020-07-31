import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {map, switchMap, mergeMap, tap, catchError, withLatestFrom} from 'rxjs/operators';
import {ErrorResponse} from 'apollo-link-error';
import { Store, select, Action } from '@ngrx/store';

import { RootState } from '../reducers/reducers';
import {CartApiService} from '../../shared/services/api/cart.api.service';
import { CartItemApiService } from 'src/app/shared/services/api/cart-item.api.service';
import {CartSummary} from '../../shared/interfaces/cart/cart-summary.interface';
import {AddItemToCart} from '../../shared/interfaces/cart/add-item-to-cart.interface';

import * as cartActions from '../cart/cart.actions';
import * as errorActions from '../errors';
import { tempCartUserTokenSelector, currentCartIdSelector } from '../cart/cart.selector';
import { UpdateItemIntoCart } from 'src/app/shared/interfaces/cart/update-quantity-item-into-cart.interface';
import { JwModalService } from 'src/app/shared/services/jw-modal.service';

const LOAD_SUMMARY_ACTIONS = [cartActions.loadSummary,
        cartActions.cartOnLoginSuccess,
        cartActions.addItemToCartSuccess,
        cartActions.updateItemFromCartSuccess,
        cartActions.setQuantitySuccess,
        // cartActions.incrementQuantitySuccess,
        // cartActions.decrementQuantitySuccess,
        cartActions.removeItemFromCartSuccess
      ];

@Injectable()
export class CartEffect {

  constructor(
    private action$: Actions,
    private store$: Store<RootState>,
    private cartApiService: CartApiService,
    private cartItemApiService: CartItemApiService,
    private modalService: JwModalService) { }


  cartOnLogin$: Observable<any> = createEffect(() =>
     this.action$.pipe(
       ofType(cartActions.cartOnLogin),
       withLatestFrom(this.store$.pipe(select(tempCartUserTokenSelector))),
       switchMap(([props, tempCartUserToken]) => {
         return this.cartApiService.cartOnLogin(tempCartUserToken).pipe(
          mergeMap((response) => {
            return [
              cartActions.cartOnLoginSuccess(response)
            ];
          }),
          catchError((responseError: ErrorResponse) => {
            if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
              return of([
                errorActions.setRequestErrors({errors: [...responseError.graphQLErrors]}),
                cartActions.cartOnLoginFailure()
              ]);
            }
          })
         );
       }),
     )
  );

  cartCreate$: Observable<any> = createEffect(() =>
     this.action$.pipe(
       ofType(cartActions.cartCreate),
       withLatestFrom(this.store$.pipe(select(tempCartUserTokenSelector))),
       switchMap(([props, tempCartUserToken]) => {
         return this.cartApiService.createCart(tempCartUserToken).pipe(
          mergeMap((response) => {
            return [
              cartActions.cartCreateSuccess(response)
            ];
          }),
          catchError((responseError: ErrorResponse) => {
            if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
              return of(errorActions.setRequestErrors({errors: [...responseError.graphQLErrors]}));
            }
          })
         );
       })
     )
  );

  addItemToCart$: Observable<any> = createEffect(() =>
     this.action$.pipe(
       ofType(cartActions.addItemToCart),
       withLatestFrom(this.store$.pipe(select(tempCartUserTokenSelector)), this.store$.pipe(select(currentCartIdSelector))),
       switchMap(([{ itemDataToCart }, tempCartUserToken, cartId]) => {
        if (!cartId) {
          return this.cartApiService.createCart(tempCartUserToken).pipe(
            mergeMap((response) => {
              return this.cartItemApiService.createCartItem(
                response.tempCartUserToken,
                response._id,
                itemDataToCart.itemId,
                itemDataToCart.itemSupplierId,
                itemDataToCart.quantity
              ).pipe(
                mergeMap((response2) => {
                  if (response2['error']) {
                    this.modalService.open('add-to-cart-error-modal');

                    return [
                      cartActions.addItemToCartFailure({ message: response2['error'] })
                    ];
                  }

                  return [
                    cartActions.cartCreateSuccess({ tempCartUserToken: response.tempCartUserToken, _id: response._id }),
                    cartActions.addItemToCartSuccess({
                      quantity: itemDataToCart.quantity
                    }),
                  ];
                 }),
                 catchError((responseError: ErrorResponse) => {
                   if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
                     return of(errorActions.setRequestErrors({errors: [...responseError.graphQLErrors]}));
                   }
                 })
              );
            }),
            catchError((responseError: ErrorResponse) => {
              if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
                return of(errorActions.setRequestErrors({errors: [...responseError.graphQLErrors]}));
              }
            })
          );
        } else {
          return this.cartItemApiService.createCartItem(
            tempCartUserToken,
            cartId,
            itemDataToCart.itemId,
            itemDataToCart.itemSupplierId,
            itemDataToCart.quantity
          ).pipe(
            mergeMap((response2) => {
              if (response2['error']) {
                this.modalService.open('add-to-cart-error-modal');

                return [
                  cartActions.addItemToCartFailure({ message: response2['error'] })
                ];
              }

              return [
                cartActions.addItemToCartSuccess({ quantity: itemDataToCart.quantity }),
              ];
             }),
             catchError((responseError: ErrorResponse) => {
               if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
                 return of(errorActions.setRequestErrors({errors: [...responseError.graphQLErrors]}));
               }
             })
          );
        }
       }),
     )
  );

  setQuantity$: Observable<any> = createEffect(() =>
    this.action$
      .pipe(
        ofType(cartActions.setQuantity),
        withLatestFrom(this.store$.pipe(select(tempCartUserTokenSelector)), this.store$.pipe(select(currentCartIdSelector))),
        // switchMap(([{ itemDataToCart }, tempCartUserToken]) => of(itemDataToCart)),
        switchMap(([{ _id, quantity }, tempCartUserToken, cartId]) => {
          return this.cartItemApiService.editCartItemQuantity(
            tempCartUserToken,
            cartId,
            _id,
            quantity
          ).pipe(
            mergeMap((response2) => {
              return [
                cartActions.setQuantitySuccess({ ...response2 }),
              ];
             }),
             catchError((responseError: ErrorResponse) => {
               if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
                 return of(errorActions.setRequestErrors({errors: [...responseError.graphQLErrors]}));
               }
             })
          );
        }),
        map((itemDataToCart: UpdateItemIntoCart) => cartActions.setQuantitySuccess({ itemDataToCart }))
      )
  );

  // incrementQuantity$: Observable<any> = createEffect(() =>
  //   this.action$
  //     .pipe(
  //       ofType(cartActions.incrementQuantity),
  //       withLatestFrom(this.store$.pipe(select(tempCartUserTokenSelector))),
  //       switchMap(([{ itemDataToCart }, tempCartUserToken]) => of(itemDataToCart)),
  //       map((itemDataToCart: UpdateItemIntoCart) => cartActions.incrementQuantitySuccess({ itemDataToCart }))
  //     )
  // );

  // decrementQuantity$: Observable<any> = createEffect(() =>
  //   this.action$
  //     .pipe(
  //       ofType(cartActions.incrementQuantity),
  //       withLatestFrom(this.store$.pipe(select(tempCartUserTokenSelector))),
  //       switchMap(([{ itemDataToCart }, tempCartUserToken]) => of(itemDataToCart)),
  //       map((itemDataToCart: UpdateItemIntoCart) => cartActions.decrementQuantitySuccess({ itemDataToCart }))
  //     )
  // );

  removeItemFromCart$: Observable<any> = createEffect(() =>
     this.action$.pipe(
       ofType(cartActions.removeItemFromCart),
       withLatestFrom(this.store$.pipe(select(tempCartUserTokenSelector)), this.store$.pipe(select(currentCartIdSelector))),
       switchMap(([props, tempCartUserToken, cartId]) => {
        return this.cartItemApiService.removeCartItem(
          tempCartUserToken,
          cartId,
          props._id
        ).pipe(
          map(() => cartActions.removeItemFromCartSuccess(props)),
          catchError((responseError: ErrorResponse) => {
            if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
              return of(errorActions.setRequestErrors({errors: [...responseError.graphQLErrors]}));
            }
          })
        );
       }),
     )
  );

  // removeAllItemsFromCart$: Observable<any> = createEffect(() =>
  //   this.action$
  //     .pipe(
  //       ofType(cartActions.updateItemFromCart),
  //       switchMap(() => of()),
  //       map(() => cartActions.removeAllItemsFromCartSuccess())
  //     )
  // );

  loadSummary$: Observable<any> = createEffect(() =>
     this.action$.pipe(
       ofType(...LOAD_SUMMARY_ACTIONS),
       withLatestFrom(this.store$.pipe(select(currentCartIdSelector)), this.store$.pipe(select(tempCartUserTokenSelector))),
       switchMap(([props, id, tempCartUserToken]) => {
         if (id) {
          return this.cartApiService.summary(id, tempCartUserToken).pipe(
            mergeMap((result: CartSummary) => {
              return [
                cartActions.loadSummarySuccess({ summary: result })
              ];
            }),
            catchError((responseError: ErrorResponse) => {
              if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
                return of([
                 errorActions.setRequestErrors({errors: [...responseError.graphQLErrors]}),
                 cartActions.loadSummaryFailure()
                ]);
              }
            })
           );
         } else {
          return [
            cartActions.loadSummarySuccess({ summary: null })
          ];
         }
       }),
     )
  );

  editCartWithVoucher$: Observable<any> = createEffect(() =>
    this.action$.pipe(
      ofType(cartActions.applyVoucherRequest),
      withLatestFrom(this.store$.pipe(select(currentCartIdSelector))),
      mergeMap(([{ voucherCode }, cartId]) => {
        return this.cartApiService.editCartWithVoucher(cartId, voucherCode)
          .pipe(
            map((res) => {
              if (res.errors && res.errors[0]) {
                return cartActions.applyVoucherFailure({ error: res.errors[0]['error']['message'] || 'Invalid Voucher' });
              }

              return cartActions.applyVoucherSuccess({ data: res['data'] ? res['data']['editCart'] : {} });
            }),
            catchError(() => {
              return cartActions.applyVoucherFailure({ error: 'API Error' });
            })
          );
      })
    )
  );
}
