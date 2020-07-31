import {createFeatureSelector, createSelector} from '@ngrx/store';
import {CountriesState} from './country.reducer';

export const countryFeatureSelector = createFeatureSelector<CountriesState>('countryReducer');

export const countriesSelector = createSelector(
  countryFeatureSelector,
  ({ countries }: CountriesState, props) => countries
);
