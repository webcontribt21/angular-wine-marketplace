import {Country} from './country.interface';
import {City} from './city.interface';

export interface State {
  _id: string;
  name: string;
  country_id: string;
  country: Country;
  cities: City[];
}
