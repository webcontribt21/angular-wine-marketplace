import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import {
  quickSearchPopularGQL, quickSearchQueryGQL
} from '../../../graphql/queries';
import { map } from 'rxjs/operators';
// import { quickSearchPopularGQL, quickSearchQueryGQL } from 'src/app/graphql/queries/quick-search.queries';

@Injectable({
  providedIn: 'root'
})
export class QuickSearchApiService {

  constructor(private apollo: Apollo) { }

  getQuickSearchPopularData(): Observable<any> {
    console.log('getQuickSearchPopularData');
    return this.apollo
      .query({
        query: quickSearchPopularGQL
      })
      .pipe(
        map(result => result.data)
      );
  }

  getQuickSearchQueryData(query: string): Observable<any> {
    console.log('getQuickSearchQueryData', query);
    return this.apollo
      .query({
        query: quickSearchQueryGQL,
        variables: {
          query
        }
      })
      .pipe(
        map(result => result.data)
      );
  }
}
