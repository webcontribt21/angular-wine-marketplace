import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootState } from '../../@store/reducers/reducers';
import * as checkoutActions from '../../@store/checkout/checkout.actions';


@Injectable()
export class OrderSummaryResolver implements Resolve<Observable<any>> {
  constructor(private store$: Store<RootState>) {}

  resolve() {
    this.store$.dispatch(checkoutActions.loadOrder());
    return of('loadOrder dispatched');
  }
}
