import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { catchError, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { searchItems } from '../../../graphql/queries';
import { SearchFilter } from '../../interfaces/search-filter.interface';
import { Item } from '../../interfaces/item.interface';
import { Page } from '../../interfaces/page.interface';
import { Facet } from '../../interfaces/facet.interface';

@Injectable({
  providedIn: 'root'
})
export class SearchItemsApiService {
  constructor(private apollo: Apollo) {}

  searchItems(
    query: string = '',
    limit: number = 0,
    page: number = 0,
    filters: SearchFilter[] = [],
    sort: string = ''
  ) : Observable<{ items: Item[], facets: Facet[], page: Page }> {
    return this.apollo
      .query({
        query: searchItems,
        variables: {
          query,
          limit,
          page,
          filters,
          sort
        }
      })
      .pipe(
        map(result => {
          return result.data['searchItems'];
        }),
        catchError(err => {
          return throwError(err);
        }),
        catchError(err => {
          console.log('caught rethrown error, providing fallback value');
          return of([]);
        })
      );
  }
}
