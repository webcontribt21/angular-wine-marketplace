import {createAction, props} from '@ngrx/store';
import {ERROR__GET_DATA, ERROR__SET_DATA} from './error.types';
import {GraphQLError} from 'graphql';

export const setRequestErrors = createAction(
  ERROR__SET_DATA,
  props<{errors: GraphQLError[]}>()
);

export const getRequestErrors = createAction(
  ERROR__GET_DATA,
);
