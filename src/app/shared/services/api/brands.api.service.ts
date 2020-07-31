import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import {brandsQuery, countriesGQL} from '../../../graphql/queries';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BrandsApiService {

  constructor(private apollo: Apollo) {}

  getBrands(): Observable<any> {
    return this.apollo
      .query({ query: brandsQuery })
      .pipe(
        map(result => result.data['Brands'])
      )
  }
}
