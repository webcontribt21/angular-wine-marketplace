import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, of } from 'rxjs';

import {
  latestStoryGQL,
  featuredStoriesGQL,
  mostPopularStoriesGQL,
  topAuthorsGQL,
  videoStoriesGQL,
} from '../../../graphql/queries';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StoryHomeApiService {

  constructor(private apollo: Apollo) { }

  /**
   * get latest story
   */
  getLatestStoryData(): Observable<any> {
    return this.apollo
      .query({
        query: latestStoryGQL
      })
      .pipe(
        map(result => result.data ?
          result.data['Articles'] ?
            result.data['Articles'][0] :
            {} :
          {}
        )
      )
  }

  /**
   * get featured stories
   */
  getFeaturedStoriesData(): Observable<any> {
    return this.apollo
      .query({
        query: featuredStoriesGQL
      })
      .pipe(
        map(result => result.data['SiteContentBlocks'] ?
          result.data['SiteContentBlocks'][0] ?
            result.data['SiteContentBlocks'][0]['siteContentBlockDetail'] :
            [] :
          []
        )
      )
  }

  /**
   * get most popular stories
   */
  getMostPopularStoriesData(): Observable<any> {
    return this.apollo
      .query({
        query: mostPopularStoriesGQL
      })
      .pipe(
        map(result => result.data['Articles'] ? result.data['Articles'] : [])
      )
  }

  /**
   * get top authors
   */
  getTopAuthorsData(): Observable<any> {
    return this.apollo
      .query({
        query: topAuthorsGQL
      })
      .pipe(
        map(result => result.data['AuthorTopContributors'] ? result.data['AuthorTopContributors'] : [])
      )
  }

  /**
   * get video stories
   */
  getVideoStoriesData(): Observable<any> {
    return this.apollo
      .query({
        query: videoStoriesGQL
      })
      .pipe(
        map(result => result.data['SiteContentBlocks'] ?
          result.data['SiteContentBlocks'][0] ?
            result.data['SiteContentBlocks'][0]['siteContentBlockDetail'] :
            [] :
          []
        )
      )
  }
}
