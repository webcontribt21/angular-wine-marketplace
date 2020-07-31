import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import {
  homeTopArticlesGQL,
  homeTopAdvertsGQL,
  homeFeaturedWinesGQL,
  homeBottomAdvertLeftGQL,
  homeBottomStoryRightGQL,
  homeMidArticlesGQL,
  homeTopFeaturesGQL,
  homePopularWinesGQL
} from '../../../graphql/queries';
import { map } from 'rxjs/operators';
import { homeTopBannerMobileGQL } from 'src/app/graphql/queries/home.queries';

@Injectable({
  providedIn: 'root'
})
export class HomeApiService {

  constructor(private apollo: Apollo) { }

  getHomeTopArticlesData(): Observable<any> {
    return this.apollo
      .query({
        query: homeTopArticlesGQL
      })
      .pipe(
        map(result => result.data['SiteContentBlocks'][0] ?
                        result.data['SiteContentBlocks'][0]['siteContentBlockDetail'] :
                        []
        )
      )
  }

  getHomeTopAdvertsData(): Observable<any> {
    return this.apollo
      .query({
        query: homeTopAdvertsGQL
      })
      .pipe(
        map(result => result.data['SiteContentBlocks'][0] ?
                        result.data['SiteContentBlocks'][0]['siteContentBlockDetail'] :
                        []
        )
      )
  }

  getHomeFeaturedWinesData(): Observable<any> {
    return this.apollo
      .query({
        query: homeFeaturedWinesGQL
      })
      .pipe(
        map(result => result.data['SiteContentBlocks'][0] ?
                        result.data['SiteContentBlocks'][0]['siteContentBlockDetail'] :
                        []
        )
      )
  }

  getHomeBottomAdvertLeftData(): Observable<any> {
    return this.apollo
      .query({
        query: homeBottomAdvertLeftGQL
      })
      .pipe(
        map(result => result.data['SiteContentBlocks'][0] ?
                        result.data['SiteContentBlocks'][0]['siteContentBlockDetail'] ?
                          result.data['SiteContentBlocks'][0]['siteContentBlockDetail'][0] :
                          {} :
                        {}
        )
      )
  }

  getHomeBottomStoryRightGQLData(): Observable<any> {
    return this.apollo
      .query({
        query: homeBottomStoryRightGQL
      })
      .pipe(
        map(result => result.data['SiteContentBlocks'][0] ?
                        result.data['SiteContentBlocks'][0]['siteContentBlockDetail'] ?
                          result.data['SiteContentBlocks'][0]['siteContentBlockDetail'][0]['article'] :
                          {} :
                        {}
        )
      )
  }

  getHomeMidArticlesGQLData(): Observable<any> {
    return this.apollo
      .query({
        query: homeMidArticlesGQL
      })
      .pipe(
        map(result => result.data['SiteContentBlocks'][0] ?
                        result.data['SiteContentBlocks'][0]['siteContentBlockDetail']:
                        []
        )
      )
  }

  // Top Features
  getHomeTopFeaturesGQLData(): Observable<any> {
    return this.apollo
      .query({
        query: homeTopFeaturesGQL
      })
      .pipe(
        map(result => result.data['SiteContentBlocks'][0] ?
                        result.data['SiteContentBlocks'][0]['siteContentBlockDetail'] ?
                          result.data['SiteContentBlocks'][0]['siteContentBlockDetail'][0] :
                          {} :
                        {}
        )
      )
  }

  // Popular Wines
  getHomePopularWinesData(): Observable<any> {
    return this.apollo
      .query({
        query: homePopularWinesGQL
      })
      .pipe(
        map(result => result.data['ItemPopular'] ? result.data['ItemPopular'] : [])
      )
  }

  // Top Banner Mobile
  getHomeTopBannerMobileGQLData(): Observable<any> {
    return this.apollo
      .query({
        query: homeTopBannerMobileGQL
      })
      .pipe(
        map(result => result.data['SiteContentBlocks'][0] ?
                        result.data['SiteContentBlocks'][0]['siteContentBlockDetail'] ?
                          result.data['SiteContentBlocks'][0]['siteContentBlockDetail'][0] :
                          {} :
                        {}
        )
      )
  }
}
