import {createAction, props} from '@ngrx/store';
import {
  AUTH__LOGIN_REQUEST,
  AUTH__LOGIN_REQUEST_FAILURE,
  AUTH__LOGIN_REQUEST_SUCCESS,
  AUTH__LOGOUT,
  AUTH__REGISTRATION, AUTH__REGISTRATION_SUCCESS,
  AUTH__UI_CLOSE_MODAL, AUTH__UI_CLOSE_OPENED_MODAL,
  AUTH__UI_OPEN_MODAL,
  AUTH__UI_SET,
  AUTH__UI_TOGGLE_MODAL,
} from './auth.types';
import {AuthState} from './auth.reducer';
import {LoginDto, newUserDto} from '../../auth/common/dto';
import {Auth} from '../../auth/common/interfaces';
import {GraphQLError} from 'graphql';

export const authUiSet: any = createAction(
  AUTH__UI_SET
);

export const authOpenModal: any = createAction(
  AUTH__UI_OPEN_MODAL,
);

export const authCloseModal: any = createAction(
  AUTH__UI_CLOSE_MODAL,
);

export const closeOpenedModal: any = createAction(
  AUTH__UI_CLOSE_OPENED_MODAL,
);

export const loginRequest: any = createAction(
  AUTH__LOGIN_REQUEST,
  props<{ login: LoginDto, redirectTo: string}>()
);

export const loginRequestSuccess: any = createAction(
  AUTH__LOGIN_REQUEST_SUCCESS,
  props<Auth>()
);

export const logout: any = createAction(
  AUTH__LOGOUT,
);

export const loginRequestFailure: any = createAction(
  AUTH__LOGIN_REQUEST_FAILURE,
  props<ReadonlyArray<GraphQLError>>()
);

export const registration: any = createAction(
  AUTH__REGISTRATION,
  props<newUserDto>()
);

export const registrationSuccess: any = createAction(
  AUTH__REGISTRATION_SUCCESS,
  props<Auth>()
);

export const authToggleModal: any = createAction(
  AUTH__UI_TOGGLE_MODAL,
);
