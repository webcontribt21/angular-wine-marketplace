import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationStart, Event } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { RootState } from 'src/app/@store/reducers/reducers';
import {
  latestStorySelector,
  isLoadingLatestStorySelector,
  featuredArticlesSelector,
  isLoadingFeaturedArticlesSelector,
  mostPopularArticlesSelector,
  isLoadingMostPopularArticlesSelector,
  topContributorsSelector,
  isLoadingTopContributorsSelector,
  videoStoriesSelector,
  isLoadingVideoStoriesSelector,
} from 'src/app/@store/story-home/story-home.selector';
import { Article } from 'src/app/shared/interfaces/article.interface';
import * as actions from 'src/app/@store/story-home/story-home.actions';
import { Author } from 'src/app/shared/interfaces/author.interface';

@Component({
  selector: 'app-story-home',
  templateUrl: './story-home.component.html',
  styleUrls: ['./story-home.component.scss']
})
export class StoryHomeComponent implements OnInit {
  @ViewChild('storyMenuEle', { static: false }) storyMenuEle: ElementRef;
  @ViewChild('containerEle', { static: false }) containerEle: ElementRef;
  @ViewChild('menuContentsEle', { static: false }) menuContentsEle: ElementRef;

  // latest story
  latestArticle$: Observable<Article> = this.store$.pipe(select(latestStorySelector));
  isLatestArticle$: Observable<boolean> = this.store$.pipe(select(isLoadingLatestStorySelector));

  // featured stories
  featuredStories$: Observable<Article[]> = this.store$.pipe(select(featuredArticlesSelector));
  isFeaturedStories$: Observable<boolean> = this.store$.pipe(select(isLoadingFeaturedArticlesSelector));

  // most popular stories
  mostPopularStories$: Observable<Article[]> = this.store$.pipe(select(mostPopularArticlesSelector));
  isMostPopularStories$: Observable<boolean> = this.store$.pipe(select(isLoadingMostPopularArticlesSelector));

  // top contributors
  topContributors$: Observable<Author[]> = this.store$.pipe(select(topContributorsSelector));
  isTopContributors$: Observable<boolean> = this.store$.pipe(select(isLoadingTopContributorsSelector));

  // video stories
  videoStories$: Observable<Article[]> = this.store$.pipe(select(videoStoriesSelector));
  isVideoStories$: Observable<boolean> = this.store$.pipe(select(isLoadingVideoStoriesSelector));

  targetContentLink: string;
  articleStyles: object;
  isTopStoryMenu: boolean;
  storyMenuTop: number;

  constructor(
    private router: Router,
    private store$: Store<RootState>
  ) {
    this.articleStyles = {
      categoryFont: '14px',
      padding: '43px 0 0',
      titleFont: '50px'
    };

    this.targetContentLink = '';
    this.isTopStoryMenu = false;
    this.storyMenuTop = 0;

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.getContentHash();
      }
    });
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.getContentHash();

    this.store$.dispatch(actions.loadLatestStory());
    this.store$.dispatch(actions.loadFeaturedStories());
    this.store$.dispatch(actions.loadMostPopularStories());
    this.store$.dispatch(actions.loadTopContributors());
    this.store$.dispatch(actions.loadVideoStories());
  }

  getContentHash() {
    this.targetContentLink = window.location.hash ? window.location.hash.substr(1) : 'featured-stories';
  }

  onScroll(event: any) {
    const scrollTop = event.srcElement.documentElement.scrollTop || event.srcElement.body.scrollTop;
    const containerEleTop = this.containerEle.nativeElement.offsetTop;
    const storyMenuEleHight = this.storyMenuEle.nativeElement.offsetHeight;
    const menuContentsEleTop = this.menuContentsEle.nativeElement.offsetTop;
    this.storyMenuTop = containerEleTop;
    
    if (menuContentsEleTop <= (scrollTop + containerEleTop + storyMenuEleHight)) {
      this.isTopStoryMenu = true;
    } else {
      this.isTopStoryMenu = false;
    }
  }

}
