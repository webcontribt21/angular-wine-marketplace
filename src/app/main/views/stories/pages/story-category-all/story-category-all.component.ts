import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { RootState } from 'src/app/@store/reducers/reducers';
import * as storyActions from 'src/app/@store/story/story.actions';
import {
  allArticlesSelector,
  isLoadingAllArticlesSelector,
  allCategorySortSelector
} from 'src/app/@store/story/story.selector';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-story-category-all',
  templateUrl: './story-category-all.component.html',
  styleUrls: ['./story-category-all.component.scss']
})
export class StoryCategoryAllComponent implements OnInit, OnDestroy {
  allArticleCategories$: Observable<Object[]> = this.store$.pipe(select(allArticlesSelector));
  isAllArticleCategories$: Observable<boolean> = this.store$.pipe(select(isLoadingAllArticlesSelector));
  sort$: Observable<object> = this.store$.pipe(select(allCategorySortSelector));

  constructor(private store$: Store<RootState>) {
  }

  ngOnInit() {
    this.allArticleCategories$.pipe(first()).subscribe(allArticleCategories => {
      if (allArticleCategories.length === 0) {
        this.store$.dispatch(storyActions.loadStoryAllArticles());
      }
    });
  }

  ngOnDestroy() {
  }

  onSort(sort: string) {
    this.store$.dispatch(storyActions.sortStoryAllArticles({ sort }));
  }
}
