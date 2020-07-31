import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { RootState } from 'src/app/@store/reducers/reducers';
import * as quickSearchActions from 'src/app/@store/quick-search/quick-search.actions';

import {
  quickSearchPopularContentsSelector,
  isLoadingquickSearchPopularSelector,
  quickSearchQueryContentsSelector,
  isLoadingquickSearchQuerySelector
} from 'src/app/@store/quick-search/quick-search.selector';
import { QuickSearchType } from 'src/app/shared/interfaces/quick-search';

@Component({
  selector: 'app-search-items',
  templateUrl: './search-items.component.html',
  styleUrls: ['./search-items.component.scss']
})
export class SearchItemsComponent implements OnInit {
  popularResults$: Observable<QuickSearchType[]> = this.store$.pipe(select(quickSearchPopularContentsSelector));
  isPopularResults$: Observable<boolean> = this.store$.pipe(select(isLoadingquickSearchPopularSelector));
  queryResults$: Observable<QuickSearchType[]> = this.store$.pipe(select(quickSearchQueryContentsSelector));
  isQueryResults$: Observable<boolean> = this.store$.pipe(select(isLoadingquickSearchQuerySelector));
  @Input() searchItems: any[];
  @Input() isOpenSearchItemsModal: boolean = false;
  @Input() name: string = '';
  @Input() searchText: string = '';
  @Output() toggleSearchItemsModal$: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeSearchItemsModal$: EventEmitter<any> = new EventEmitter<any>();
  searchTextPrev: string = '';

  @Input() search: string;

  constructor(private store$: Store<RootState>) { }

  ngOnInit() {
    console.log('loadQuickSearchPopular');
    this.store$.dispatch(quickSearchActions.loadQuickSearchPopular());
    this.searchTextPrev = this.searchText;
  }

  searchInputFocus() {
    this.isOpenSearchItemsModal = true;
  }

  searchInputLostFocus() {
    setTimeout(function() {
      this.isOpenSearchItemsModal = false;
    }.bind(this), 500);
  }

  searchInputChange() {
    if (this.searchTextPrev === this.searchText) {
        return false;
    }
    this.searchTextPrev = this.searchText;
    if (this.searchText.length === 0) {
      this.store$.dispatch(quickSearchActions.loadQuickSearchPopular());
    } else {
      this.store$.dispatch(quickSearchActions.setQuickSearchQueryTextSelectorValue({ quicksearchQueryText: this.searchText }));
    }
  }

}
