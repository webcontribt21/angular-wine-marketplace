import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { RootState } from 'src/app/@store/reducers/reducers';
import * as homeActions from 'src/app/@store/home/home.actions';
import {
  homeTopArticleContentsSelector,
  isLoadingTopArticleContentsSelector,
  homeTopAdvertsContentsSelector,
  isLoadingTopAdvertsContentsSelector,
  homeFeaturedWinesSelector,
  isLoadingTopFeaturedWinesSelector,
  homeAdvertLeftSelector,
  isLoadingAdvertLeftSelector,
  homeStoryRightSelector,
  isLoadingStoryRightSelector,
  homeMidArticlesSelector,
  isLoadingMidArticlesSelector,
  homeTopBannerDetailSelector,
  isLoadingHomeTopBannerDetailSelector,
  popularWinesSelector,
  isLoadingPopularWinesSelector,
  isLoadingHomeTopBannerMobileSelector,
  homeTopBannerMobileSelector
} from 'src/app/@store/home/home.selector';
import { ArticleType } from 'src/app/shared/interfaces/home';
import { AnalyticsService } from 'src/app/shared/services/analytics.service';
import { SeoService } from 'src/app/shared/services/seo.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomepageComponent implements OnInit {
  topArticles$: Observable<ArticleType[]> = this.store$.pipe(select(homeTopArticleContentsSelector));
  isTopArticles$: Observable<boolean> = this.store$.pipe(select(isLoadingTopArticleContentsSelector));
  topAdvertsContents$: Observable<Object[]> = this.store$.pipe(select(homeTopAdvertsContentsSelector));
  isTopAdvertsContents$: Observable<boolean> = this.store$.pipe(select(isLoadingTopAdvertsContentsSelector));
  featuredWines$: Observable<Object[]> = this.store$.pipe(select(homeFeaturedWinesSelector));
  isFeaturedWines$: Observable<boolean> = this.store$.pipe(select(isLoadingTopFeaturedWinesSelector));
  advertLeft$: Observable<Object> = this.store$.pipe(select(homeAdvertLeftSelector));
  isAdvertLeft$: Observable<boolean> = this.store$.pipe(select(isLoadingAdvertLeftSelector));
  storyRight$: Observable<Object> = this.store$.pipe(select(homeStoryRightSelector));
  isStoryRight$: Observable<boolean> = this.store$.pipe(select(isLoadingStoryRightSelector));
  midArticles$: Observable<Object> = this.store$.pipe(select(homeMidArticlesSelector));
  isMidArticles$: Observable<boolean> = this.store$.pipe(select(isLoadingMidArticlesSelector));
  // Top Features
  bannerDetail$: Observable<Object> = this.store$.pipe(select(homeTopBannerDetailSelector));
  isBannerDetail$: Observable<boolean> = this.store$.pipe(select(isLoadingHomeTopBannerDetailSelector));
  // Popular Wines
  popularWines$: Observable<Object[]> = this.store$.pipe(select(popularWinesSelector));
  isPopularWines$: Observable<boolean> = this.store$.pipe(select(isLoadingPopularWinesSelector));

  // Top Banner Mobile
  bannerMobileDetail$: Observable<Object> = this.store$.pipe(select(homeTopBannerMobileSelector));
  isBannerMobileDetail$: Observable<boolean> = this.store$.pipe(select(isLoadingHomeTopBannerMobileSelector));

  constructor(
    private store$: Store<RootState>,
    private analyticsService: AnalyticsService,
    private seoService: SeoService
  ) { }

  ngOnInit() {
    // this.store$.dispatch(homeActions.loadHomeTopArticles());
    this.store$.dispatch(homeActions.loadHomeTopFeatures());
    this.store$.dispatch(homeActions.loadHomeTopBannerMobile());
    this.store$.dispatch(homeActions.loadHomeTopAdverts());
    this.store$.dispatch(homeActions.loadHomeMidArticles());
    this.store$.dispatch(homeActions.loadHomeFeaturedWines());
    this.store$.dispatch(homeActions.loadHomeBottomAdvertLeft());
    this.store$.dispatch(homeActions.loadHomeBottomStoryRight());
    this.store$.dispatch(homeActions.loadHomePopularWines());


    this.seoService.set('Port2Port.wine | South Africa’s biggest fine wine selection', [
      { name: 'keywords', content: 'port2port,store,wine' },
      {
        name: 'description',
        content: `Welcome to Port2Port - The Fine Wine MarketPlace. Shop from our library of the most
          celebrated wineries, iconic vintages and specially selected wine cases.`
      },
      { property: 'og:title', content: 'Port2Port.wine | South Africa’s biggest fine wine selection' },
      {
        property: 'og:description',
        content: `Welcome to Port2Port - The Fine Wine MarketPlace. Shop from our library of the most
        celebrated wineries, iconic vintages and specially selected wine cases.`
      },
      { property: 'og:url', content: 'https://www.port2port.wine/' },
      { property: 'og:image', content: 'https://www.port2port.wine/img/opengraph_default_image2.jpg' },
    ]);
    this.analyticsService.track();

  }

}
