import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { RootState } from '../../@store/reducers/reducers';
import * as itemActions from '../../@store/item/item.actions';
import { withLatestFrom, take, mergeMap } from 'rxjs/operators';
import { selectRouteSegments } from 'src/app/@store/router/router.selector';
import { customFiltersSelector, filtersSelector, compositeFiltersSelector } from 'src/app/@store/filters/filter.selector';
import { FilterData } from '../interfaces/filter.interface';
import { ProductListHelper } from '../helpers';
import * as filterActions from 'src/app/@store/filters/filter.actions';

@Injectable()
export class ProductListCustomFilterResolver implements Resolve<Observable<any>> {
  constructor(private store$: Store<RootState>) {}

  resolve() {
    return this.store$.pipe(
      withLatestFrom(
        this.store$.pipe(select(filtersSelector)),
        this.store$.pipe(select(compositeFiltersSelector)),
        this.store$.pipe(select(selectRouteSegments))
      ),
      take(1),
      mergeMap(([props, filters, compositeFilters, segments]) => {
        const routeCustomFilters = ProductListHelper.getCustomFiltersFromRoute(filters, segments);
        this.store$.dispatch(filterActions.addRouteCustomFilters({ ...routeCustomFilters }));
        return of(routeCustomFilters);
      })
    );
  }
}
