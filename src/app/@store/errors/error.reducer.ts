import {GraphQLError} from 'graphql';
import {Action, createReducer, on} from '@ngrx/store';

import * as errorActions from './error.actions';

export interface ErrorState {
  errors: GraphQLError[],
}

export const initialState: ErrorState = {
  errors: [],
};

export const errorReducer = createReducer(
  initialState,
  on(errorActions.setRequestErrors, (state, { errors }) => {
    return {
      ...state,
      errors,
    }
  })
);

export function reducer(state: ErrorState | undefined, action: Action) {
  return errorReducer(state, action);
}
