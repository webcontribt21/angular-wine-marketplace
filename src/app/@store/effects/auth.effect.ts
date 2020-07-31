import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ErrorResponse } from 'apollo-link-error';
import { LoginDto, newUserDto } from '../../auth/common/dto';
import { AuthApiService } from '../../auth/services/auth.api.service';
import { Login } from '../../auth/common/interfaces/auth.interface';
import { Roles } from '../../auth/common/enums';

import * as errorActions from '../errors';
import * as authActions from '../auth/auth.actions';
import * as userActions from '../user/user.actions';
import * as cartActions from '../cart/cart.actions';
import { UserHelper } from 'src/app/shared/helpers';

@Injectable({
  providedIn: 'root'
})
export class AuthEffect {
  constructor(private action$: Actions, private authApiService: AuthApiService, private router: Router) {}

  closeAuthModal$: Observable<any> = createEffect(() =>
    this.action$.pipe(
      ofType(authActions.authCloseModal),
      map(() => authActions.closeOpenedModal())
    )
  );

  toggleAuthModal$: Observable<any> = createEffect(() =>
    this.action$.pipe(
      ofType(authActions.authToggleModal),
      map(() => authActions.authUiSet())
    )
  );

  login$: Observable<any> = createEffect(() =>
    this.action$.pipe(
      ofType(authActions.loginRequest),
      switchMap(({ login, redirectTo }) => {
        return this.authApiService.login(login).pipe(
          switchMap(({ data }) => {
            const { Login: response }: Login = data;
            const { token, auth } = response;
            localStorage.setItem('token', token.token);
            const actualRedirectTo = redirectTo || '/';
            this.router.navigateByUrl(actualRedirectTo);
            const userDetail = UserHelper.getUserId();

            return [authActions.loginRequestSuccess({ auth, token }), userActions.loadUserData(userDetail), cartActions.cartOnLogin()];
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

  logout$: Observable<any> = createEffect(() =>
    this.action$.pipe(
      ofType(authActions.logout),
      switchMap(() => {
        localStorage.clear();
        return [
          cartActions.cartOnLogout()
        ];
      })
    )
  );

  // logout

  registration$: Observable<any> = createEffect(() =>
    this.action$.pipe(
      ofType(authActions.registration),
      switchMap((userCreateData: newUserDto) => {
        const data: newUserDto = {
          email: userCreateData.email,
          firstName: userCreateData.firstName,
          lastName: userCreateData.lastName,
          password: userCreateData.password,
          userTypeNo: Roles.CUSTOMER
        };

        return this.authApiService.registration(data).pipe(
          switchMap(result => {
            const token: string = result.data.Register.token.token;
            localStorage.setItem('token', token);
            // const actualRedirectTo = redirectTo || '/';
            const actualRedirectTo = '/';
            this.router.navigateByUrl(actualRedirectTo);
            const userDetail = UserHelper.getUserId();

            return [
              authActions.registrationSuccess({ auth: true, token }),
              userActions.loadUserData(userDetail),
              cartActions.cartOnLogin()
            ];
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
