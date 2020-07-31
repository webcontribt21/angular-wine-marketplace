import { Component, OnInit, OnDestroy } from '@angular/core';
import { RootState } from '../../../../../../@store/reducers/reducers';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { isLoadingDataSelector } from '../../../../../../@store/data/isLoadingDataSelector';
import { Item } from '../../../../../../shared/interfaces/item.interface';
import { itemsSelector } from '../../../../../../@store/items/items.selector';
import { Filter, FilterData } from '../../../../../../shared/interfaces/filter.interface';
import {
  customFiltersSelector,
  filtersSelector,
  showUnavailableWinesSelector,
  priceRangeValuesSelector,
  ratingRangeValuesSelector
} from '../../../../../../@store/filters/filter.selector';
import { PRODUCT_LIST } from '../../../../../../shared/constants';
import { AddItemToCart } from '../../../../../../shared/interfaces/cart/add-item-to-cart.interface';
import { Page } from '../../../../../../shared/interfaces/page.interface';
import { paginationSelector } from '../../../../../../@store/pagination/pagination.selector';
import { ProductListIcons } from '../../../../../../shared/interfaces/images.interface';
import { GRAPHQL_CONFIG } from '../../../../../../../config';

import * as itemActions from '../../../../../../@store/items/items.actions';
import * as filterActions from '../../../../../../@store/filters/filter.actions';
import * as cartActions from '../../../../../../@store/cart/cart.actions';
import { AnalyticsService } from '../../../../../../shared/services/analytics.service';
import { SeoService } from '../../../../../../shared/services/seo.service';
import { Router, NavigationEnd } from '@angular/router';
import { isLoadedVendorFiltersSelector } from 'src/app/@store/data';
import { Sort } from 'src/app/shared/interfaces/sortBy';
import { ProductDescription } from 'src/app/shared/interfaces/product.interface';
import { PRODUCT_LABEL_LIST } from 'src/app/shared/constants/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  isLoadData$: Observable<boolean> = this.store$.pipe(select(isLoadingDataSelector));
  items$: Observable<Item[]> = this.store$.pipe(select(itemsSelector));
  filters$: Observable<Filter[]> = this.store$.pipe(select(filtersSelector));
  showUnavailableWines$: Observable<boolean> = this.store$.pipe(select(showUnavailableWinesSelector));
  currentFilters$: Observable<FilterData[]> = this.store$.pipe(select(customFiltersSelector));
  priceRangeValues$: Observable<number[]> = this.store$.pipe(select(priceRangeValuesSelector));
  ratingRangeValues$: Observable<number[]> = this.store$.pipe(select(ratingRangeValuesSelector));
  isLoadedVendorFiltersSelector$: Observable<boolean> = this.store$.pipe(select(isLoadedVendorFiltersSelector));
  pagination$: Observable<Page> = this.store$.pipe(select(paginationSelector));
  icons: ProductListIcons = PRODUCT_LIST;
  isHide: boolean = true;
  isShowFiltersSidebar: boolean = false;
  isMobileLayout = false;
  navigationSubscription;
  itemsSortValue: string;
  productDescription: ProductDescription;

  filters: Filter[];

  constructor(
    private store$: Store<RootState>,
    private analyticsService: AnalyticsService,
    private seoService: SeoService,
    public breakpointObserver: BreakpointObserver,
    private router: Router
  ) {
    this.itemsSortValue = '';
    this.productDescription = {
      title: '',
      subtitle: '',
      description: ''
    };
    this.filters = [];

    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit() {
    this.setDescription();

    this.seoService.set('Buy Wine Online | Port2Port Online Wine Store', [
      { name: 'keywords', content: 'port2port,store,wine' },
      {
        name: 'description',
        content: `Browse our large selection from Port2Port today - Purveyors of Fine Wine.
          Shop for the most celebrated wineries, iconic vintages and specially selected wine.`
      },
      { property: 'og:title', content: 'Buy Wine Online | Port2Port Online Wine Store' },
      {
        property: 'og:description',
        content: `Browse our large selection from Port2Port today - Purveyors of Fine Wine.
          Shop for the most celebrated wineries, iconic vintages and specially selected wine.`
      },
      { property: 'og:url', content: 'https://www.port2port.wine/wines' },
      { property: 'og:image', content: 'https://www.port2port.wine/img/opengraph_default_image2.jpg' },
    ]);
    this.analyticsService.track();

    this.breakpointObserver
      .observe([
        Breakpoints.Small,
        // Breakpoints.Tablet,
        // Breakpoints.TabletLandscape,
        // Breakpoints.TabletPortrait
        // Breakpoints.Handset,
        Breakpoints.HandsetLandscape,
        Breakpoints.HandsetPortrait
      ])
      .subscribe((state: BreakpointState) => {
        // console.log(state);
        if (state.matches) {
          // console.log('Matches small viewport or handset in portrait mode');
          this.isMobileLayout = true;
        } else {
          this.isMobileLayout = false;
        }

        // console.log('isMobileLayout && selectedItem !== null', this.isMobileLayout, this.selectedItem !== null);
      });

    this.isLoadedVendorFiltersSelector$.subscribe(loaded => {
      if (loaded) {
        this.store$.dispatch(itemActions.loadItemsWithLoadPage({ nextPage: GRAPHQL_CONFIG.startPageForSearchItems }));
      }
    });

    this.store$.dispatch(itemActions.loadItemsWithLoadPage({
      nextPage: GRAPHQL_CONFIG.startPageForSearchItems
    }));

    this.filters$.subscribe(filters => {
      this.filters = filters;
    });
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  setDescription() {
    const paths = this.router.url.split('/');
    this.productDescription = PRODUCT_LABEL_LIST['default'];

    if (paths[2]) {
      const key = paths[2].replace('-', '_');
      this.setDefaultFilters(key);

      if (PRODUCT_LABEL_LIST[key]) {
        this.productDescription = PRODUCT_LABEL_LIST[key];
      }
    } else if (paths.length === 2) {
      this.productDescription = PRODUCT_LABEL_LIST['all_wines'];
    }
  }

  setDefaultFilters(filterPage: string) {
    this.store$.dispatch(filterActions.clearWineListSortValue());

    switch (filterPage) {
      case 'large_formats':
        const ind = this.filters.findIndex(filter => filter.typeNo === 10);
        const targetDescriptions = [
          '1.5 L (Magnum)',
          '9.0 L (Salmanazar)',
          '6.0 L (Imperial)',
          '3.0 L (Double Magnum)'
        ];

        if (ind !== -1) {
          const targetFilters = this.filters[ind].data
            .filter(filter => targetDescriptions.indexOf(filter.description) !== -1);

          for (const filter of targetFilters) {
            this.store$.dispatch(filterActions.toggleCurrentFilter({ filter }));
          }
        }
        break;

      case 'top_rated':
        this.store$.dispatch(filterActions.setRatingRangeValues({
          ratingRangeValues: [90, 100],
          isUpdatePath: true,
          sort: '-value_2'
        }));
        break;

      case 'recently_released':
        this.store$.dispatch(filterActions.setWineListSortValue({
          sort: '-date_created',
          nextPage: GRAPHQL_CONFIG.startPageForSearchItems
        }));
        break;
    }
  }

  toggleText() {
    this.isHide = !this.isHide;
  }

  onPageChange($event) {
    this.store$.dispatch(itemActions.loadItemsWithLoadPage({
      nextPage: $event.page + 1
    }));
    window.scroll(0, this.isMobileLayout ? 420 : 460);
  }

  toggleFilter(filter: Filter): void {
    this.store$.dispatch(filterActions.toggleCurrentFilter({ filter }));
  }

  toggleFilterPanel(filter: Filter) {
    this.store$.dispatch(filterActions.togglePanelOpen({ filter }));
  }

  clearCurrentFilters() {
    this.store$.dispatch(filterActions.clearCurrentFilters());
    this.hideFiltersSidebar();
  }

  removeCurrentFilter(filter: FilterData) {
    this.store$.dispatch(filterActions.toggleCurrentFilter({ filter }));
  }

  removePriceRangeFilter() {
    this.store$.dispatch(filterActions.clearPriceRangeValues());
  }

  removeRatingRangeFilter() {
    this.store$.dispatch(filterActions.clearRatingRangeValues());
  }

  addItemToCart(itemDataToCart: AddItemToCart): void {
    this.store$.dispatch(cartActions.addItemToCart({ itemDataToCart }));
  }

  showFiltersSidebar() {
    this.isShowFiltersSidebar = true;
  }

  hideFiltersSidebar() {
    this.isShowFiltersSidebar = false;
  }

  priceRangeFilterValues(values: number[]) {
    // debounce
    this.store$.dispatch(filterActions.setPriceRangeValues({ priceRangeValues: values }));
  }

  ratingRangeFilterValues(values: number[]) {
    // debounce
    this.store$.dispatch(filterActions.setRatingRangeValues({ ratingRangeValues: values }));
  }

  toggleViewUnavailableWines() {
    this.store$.dispatch(filterActions.toggleShowUnavailableWines());
  }

  selectSortRule(event: Sort) {
    this.itemsSortValue = event.value;
    this.store$.dispatch(filterActions.setWineListSortValue({
      sort: this.itemsSortValue,
      nextPage: GRAPHQL_CONFIG.startPageForSearchItems
    }));
  }
}
