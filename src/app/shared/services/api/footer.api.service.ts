import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import {
  footerLinkListCol1GQL,
  footerLinkListCol2GQL,
  footerLinkListCol3GQL,
  aboutCopyGQL
  // homeFeaturedWinesGQL,
  // homeBottomAdvertLeftGQL,
  // homeBottomStoryRightGQL,
  // homeMidArticlesGQL
} from '../../../graphql/queries';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FooterApiService {

  constructor(private apollo: Apollo) { }

  getFooterLinksListCol1Data(): Observable<any> {
    // console.log('ttttttttttt')
    return this.apollo
      .query({
        query: footerLinkListCol1GQL
      })
      .pipe(
        map(result => result.data['SiteContentBlocks'][0] ?
          result.data['SiteContentBlocks'][0]['siteContentBlockDetail'] :
          []
        )
      )
  }

  getFooterLinksListCol2Data(): Observable<any> {
    // console.log('ttttttttttt')
    return this.apollo
      .query({
        query: footerLinkListCol2GQL
      })
      .pipe(
        map(result => result.data['SiteContentBlocks'][0] ?
          result.data['SiteContentBlocks'][0]['siteContentBlockDetail'] :
          []
        )
      )
  }

  getFooterLinksListCol3Data(): Observable<any> {
    // console.log('ttttttttttt')
    return this.apollo
      .query({
        query: footerLinkListCol3GQL
      })
      .pipe(
        map(result => result.data['SiteContentBlocks'][0] ?
          result.data['SiteContentBlocks'][0]['siteContentBlockDetail'] :
          []
        )
      )
  }

  // getHomeTopAdvertsData(): Observable<any> {
  //   return this.apollo
  //     .query({
  //       query: homeTopAdvertsGQL
  //     })
  //     .pipe(
  //       map(result => result.data['SiteContentBlocks'][0] ?
  //         result.data['SiteContentBlocks'][0]['siteContentBlockDetail'] :
  //         []
  //       )
  //     )
  // }

  getAboutCopyData(): Observable<any> {
    // console.log('ddddsss')
    return this.apollo
      .query({
        query: aboutCopyGQL
      })
      .pipe(
        map(result => result.data['SiteContentBlocks'][0] ?
          result.data['SiteContentBlocks'][0]['siteContentBlockDetail'] ? result.data['SiteContentBlocks'][0]['siteContentBlockDetail'][0] : {} :
          {}
        )
      )
  }

  // getHomeBottomAdvertLeftData(): Observable<any> {
  //   return this.apollo
  //     .query({
  //       query: homeBottomAdvertLeftGQL
  //     })
  //     .pipe(
  //       map(result => result.data['SiteContentBlocks'][0] ?
  //         result.data['SiteContentBlocks'][0]['siteContentBlockDetail'] ? result.data['SiteContentBlocks'][0]['siteContentBlockDetail'][0] : {} :
  //         {}
  //       )
  //     )
  // }

  // getHomeBottomStoryRightGQLData(): Observable<any> {
  //   return this.apollo
  //     .query({
  //       query: homeBottomStoryRightGQL
  //     })
  //     .pipe(
  //       map(result => result.data['SiteContentBlocks'][0] ?
  //         result.data['SiteContentBlocks'][0]['siteContentBlockDetail'] ? result.data['SiteContentBlocks'][0]['siteContentBlockDetail'][0]['article'] : {} :
  //         {}
  //       )
  //     )
  // }

  // getHomeMidArticlesGQLData(): Observable<any> {
  //   return this.apollo
  //     .query({
  //       query: homeMidArticlesGQL
  //     })
  //     .pipe(
  //       map(result => result.data['SiteContentBlocks'][0] ?
  //         result.data['SiteContentBlocks'][0]['siteContentBlockDetail']:
  //         []
  //       )
  //     )
  // }
}
