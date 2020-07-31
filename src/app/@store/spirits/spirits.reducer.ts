import {Action, createReducer, on} from '@ngrx/store';
import {ItemDetailType} from '../../shared/interfaces/Item-detail-type.interface';

import * as spiritsActions from './spirits.actions';

export interface ItemDetailTypeState {
  spirits: ItemDetailType[];
}

const initialState: ItemDetailTypeState = {
  spirits: [],
};

const spiritsReducer = createReducer(
  initialState,
  on(spiritsActions.loadSpirits, (state, { spirits }) => {
    return {
      spirits: [...spirits],
    }
  }),
);

export function reducer(state: ItemDetailTypeState | undefined, action: Action) {
  return spiritsReducer(state, action);
}
