import {Action, createReducer, on} from '@ngrx/store';
import {Page} from '../../shared/interfaces/page.interface';

import * as paginationActions from './pagination.actions';

export interface PaginationState {
  pagination: Page;
}

const initialState: PaginationState = {
  pagination: new Page(),
};

const paginationReducer = createReducer(
  initialState,
  on(paginationActions.loadPAGINATIONSuccess, (state, { pagination }) => {
    return {
      ...state,
      pagination: {
        ...pagination
      },
    }
  }),
);

export function reducer(state: PaginationState | undefined, action: Action) {
  return paginationReducer(state, action);
}
