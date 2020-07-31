import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootState } from '../../@store/reducers/reducers';
import * as itemActions from '../../@store/item/item.actions';

@Injectable()
export class ProductItemResolver implements Resolve<Observable<any>> {
  constructor(private store$: Store<RootState>) {}

  resolve() {
    this.store$.dispatch(itemActions.loadItem({}));
    return of('loadItem dispatched');
  }
}
