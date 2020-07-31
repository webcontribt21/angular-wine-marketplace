import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap, withLatestFrom, tap} from 'rxjs/operators';
import {UserApiService} from '../../user/services';
import {UserDetailDto} from '../../user/common/dto';
import {Router} from '@angular/router';
import {ErrorResponse} from 'apollo-link-error';

import * as userActions from '../user/user.actions';
import * as checkoutActions from '../checkout/checkout.actions';
import * as errorActions from '../errors';
import { UserAddress } from 'src/app/user/common/interfaces';
import { Store, select } from '@ngrx/store';
import { RootState } from '../reducers/reducers';
import { billingAddressIdSelector, deliveryAddressIdSelector } from '../checkout/checkout.selector';


@Injectable({
  providedIn: 'root',
})

export class UserEffect {

  constructor(
    private action$: Actions,
    private store$: Store<RootState>,
    private userApiService: UserApiService,
    private router: Router,
  ) { }

  loadUserDetail$: Observable<any> = createEffect(() =>
    this.action$.pipe(
      ofType(userActions.loadUserData),
      switchMap((userDetail: UserDetailDto) => {

        return this.userApiService
          .getUserDetail(userDetail)
          .pipe(
            map( result => {
              return userActions.loadUserDataSuccess({ userDetail: result });
            }),
            catchError((responseError: ErrorResponse) => {
              if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
                return of(errorActions.setRequestErrors({ errors: [...responseError.graphQLErrors] }));
              }
            })
          );
      }),
    )
  );

  loaduserCards$: Observable<any> = createEffect(() =>
    this.action$.pipe(
      ofType(userActions.loadUserCardsData),
      switchMap(() => {

        return this.userApiService
          .getUserCards()
          .pipe(
            map( result => {
              return userActions.loadUserCardsDataSuccess({ userCards: result });
            }),
            catchError((responseError: ErrorResponse) => {
              if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
                return of(errorActions.setRequestErrors({ errors: [...responseError.graphQLErrors] }));
              }
            })
          );
      }),
    )
  );


  loadUserAddresses$: Observable<any> = createEffect(() =>
    this.action$.pipe(
      ofType(userActions.loadUserAddressesData),
      switchMap(() => {

        return this.userApiService
          .getUserAddresses()
          .pipe(
            map( result => {
              return userActions.loadUserAddressesDataSuccess({ userAddresses: result });
            }),
            catchError((responseError: ErrorResponse) => {
              if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
                return of(errorActions.setRequestErrors({ errors: [...responseError.graphQLErrors] }));
              }
            })
          );
      }),
    )
  );

  deleteUserAddress$: Observable<any> = createEffect(() =>
    this.action$
      .pipe(
        ofType(userActions.deleteUserAddress),
        switchMap(({ _id }) => {
          return this.userApiService
            .deleteUserAddress(_id)
            .pipe(
              map((result) => {
                return userActions.deleteUserAddressSuccess({ _id });
              }),
              catchError((responseError: ErrorResponse) => {
                if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
                  return of(errorActions.setRequestErrors({ errors: [...responseError.graphQLErrors] }));
                }
              })
            );
        })
      )
  );

  createUserAddress$: Observable<any> = createEffect(() =>
    this.action$
      .pipe(
        ofType(userActions.createUserAddress),
        switchMap(({ address }) => {
          return this.userApiService
            .createUserAddress(address)
            .pipe(
              map((result) => {
                return userActions.createUserAddressSuccess({ address: result });
              }),
              catchError((responseError: ErrorResponse) => {
                if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
                  return of(errorActions.setRequestErrors({ errors: [...responseError.graphQLErrors] }));
                }
              })
            );
        })
      )
  );

  editUserAddress$: Observable<any> = createEffect(() =>
    this.action$
      .pipe(
        ofType(userActions.editUserAddress),
        switchMap(({ address }) => {
          return this.userApiService
            .editUserAddress(address)
            .pipe(
              map((result) => {
                return userActions.editUserAddressSuccess({ address: result });
              }),
              catchError((responseError: ErrorResponse) => {
                if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
                  return of(errorActions.setRequestErrors({ errors: [...responseError.graphQLErrors] }));
                }
              })
            );
        })
      )
  );

  editUserAddressSetDeliveryDefault$: Observable<any> = createEffect(() =>
    this.action$
      .pipe(
        ofType(userActions.editUserAddressSetDeliveryDefault),
        switchMap(({ _id, _fromId }) => {
          return this.userApiService
            .editUserAddressDeliveryDefault(_id, _fromId)
            .pipe(
              map((result) => {
                return userActions.editUserAddressSetDeliveryDefaultSuccess({ _id });
              }),
              catchError((responseError: ErrorResponse) => {
                if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
                  return of(errorActions.setRequestErrors({ errors: [...responseError.graphQLErrors] }));
                }
              })
            );
        })
      )
  );

  editUserAddressSetBillingDefault$: Observable<any> = createEffect(() =>
    this.action$
      .pipe(
        ofType(userActions.editUserAddressSetBillingDefault),
        switchMap(({ _id, _fromId }) => {
          return this.userApiService
            .editUserAddressBillingDefault(_id, _fromId)
            .pipe(
              map((result) => {
                return userActions.editUserAddressSetBillingDefaultSuccess({ _id });
              }),
              catchError((responseError: ErrorResponse) => {
                if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
                  return of(errorActions.setRequestErrors({ errors: [...responseError.graphQLErrors] }));
                }
              })
            );
        })
      )
  );
}
