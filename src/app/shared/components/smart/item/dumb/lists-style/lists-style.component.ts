import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from '../../../../../interfaces/item.interface';
import { AddItemToCart } from '../../../../../interfaces/cart/add-item-to-cart.interface';
import { WinesIcons } from '../../../../../interfaces/images.interface';

@Component({
  selector: 'app-lists-style',
  templateUrl: './lists-style.component.html',
  styleUrls: ['./lists-style.component.scss']
})
export class ListsStyleComponent implements OnInit {
  @Input() item: Item;
  @Input() isOnlyPopup: boolean = false;
  @Input() isSquareStyle: boolean;
  @Input() isOpenRatingModal: boolean;
  @Input() isShowPriceWrapper: boolean;
  @Input() isAdded: boolean;
  @Input() images: WinesIcons;
  @Input() ratings;

  @Output() addItemToCart$: EventEmitter<AddItemToCart> = new EventEmitter<AddItemToCart>();
  @Output() viewFullDetails$: EventEmitter<any> = new EventEmitter<any>();
  @Output() openRatingModal$: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeRatingModal$: EventEmitter<any> = new EventEmitter<any>();
  @Output() showAvailableVintages$: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  showDetails() {
    this.openRatingModal$.emit();
  }

  closeRatingModal() {
    this.closeRatingModal$.emit();
  }

  addItemToCart(item: AddItemToCart) {
    this.addItemToCart$.emit(item);
  }

  viewFullDetails() {
    this.viewFullDetails$.emit();
  }

  showAvailableVintages() {
    this.showAvailableVintages$.emit();
  }
}
