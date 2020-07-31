import {Action, createReducer, on} from '@ngrx/store';
import {Country} from '../../shared/interfaces/country.interface';

import * as countryActions from './country.actions';

export interface CountriesState {
  countries: Country[];
}

const initialState: CountriesState = {
  countries: [],
};

const countryReducer = createReducer(
  initialState,
  on(countryActions.loadCountriesSuccess, (state, { countries }) => {
    return {
      ...state,
      countries: [...countries],
    };
  }),
);

export function reducer(state: CountriesState | undefined, action: Action) {
  return countryReducer(state, action);
}
