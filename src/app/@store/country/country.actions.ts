import {createAction, props} from '@ngrx/store';
import {COUNTRIES__LOAD, COUNTRIES__LOAD_FAILURE, COUNTRIES__LOAD_SUCCESS} from './country.types';
import {Country} from '../../shared/interfaces/country.interface';

export const loadCountriesSuccess: any = createAction(
  COUNTRIES__LOAD_SUCCESS,
  props<{ countries: Country[] }>()
);

export const loadCountriesError: any = createAction(
  COUNTRIES__LOAD_FAILURE,
  props()
);

export const loadCountries: any = createAction(
  COUNTRIES__LOAD,
);
