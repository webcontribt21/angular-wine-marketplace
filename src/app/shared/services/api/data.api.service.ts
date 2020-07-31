import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import {dataGQL} from '../../../graphql/queries';
import {map} from 'rxjs/operators';
import { vendorFiltersGQL } from 'src/app/graphql/queries/data.query';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(private apollo: Apollo) {}

  getAllData(): Observable<any> {
    return this.apollo
      .query({
        query: dataGQL
      })
      .pipe(
        map(result => result.data)
      )
  }

  getVendorFilters(): Observable<any> {
    return this.apollo
      .query({
        query: vendorFiltersGQL
      })
      .pipe(
        map(result => result['data']['Suppliers'] ? result['data']['Suppliers'] : [])
      )
  }
}
