import {NgModule} from '@angular/core';
import {UserApiService} from './services';
import {UserService} from './services/user.service';

@NgModule({
  providers: [
    UserApiService,
    UserService,
  ]
})
export class UserModule { }
