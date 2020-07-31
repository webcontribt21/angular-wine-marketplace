import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import * as storyActions from 'src/app/@store/story/story.actions';
import { RootState } from 'src/app/@store/reducers/reducers';
import {
  isLoadingAllAuthorsSelector,
  allAuthorsSelector,
  contributorsSortSelector
} from 'src/app/@store/story/story.selector';
import { Author } from 'src/app/shared/interfaces/author.interface';

@Component({
  selector: 'app-story-contributor',
  templateUrl: './story-contributor.component.html',
  styleUrls: ['./story-contributor.component.scss']
})
export class StoryContributorComponent implements OnInit {
  allAuthors$: Observable<Author[]> = this.store$.pipe(select(allAuthorsSelector));
  isAllAuthors$: Observable<boolean> = this.store$.pipe(select(isLoadingAllAuthorsSelector));
  sort$: Observable<object> = this.store$.pipe(select(contributorsSortSelector));

  constructor(private store$: Store<RootState>) { }

  ngOnInit() {
    this.allAuthors$.pipe(first()).subscribe(authors => {
      if (authors.length === 0) {
        this.store$.dispatch(storyActions.loadStoryAllContributors());
      }
    });
  }

  onSort(sort: string) {
    this.store$.dispatch(storyActions.loadStoryAllContributors({ sort }));
  }

}
