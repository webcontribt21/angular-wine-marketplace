import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {BrandsApiService} from '../../shared/services/api';
import {Brand} from '../../shared/interfaces/brands.interface';

import * as brandActions from '../brands/brands.actions';

@Injectable()
export class BrandEffect {

  constructor(
    private action$: Actions,
    private brandsApiService: BrandsApiService
  ) {}

  loadBrands$: Observable<any> = createEffect(() =>
    this.action$.pipe(
      ofType(brandActions.loadBrands),
      mergeMap(() => {
        return this.brandsApiService.getBrands()
          .pipe(
            map((brands: Brand[]) => {
              return brandActions.loadBrandsSuccess({brands});
            }),
          );
      })
    ));
}
