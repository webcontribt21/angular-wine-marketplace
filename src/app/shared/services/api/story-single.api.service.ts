import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';

import {
  singleArticleRelatedWinesGQL,
} from '../../../graphql/queries';
import { map } from 'rxjs/operators';
import { singleArticleRelatedStoriesGQL } from 'src/app/graphql/queries/story-single.queries';

@Injectable({
  providedIn: 'root'
})
export class StorySingleApiService {

  constructor(private apollo: Apollo) { }

  /**
   * get related wines
   */
  getRelatedWinesData(articleId: string): Observable<any> {
    return this.apollo
      .query({
        query: singleArticleRelatedWinesGQL,
        variables: {
          id: articleId
        }
      })
      .pipe(
        map(result => result.data
          ? result.data['ArticleItems'].map(articleItem => {
            return articleItem.item[0] ? articleItem.item[0] : {}
          })
          : []
        )
      );
  }

  /**
   * get related articles
   */
  getRelatedArticlesData(articleId: string): Observable<any> {
    return this.apollo
      .query({
        query: singleArticleRelatedStoriesGQL,
        variables: {
          id: articleId
        }
      })
      .pipe(
        map(result => result.data
            ? result.data['ArticleRelateds']
              ? result.data['ArticleRelateds'].map(articleItem => {
                return articleItem.relatedArticle ? articleItem.relatedArticle : null
              })
              : []
            : []
        )
      );
  }
}
