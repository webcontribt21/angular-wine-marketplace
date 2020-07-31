import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { RootState } from 'src/app/@store/reducers/reducers';
import * as storyActions from 'src/app/@store/story/story.actions';
import {
  singleArticleSelector,
  isSingleArticleSelector
} from 'src/app/@store/story/story.selector';
import {
  relatedWineItemsSelector,
  isLoadingRelatedWinesSelector,
  loadRelatedWines
} from 'src/app/@store/story-single';
import { loadRelatedStories } from 'src/app/@store/story-single/story-single.actions';
import { isLoadingRelatedArticlesSelector, relatedArticlesSelector } from 'src/app/@store/story-single/story-single.selector';
import { Article } from 'src/app/shared/interfaces/article.interface';

@Component({
  selector: 'app-story-article',
  templateUrl: './story-article.component.html',
  styleUrls: ['./story-article.component.scss']
})
export class StoryArticleComponent implements OnInit {
  article$: Observable<any> = this.store$.pipe(select(singleArticleSelector));
  isArticle$: Observable<boolean> = this.store$.pipe(select(isSingleArticleSelector));

  relatedWines$: Observable<any> = this.store$.pipe(select(relatedWineItemsSelector));
  isRelatedWines$: Observable<any> = this.store$.pipe(select(isLoadingRelatedWinesSelector));

  relatedArticles$: Observable<Article[]> = this.store$.pipe(select(relatedArticlesSelector));
  isRelatedArticles$: Observable<boolean> = this.store$.pipe(select(isLoadingRelatedArticlesSelector));
  breadscrumbs: any[];

  constructor(
    private route: ActivatedRoute,
    private store$: Store<RootState>
  ) {
    this.breadscrumbs = [];
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.store$.dispatch(storyActions.loadStorySingleArticle(params));
      this.store$.dispatch(loadRelatedWines({ articleId: params.id }));
      this.store$.dispatch(loadRelatedStories({ articleId: params.id }));
    });

    this.article$.subscribe(article => {
      this.generateBreadscrumbs(article);
    });
  }

  generateBreadscrumbs(article: Object) {
    this.breadscrumbs = [
      {
        label: 'Home',
        link: '/stories/home'
      },
      {
        label: 'All Categories',
        link: '/stories/all'
      }
    ];

    if (article['articleCategory'] && article['articleCategoryNo']) {
      this.breadscrumbs.push({
        label: article['articleCategory']['description'],
        link: `/stories/category/${article['articleCategoryNo']}`
      });
    }

    if (article['_id'] && article['brand']) {
      this.breadscrumbs.push({
        label: article['brand']['name'],
        link: `/stories/article/${article['_id']}`
      });
    }

    if (article['_id'] && article['title']) {
      this.breadscrumbs.push({
        label: article['title'],
        link: `/stories/article/${article['_id']}`
      });
    }
  }

}
