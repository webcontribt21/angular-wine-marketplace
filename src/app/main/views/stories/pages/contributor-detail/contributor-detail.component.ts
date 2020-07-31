import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { RootState } from 'src/app/@store/reducers/reducers';
import * as storyActions from 'src/app/@store/story/story.actions';
import {
  isLoadingSpecialAuthorSelector,
  speicalAuthorSelector
} from 'src/app/@store/story/story.selector';
import { ActivatedRoute } from '@angular/router';
import { Sort } from 'src/app/shared/interfaces/sortBy';
import { timeSortList } from 'src/app/shared/constants/sort-list';
import { Author } from 'src/app/shared/interfaces/author.interface';

@Component({
  selector: 'app-contributor-detail',
  templateUrl: './contributor-detail.component.html',
  styleUrls: ['./contributor-detail.component.scss']
})
export class ContributorDetailComponent implements OnInit, OnDestroy {
  author$: Observable<Author> = this.store$.pipe(select(speicalAuthorSelector));
  isAuthor$: Observable<boolean> = this.store$.pipe(select(isLoadingSpecialAuthorSelector));

  routeSub: Subscription;
  sortList: Sort[];
  sortModel: Sort;

  constructor(
    private store$: Store<RootState>,
    private route: ActivatedRoute
  ) {
    this.sortList = [
      { label: 'Sort by: Lastest', value: timeSortList[0] },
      { label: 'Sort by: Oldest', value: timeSortList[1] }
    ];
    this.sortModel = { label: '', value: '' };
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.store$.dispatch(storyActions.loadStorySpecialAuthor({ id: params.id }));
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  onSortBy(event: object) {
    const sort = event['value'];
    this.store$.dispatch(storyActions.sortStorySpecialArticle({ sort }));
  }

}
