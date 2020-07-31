import { Action, createReducer, on } from '@ngrx/store';
import { Filter, FilterData } from '../../shared/interfaces/filter.interface';

import * as filtersActions from './filter.actions';
import { priceRangeFilter, ratingRangeFilter } from 'src/app/shared/constants';

export interface FilterState {
  filters: Filter[];
  compositeFilters: { description: string, routeKey: string, customFilters: FilterData[] }[];
  customFilters: FilterData[];
  showUnavailableWines: boolean;
  priceRangeValues: number[];
  ratingRangeValues: number[];
  sortValue: string;
}

const initialState: FilterState = {
  filters: [],
  compositeFilters: [
    {
      description: 'Top Rated',
      routeKey: 'top-rated',
      customFilters: []
    },
    {
      description: 'Large Formats',
      routeKey: 'large-formats',
      customFilters: [
        // EXAMPLE
        // {
        //   description: '3L',
        //   parent: 'Bottle Size',
        //   count: 0,
        //   parentTypeNo: 10
        // }
      ]
    },
    {
      description: 'Recently Released',
      routeKey: 'recently-released',
      customFilters: []
    },
    {
      description: 'Tim Atkin',
      routeKey: 'tim-atkin-2019',
      customFilters: []
    },
    {
      description: 'Platter\'s Guide',
      routeKey: 'platters-guide-2020',
      customFilters: []
    }
  ],
  customFilters: [],
  showUnavailableWines: false,
  priceRangeValues: null,
  ratingRangeValues: null,
  sortValue: ''
};

const filterReducer = createReducer(
  initialState,
  on(filtersActions.loadFiltersSuccess, (state, { filters }) => {
    return {
      ...state,
      filters: [...filters]
    };
  }),
  on(filtersActions.addRouteCustomFilters, (state, {
    customFilters,
    priceRangeValues,
    ratingRangeValues,
    showUnavailableWines
  }) => {
    return {
      ...state,
      customFilters: [...customFilters],
      priceRangeValues,
      ratingRangeValues,
      showUnavailableWines
    };
  }),
  on(filtersActions.addCustomFilter, (state, { customFilter }) => {
    return {
      ...state,
      customFilters: [...state.customFilters, customFilter]
    };
  }),
  on(filtersActions.removeCustomFilter, (state, { customFilter }) => {
    return {
      ...state,
      customFilters: [...state.customFilters.filter((filer: FilterData) => filer.description !== customFilter.description)]
    };
  }),
  on(filtersActions.togglePanelOpen, (state, { filter }) => {
    const filters = state.filters.map(m => {
      if (m.title === filter.title) {
        return {
          ...m,
          isPanelOpen: !m.isPanelOpen
        }
      }
      return m;
    });
    return {
      ...state,
      filters
    };
  }),
  on(filtersActions.clearCurrentFilters, state => {
    return {
      ...state,
      customFilters: [],
      priceRangeValues: null,
      ratingRangeValues: null
    };
  }),
  on(filtersActions.toggleShowUnavailableWines, (state) => {
    return {
      ...state,
      showUnavailableWines: !state.showUnavailableWines
    };
  }),
  on(filtersActions.setPriceRangeValues, (state, { priceRangeValues }) => {
    return {
      ...state,
      priceRangeValues: (priceRangeValues && [...priceRangeValues]) || null
    };
  }),
  on(filtersActions.clearPriceRangeValues, state => {
    return {
      ...state,
      priceRangeValues: null
    };
  }),
  on(filtersActions.setRatingRangeValues, (state, { ratingRangeValues, sort: sortValue }) => {
    return {
      ...state,
      sortValue,
      ratingRangeValues: (ratingRangeValues && [...ratingRangeValues]) || null
    };
  }),
  on(filtersActions.clearRatingRangeValues, state => {
    return {
      ...state,
      ratingRangeValues: null
    };
  }),
  on(filtersActions.updateFiltersCountsSuccess, (state: FilterState) => {
    // update filter counts
    const customFilters = [...state.customFilters];
    return {
      ...state,
      customFilters
    };
  }),
  on(filtersActions.setWineListSortValue, (state, { sort: sortValue }) => {
    return {
      ...state,
      sortValue
    };
  }),
  on(filtersActions.clearWineListSortValue, (state) => {
    return {
      ...state,
      sortValue: ''
    };
  })
);

export function reducer(state: FilterState | undefined, action: Action) {
  return filterReducer(state, action);
}
