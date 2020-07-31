import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {router} from './auth-routing';
import {SignInComponent} from './container/sign-in/sign-in.component';
import {SignInFormComponent} from './container/sign-in/sign-in-form/sign-in-form.component';
import {AuthComponent} from './container/auth.component';
import {SignUpComponent} from './container/sign-up/sign-up.component';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {SignUpFormComponent} from './container/sign-up/sign-up-form/sign-up-form.component';
import {AuthApiService} from './services/auth.api.service';
import {AuthService} from './services';

@NgModule({
  imports: [
    RouterModule.forChild(router),
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [
    SignInComponent,
    SignInFormComponent,
    AuthComponent,
    SignUpComponent,
    SignUpFormComponent,
  ],
  exports: [],
  providers: [
    AuthApiService,
    AuthService,
  ],
})
export class AuthModule {
}
