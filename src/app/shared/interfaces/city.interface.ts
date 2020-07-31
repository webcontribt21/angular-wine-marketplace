import {Suburb} from './suburb.interface';
import {State} from './state.interface';
import {Country} from './country.interface';

export interface City {
  _id: string;
  name: string;
  state_id: string;
  state: State;
  country_id: string;
  country: Country;
  suburbs: Suburb[];
}
