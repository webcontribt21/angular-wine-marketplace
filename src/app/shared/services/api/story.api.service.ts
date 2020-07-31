import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import {
  categoriesGQL,
  articleCategoriesGQL,
  singleCategoryArticlesGQL,
  singleArticleGQL,
  moreCategoryArticlesGQL,
  allAuthorsGQL,
  speicalAuthorGQL,
  sortAuthorsGQL
} from '../../../graphql/queries';
import { map } from 'rxjs/operators';
import { timeSortList } from '../../constants/sort-list';
import { mostPopularSingleCategoryArticlesGQL } from 'src/app/graphql/queries/story.queries';
import { ARTICLES_LIMIT } from 'src/app/@store/story/story.reducer';

@Injectable({
  providedIn: 'root'
})
export class StoryApiService {

  constructor(private apollo: Apollo) { }

  getStoryArticlesData(): Observable<any> {
    return this.apollo
      .query({
        query: articleCategoriesGQL
      })
      .pipe(
        map(result => result.data ?
          result.data['ArticleCategories'] :
          []
        )
      )
  }

  getStoryCategoriesData(): Observable<any> {
    return this.apollo
      .query({
        query: categoriesGQL
      })
      .pipe(
        map(result => result.data ?
          result.data['ArticleCategories'] :
          []
        )
      )
  }

  /**
   * get articles for single category
   * @param id category number
   */
  getSingleCategoryArticlesData(id: number): Observable<any> {
    return this.apollo
      .query({
        query: singleCategoryArticlesGQL,
        variables: {
          id
        }
      })
      .pipe(
        map(result => result.data ?
          result.data['ArticleCategories'][0] ? result.data['ArticleCategories'][0] : {} :
          {}
        )
      );
  }

  getSingleArticleData(id: string): Observable<any> {
    return this.apollo
      .query({
        query: singleArticleGQL,
        variables: {
          id
        }
      })
      .pipe(
        map(result => result.data ?
          result.data['Article'] :
          []
        )
      )
  }

  /**
   * get category articles for more action
   * @param limit limit
   * @param skip skip
   * @param id category number
   * @param sort sort string
   */
  getMoreCategoryArticlesData(limit: number, skip: number, id: number, sort: string): Observable<any> {
    if (sort === timeSortList[0]) { // latest
      return this.apollo
        .query({
          query: moreCategoryArticlesGQL,
          variables: {
            limit,
            skip,
            id
          }
        })
        .pipe(
          map(result => result.data ?
            result.data['Articles'] :
            []
          )
        );
    } else {
      return this.apollo
        .query({
          query: mostPopularSingleCategoryArticlesGQL,
          variables: {
            id: id.toString(),
            limit,
            skip
          }
        })
        .pipe(
          map(result => result.data['Articles'] ? result.data['Articles'] : [])
        );
    }
  }

  /**
   * get all authors
   * @param sort sort string
   */
  getAllAuthorsData(sort: string = ''): Observable<any> {
    if (sort) {
      return this.apollo
        .query({
          query: sortAuthorsGQL,
          variables: {
            sort: sort === timeSortList[0] ? '-dateCreated' : 'dateCreated'
          }
        })
        .pipe(
          map(result => result.data ?
            result.data['Authors'] :
            []
          )
        );
    }

    return this.apollo
      .query({
        query: allAuthorsGQL
      })
      .pipe(
        map(result => result.data ?
          result.data['Authors'] :
          []
        )
      );
  }

  /**
   * get special author
   * @param id author's _id
   */
  getSpecialAuthorData(id: string): Observable<any> {
    return this.apollo
      .query({
        query: speicalAuthorGQL,
        variables: {
          id
        }
      })
      .pipe(
        map(result => result.data ?
          result.data['Author'] :
          []
        )
      )
  }



  /**
   * get articles of single category
   */
  getSingleCategoryArticles(sort: string, articleCategoryNo: number): Observable<any> {
    if (sort === timeSortList[0]) { // latest
      return this.apollo
        .query({
          query: singleCategoryArticlesGQL,
          variables: {
            id: articleCategoryNo.toString()
          }
        })
        .pipe(
          map(result => result.data ?
            result.data['ArticleCategories'][0] ? result.data['ArticleCategories'][0] : {} :
            {}
          )
        );
    } else { // most popular
      return this.apollo
        .query({
          query: mostPopularSingleCategoryArticlesGQL,
          variables: {
            id: articleCategoryNo.toString(),
            limit: ARTICLES_LIMIT,
            skip: 0
          }
        })
        .pipe(
          map(result => {
            return {
              articles: result.data['Articles'] ? result.data['Articles'] : [],
              articleCategoryNo
            };
          })
        );
    }
  }
}
