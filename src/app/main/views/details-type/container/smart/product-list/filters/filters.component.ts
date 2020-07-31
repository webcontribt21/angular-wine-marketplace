import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Filter} from '../../../../../../../shared/interfaces/filter.interface';
import {ProductListIcons} from '../../../../../../../shared/interfaces/images.interface';
import {FILTERS_ICONS} from '../../../../../../../shared/constants';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  @Input() filters: Filter[] = [];
  @Input() priceRangeValues: number[] = null;
  @Input() ratingRangeValues: number[] = null;
  @Input() icons: ProductListIcons;
  @Output() toggleFilter$: EventEmitter<Filter> = new EventEmitter<Filter>();
  @Output() toggleFilterPanel$: EventEmitter<Filter> = new EventEmitter<Filter>();
  @Output() priceRangeValues$: EventEmitter<number[]> = new EventEmitter<number[]>();
  @Output() ratingRangeValues$: EventEmitter<number[]> = new EventEmitter<number[]>();
  @Output() hideFiltersSidebar$: EventEmitter<any> = new EventEmitter<any>();

  close_icon: string = FILTERS_ICONS.CLOSE;

  constructor() { }

  ngOnInit() {
  }

  toggleFilter(filter) {
    this.toggleFilter$.emit(filter);
  }

  toggleFilterPanel(filter) {
    this.toggleFilterPanel$.emit(filter);
  }

  priceRangeValuesChange(values: number[]) {
    this.priceRangeValues$.emit(values);
  }

  ratingRangeValuesChange(values: number[]) {
    this.ratingRangeValues$.emit(values);
  }

  hideFiltersSidebar() {
    this.hideFiltersSidebar$.emit();
  }

  trackFilterByFn(index, item: Filter) {
    return item && item.title;
  }
}
