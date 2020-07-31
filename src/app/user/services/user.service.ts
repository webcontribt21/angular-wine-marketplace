import {Injectable} from '@angular/core';
import {RootState} from '../../@store/reducers/reducers';
import {Store} from '@ngrx/store';

import * as userActions from '../../@store/user/user.actions';
import {UserHelper} from '../../shared/helpers';

@Injectable()
export class UserService {

  constructor(private store$: Store<RootState>) {}

  loadUserDetail() {
    const userDetail = UserHelper.getUserId();

    if (userDetail) {
      this.store$.dispatch(userActions.loadUserData(userDetail));
    }
  }
}
