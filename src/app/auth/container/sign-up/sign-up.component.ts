import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {RootState} from '../../../@store/reducers/reducers';

import * as authActions from '../../../@store/auth/auth.actions';
import {newUserDto} from '../../common/dto';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private store$: Store<RootState>) { }

  ngOnInit() {
  }

  createUser(data: newUserDto) {
    this.store$.dispatch(authActions.registration(data));
  }

}
