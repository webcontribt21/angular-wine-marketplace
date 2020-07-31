import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, of, throwError } from 'rxjs';
import { facetsAndItemTypes, itemDetailTypes, items, itemQuery, itemRelatedArticlesQuery } from '../../../graphql/queries';
import { catchError, map } from 'rxjs/operators';
import { ItemDetailType } from '../../interfaces/Item-detail-type.interface';
import { Item } from '../../interfaces/item.interface';
import { AllData } from '../../interfaces/all-data.interface';
import { ItemRelatedArticle } from '../../interfaces/item-related-article.interface';

@Injectable({
  providedIn: 'root'
})
export class ItemsApiService {
  constructor(private apollo: Apollo) {}

  getItemDetailTypes(): Observable<ItemDetailType[]> {
    return this.apollo.query({ query: itemDetailTypes }).pipe(
      map(result => result.data['ItemDetailTypes']),
      catchError(err => {
        return throwError(err);
      }),
      catchError(err => {
        console.log('caught rethrown error, providing fallback value');
        return of([]);
      })
    );
  }

  getAllItems(): Observable<Item[]> {
    return this.apollo.query({ query: items }).pipe(
      map(result => result.data['Items']),
      catchError(err => throwError(err)),
      catchError(err => {
        console.log('caught rethrown error, providing fallback value');
        return of([]);
      })
    );
  }

  getItem(id: any): Observable<Item> {
    return this.apollo.query({ query: itemQuery, variables: { id } }).pipe(
      map(result => result.data['Item']),
      catchError(err => throwError(err)),
      catchError(err => {
        console.log('caught rethrown error, providing fallback value');
        return of([]);
      })
    );
  }

  getItemRelatedArticles(id: any): Observable<ItemRelatedArticle[]> {
    return this.apollo.query({ query: itemRelatedArticlesQuery, variables: { id } }).pipe(
      map(result => result.data['ItemRelatedArticles']),
      catchError(err => throwError(err)),
      catchError(err => {
        console.log('caught rethrown error, providing fallback value');
        return of([]);
      })
    );
  }
}
