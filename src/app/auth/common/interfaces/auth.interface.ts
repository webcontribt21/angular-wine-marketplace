import {UserToken} from './user-token.interface';

export interface Auth {
  token: UserToken;
  auth?: boolean;
  message?: string;
}

export interface Login {
  Login?: Auth,
}
