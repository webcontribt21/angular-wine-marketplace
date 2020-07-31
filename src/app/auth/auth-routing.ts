import {AuthComponent} from './container/auth.component';
import {SignInComponent} from './container/sign-in/sign-in.component';
import {SignUpComponent} from './container/sign-up/sign-up.component';

export const router = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'sign_in',
        component: SignInComponent,
      },
      {
        path: 'sign_up',
        component: SignUpComponent,
      },
    ]
  }
];
