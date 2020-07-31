import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { tap, filter, take, switchMap, catchError, withLatestFrom } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { RootState } from 'src/app/@store/reducers/reducers';
import { isLoadedDataSelector } from 'src/app/@store/data/isLoadedDataSelector';
import { isLoadingDataSelector } from 'src/app/@store/data/isLoadingDataSelector';

@Injectable()
export class DataLoadedGuard implements CanActivate {
    constructor(private store$: Store<RootState>) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap(() => of(true)),
            catchError(err => {
                return of(false);
            })
        );
    }
    checkStore(): Observable<boolean> {
        return this.store$.pipe(
            select(isLoadedDataSelector),
            filter((isLoadedData) => {
                return isLoadedData;
            }),
            take(1)
        );
    }
}
