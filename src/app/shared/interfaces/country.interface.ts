import {State} from './state.interface';

export interface Country {
  _id: string;
  name: string;
  shortName: string;
  states: State[];
  count?: number;
}
