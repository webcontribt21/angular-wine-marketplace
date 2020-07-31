import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import {countriesGQL} from '../../../graphql/queries';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CountryApiService {

  constructor(private apollo: Apollo) {}

  getCountries(): Observable<any> {
    return this.apollo
      .query({ query: countriesGQL })
      .pipe(
        map(result => result.data['Countries'])
      )
  }
}
