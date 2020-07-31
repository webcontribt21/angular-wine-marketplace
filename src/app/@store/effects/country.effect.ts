import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {CountryApiService} from '../../shared/services/api/country.api.service';
import {Country} from '../../shared/interfaces/country.interface';

import * as countryActions from '../country/country.actions';

@Injectable()
export class CountryEffect {

  constructor(
    private action$: Actions,
    private countryApiService: CountryApiService
  ) {}

  loadCountries$: Observable<any> = createEffect(() =>
    this.action$.pipe(
      ofType(countryActions.loadCountries),
      switchMap(() => {
        return this.countryApiService.getCountries()
          .pipe(
            map((countries: Country[]) => {
              return countryActions.loadCountriesSuccess({countries});
            }),
          );
      })
    )
  );
}
