import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {UserDetailDto} from '../common/dto';
import {Observable, of, throwError} from 'rxjs';
import {UserDetail, UserAddress, UserCard} from '../common/interfaces';
import {catchError, map} from 'rxjs/operators';
import {userQuery, userAddressQuery, userAddressesQuery} from '../../graphql/queries';
import { createUserAddressQuery, editUserAddressQuery } from 'src/app/graphql/mutations';
import {
  deleteUserAddressQuery,
  editUserAddressBillingDefaultQuery,
  editUserAddressDeliveryDefaultQuery
} from 'src/app/graphql/mutations/user.mutations';
import { userCardsQuery } from 'src/app/graphql/queries/user.queries';

@Injectable()

export class UserApiService {

  constructor(private apollo: Apollo) { }

  getUserDetail(data: UserDetailDto): Observable<UserDetail> {
    return this.apollo
      .query({
        query: userQuery,
        variables: data,
      })
      .pipe(
        map(result => result.data['User']),
        catchError(err => {
          return throwError(err);
        }),
        catchError(err => {
          console.log('caught rethrown error, providing fallback value');
          return of([]);
        }),
      );
  }

  getUserCards(): Observable<[UserCard]> {
    return this.apollo
      .query({
        query: userCardsQuery
      })
      .pipe(
        // tslint:disable-next-line:no-string-literal
        map(result => result.data['PaymentCards']),
        catchError(err => {
          return throwError(err);
        }),
        catchError(err => {
          console.log('caught rethrown error, providing fallback value');
          return of([]);
        }),
      );
  }

  getUserAddress(id: string): Observable<UserAddress> {
    return this.apollo
      .query({
        query: userAddressQuery,
        variables: {
          id
        }
      })
      .pipe(
        map(result => result.data['UserAddress']),
        catchError(err => {
          return throwError(err);
        }),
        catchError(err => {
          console.log('caught rethrown error, providing fallback value');
          return of([]);
        }),
      );
  }

  getUserAddresses(): Observable<UserAddress[]> {
    return this.apollo
      .query({
        query: userAddressesQuery,
      })
      .pipe(
        map(result => result.data['UserAddresses']),
        catchError(err => {
          return throwError(err);
        }),
        catchError(err => {
          console.log('caught rethrown error, providing fallback value');
          return of([]);
        }),
      );
  }

  deleteUserAddress(_id: string): Observable<any> {
    return this.apollo
      .query({
        query: deleteUserAddressQuery,
        variables: {
          _id
        }
      })
      .pipe(
        map(result => result),
        catchError(err => {
          return throwError(err);
        }),
        catchError(err => {
          console.log('caught rethrown error, providing fallback value');
          return of([]);
        }),
      );
  }

  createUserAddress(userAddress: UserAddress): Observable<UserAddress> {
    return this.apollo
      .query({
        query: createUserAddressQuery,
        variables: userAddress
      })
      .pipe(
        map(result => result.data['createUserAddress']),
        catchError(err => {
          return throwError(err);
        }),
        catchError(err => {
          console.log('caught rethrown error, providing fallback value');
          return of([]);
        }),
      );
  }

  editUserAddress(userAddress: UserAddress): Observable<UserAddress> {
    return this.apollo
      .query({
        query: editUserAddressQuery,
        variables: userAddress
      })
      .pipe(
        map(result => result.data['editUserAddress']),
        catchError(err => {
          return throwError(err);
        }),
        catchError(err => {
          console.log('caught rethrown error, providing fallback value');
          return of([]);
        }),
      );
  }

  editUserAddressDeliveryDefault(id: string, fromId: string): Observable<any> {
    return this.apollo
      .query({
        query: editUserAddressDeliveryDefaultQuery,
        variables: {
          id,
          fromId
        }
      })
      .pipe(
        map(result => result.data['editUserAddress']),
        catchError(err => {
          return throwError(err);
        }),
        catchError(err => {
          console.log('caught rethrown error, providing fallback value');
          return of([]);
        }),
      );
  }

  editUserAddressBillingDefault(id: string, fromId: string): Observable<any> {
    return this.apollo
      .query({
        query: editUserAddressBillingDefaultQuery,
        variables: {
          id,
          fromId
        }
      })
      .pipe(
        map(result => result.data['editUserAddress']),
        catchError(err => {
          return throwError(err);
        }),
        catchError(err => {
          console.log('caught rethrown error, providing fallback value');
          return of([]);
        }),
      );
  }
}
