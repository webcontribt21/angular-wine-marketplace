import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { RootState } from 'src/app/@store/reducers/reducers';
import * as storyActions from 'src/app/@store/story/story.actions';
import {
  singleCategoryArticlesSelector,
  isSingleCategoryArticlesSelector,
  singleCategorySortSelector,
  moreCategoryArticlesLoadingSelector
} from 'src/app/@store/story/story.selector';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-story-category',
  templateUrl: './story-category.component.html',
  styleUrls: ['./story-category.component.scss']
})
export class StoryCategoryComponent implements OnInit, OnDestroy {
  category$: Observable<Object> = this.store$.pipe(select(singleCategoryArticlesSelector));
  isCategory$: Observable<boolean> = this.store$.pipe(select(isSingleCategoryArticlesSelector));
  sort$: Observable<object> = this.store$.pipe(select(singleCategorySortSelector));
  isLoadingMore$: Observable<boolean> = this.store$.pipe(select(moreCategoryArticlesLoadingSelector));

  routeSub: Subscription;
  categorySub: Subscription;

  category: object;
  isCategory: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store$: Store<RootState>
  ){
    this.category = {};
  }

  ngOnInit() {
    this.categorySub = this.category$.subscribe(category => {
      this.category = category;
    });

    this.routeSub = this.route.params.subscribe(params => {
      this.store$.dispatch(storyActions.storySingleCategoryChange({ id: params.id }));

      this.category$.pipe(first()).subscribe(category => {
        if (!category || Object.keys(category).length === 0) {
          this.store$.dispatch(storyActions.loadStorySingleCategoryArticles());
        }
      });
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.categorySub.unsubscribe();
  }

  onViewMore() {
    this.store$.dispatch(storyActions.loadStoryMoreCategoryArticles());
  }

  onSort(sort: string) {
    const articleCategoryNo = this.category['articleCategoryNo'];
    this.store$.dispatch(storyActions.sortStorySingleArticles({ sort, articleCategoryNo }));
  }
}
