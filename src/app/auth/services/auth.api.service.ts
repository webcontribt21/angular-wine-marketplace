import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {loginGQL, refreshTokenGQL, registrationGQL} from '../../graphql/mutations';
import {LoginDto, newUserDto, RegistrationDto} from '../common/dto';
import {Observable} from 'rxjs';
import {FetchResult} from 'apollo-link';
import {Login} from '../common/interfaces/auth.interface';
import {RefreshToken} from '../common/interfaces';

@Injectable()

export class AuthApiService {

  constructor(private apollo: Apollo) { }

  login(data: LoginDto): Observable<FetchResult<Login>> {
    return this.apollo
      .mutate({
        mutation: loginGQL,
        variables: data,
      })
  }

  registration(data: newUserDto): Observable<FetchResult<RegistrationDto>> {
    return this.apollo
      .mutate({
        mutation: registrationGQL,
        variables: data,
      })
  }

  refreshToken(): Observable<FetchResult<RefreshToken>> {
    return this.apollo
      .mutate({
        mutation: refreshTokenGQL,
      })
  }

}
