import {Component, Input, OnInit} from '@angular/core';
import {LoginDto} from '../../common/dto';
import * as authActions from '../../../@store/auth';
import {Store} from '@ngrx/store';
import {RootState} from '../../../@store/reducers/reducers';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private store$: Store<RootState>, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  loginRequest(loginData: LoginDto): void {
    // tslint:disable-next-line:no-string-literal
    this.store$.dispatch(authActions.loginRequest({ login: loginData, redirectTo: this.route.snapshot.queryParams['redirectTo'] }));
  }

}
