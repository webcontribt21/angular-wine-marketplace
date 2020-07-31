import {Injectable} from '@angular/core';
import {AuthApiService} from './auth.api.service';
import {interval, Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {UserHelper} from '../../shared/helpers';

@Injectable()
export class AuthService {

  constructor(private authApiService: AuthApiService) { }

  getRefreshToken(): Observable<any> {
    const time = UserHelper.getTimeUpdateToken();

    return interval(time)
      .pipe(
        switchMap((value) => {
          return this.authApiService.refreshToken()
            .pipe(
              map( data => {
                const token = data.data.Renew.token;

                localStorage.setItem('token', token);

                return data;
              })
            );
        })
      );

  }
}
