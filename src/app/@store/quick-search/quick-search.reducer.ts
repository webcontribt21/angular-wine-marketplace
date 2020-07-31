import { Action, createReducer, on } from '@ngrx/store';

import * as quickSearchActions from './quick-search.actions';
import {
  QuickSearchType
} from 'src/app/shared/interfaces/quick-search';

export interface QuickSearchState {
  quickSearchPopularContents: QuickSearchType[];
  isLoadingQuickSearchPopularContents: boolean;
  quickSearchQueryContents: QuickSearchType[];
  isLoadingQuickSearchQueryContents: boolean;
  quicksearchQueryText: string;
}

const initialState: QuickSearchState = {
  quickSearchPopularContents: [],
  isLoadingQuickSearchPopularContents: false,
  quickSearchQueryContents: [],
  isLoadingQuickSearchQueryContents: false,
  quicksearchQueryText: ''
};

const quickSearchReducer = createReducer(
  initialState,
  on(quickSearchActions.loadQuickSearchPopular, (state) => {
    return {
      ...state,
      isLoadingQuickSearchPopularContents: true
    };
  }),
  on(quickSearchActions.loadQuickSearchPopularSuccess, (state, { contents }) => {
    const updatedContents = contents;
    // contents.map(content => (content.SearchItems && content.SearchItems.Items[0]) ? content.SearchItems : {});

    return {
      ...state,
      quickSearchPopularContents: updatedContents,
      isLoadingQuickSearchPopularContents: false
    };
  }),
  on(quickSearchActions.loadQuickSearchQuery, (state) => {
    return {
      ...state,
      isLoadingQuickSearchQueryContents: true
    };
  }),
  on(quickSearchActions.loadQuickSearchQuerySuccess, (state, { contents }) => {
    const updatedContents = contents;

    return {
      ...state,
      quickSearchQueryContents: updatedContents,
      isLoadingQuickSearchQueryContents: false
    };
  }),
  on(quickSearchActions.setQuickSearchQueryTextSelectorValue, (state, { quicksearchQueryText }) => {
    return {
      ...state,
      quicksearchQueryText
    };
  })
);

export function reducer(state: QuickSearchState | undefined, action: Action) {
  return quickSearchReducer(state, action);
}
