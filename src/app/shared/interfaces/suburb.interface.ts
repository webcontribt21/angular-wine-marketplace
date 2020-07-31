import {City} from './city.interface';
import {Country} from './country.interface';
import {State} from './state.interface';

export interface Suburb {
  _id: string;
  name: string;
  country_id: string;
  city_id: string;
  state_id: string;
  country: Country;
  city: City;
  state: State;
}
