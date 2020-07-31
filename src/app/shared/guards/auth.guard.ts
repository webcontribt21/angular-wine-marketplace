import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { tap, filter, take, switchMap, catchError, withLatestFrom } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { RootState } from 'src/app/@store/reducers/reducers';
import { isAuth as isAuthSelector } from 'src/app/@store/auth';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private store$: Store<RootState>, private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> {
        return this.store$.pipe(
            select(isAuthSelector),
            switchMap(isAuth => {
                if (!isAuth) {
                    return of(this.router.parseUrl('/auth/sign_in?redirectTo=' + encodeURIComponent(state.url)));
                } else {
                    return of(true);
                }
            })
        );
    }
}
