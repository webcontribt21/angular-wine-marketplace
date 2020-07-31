import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from '../../../../../../../shared/interfaces/item.interface';
import { SortBy, Sort } from '../../../../../../../shared/interfaces/sortBy';
import { AddItemToCart } from '../../../../../../../shared/interfaces/cart/add-item-to-cart.interface';
import { FilterData } from 'src/app/shared/interfaces/filter.interface';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {
  @Input() isOnlyPopup: boolean = false;
  @Input() items: Item[] = [];
  @Input() rangeValues: number[];
  @Input() totalResults: number = 0;
  @Input() showUnavailableWines: boolean = false;
  @Input() currentFilters: FilterData[];
  @Output() addItemToCart$: EventEmitter<AddItemToCart> = new EventEmitter<AddItemToCart>();
  @Output() showFiltersSidebar$: EventEmitter<any> = new EventEmitter<any>();
  @Output() showUnavailableWines$: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() selectSortRule$: EventEmitter<Sort> = new EventEmitter<Sort>();

  isOpenRatingModal: boolean = false;
  isSquareStyle: boolean = true;
  selectRule: Sort;

  constructor() {}

  ngOnInit() {
  }

  selectSortRule(event: Sort) {
    this.selectRule = event;
    this.selectSortRule$.emit(event);
  }

  toggleStyle() {
    this.isSquareStyle = !this.isSquareStyle;
  }

  addItemToCart(itemDataToCart: AddItemToCart) {
    this.addItemToCart$.emit(itemDataToCart);
  }

  toggleOpenRating(event: boolean) {
    this.isOpenRatingModal = event;
  }

  showFiltersSidebar() {
    this.showFiltersSidebar$.emit();
  }

  toggleViewUnavailableWines(isShowUnavailable: boolean) {
    this.showUnavailableWines$.emit(null);
  }

  showAvailableVintages() {
  }

  trackFilterItemByFn(index, item: Item) {
    return item && item._id;
  }
}
