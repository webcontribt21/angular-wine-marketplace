import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FilterData} from '../../../../../../../shared/interfaces/filter.interface';
import {ProductListIcons} from '../../../../../../../shared/interfaces/images.interface';
import { priceRangeFilterDescriptionHelper, ratingRangeFilterDescriptionHelper } from '../rangeFilterDescriptionHelpers';
import { priceRangeFilter, ratingRangeFilter } from 'src/app/shared/constants';

@Component({
  selector: 'app-current-filters',
  templateUrl: './current-filters.component.html',
  styleUrls: ['./current-filters.component.scss'],
})
export class CurrentFiltersComponent implements OnInit {
  @Input() currentFilters: FilterData[] = [];
  @Input() priceRangeValues: number[] = null;
  @Input() ratingRangeValues: number[] = null;
  @Input() icons: ProductListIcons;
  @Output() clearCurrentFilters$: EventEmitter<any> = new EventEmitter<any>();
  @Output() hideFiltersSidebar$: EventEmitter<any> = new EventEmitter<any>();
  @Output() removeCurrentFilters$: EventEmitter<FilterData> = new EventEmitter<FilterData>();
  @Output() removePriceRangeFilter$: EventEmitter<any> = new EventEmitter<any>();
  @Output() removeRatingRangeFilter$: EventEmitter<any> = new EventEmitter<any>();

  priceRangeFilterDescription = priceRangeFilterDescriptionHelper;
  ratingRangeFilterDescription = ratingRangeFilterDescriptionHelper;
  priceRangeFilter = priceRangeFilter;
  ratingRangeFilter = ratingRangeFilter;

  constructor() { }

  ngOnInit() {
  }

  clearCurrentFilters() {
    this.clearCurrentFilters$.emit();
  }

  removeCurrentFilter(filter: FilterData) {
    this.removeCurrentFilters$.emit(filter);
  }

  removePriceRangeFilter() {
    this.removePriceRangeFilter$.emit(null);
  }

  removeRatingRangeFilter() {
    this.removeRatingRangeFilter$.emit(null);
  }

  hideFiltersSidebar() {
    this.hideFiltersSidebar$.emit();
  }
}
