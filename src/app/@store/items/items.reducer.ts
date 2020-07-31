import {Action, createReducer, on} from '@ngrx/store';
import {Item} from '../../shared/interfaces/item.interface';

import * as itemsActions from './items.actions';

export interface ItemsState {
  items: Item[];
}

const initialState: ItemsState = {
  items: [],
};

const itemsReducer = createReducer(
  initialState,
  on(itemsActions.loadItemsSuccess, (state, { items }) => {
    return {
      ...state,
      items: [
        ...items
      ],
    }
  }),
);

export function reducer(state: ItemsState | undefined, action: Action) {
  return itemsReducer(state, action);
}
