import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from '../../../../../interfaces/item.interface';
import {AddItemToCart} from '../../../../../interfaces/cart/add-item-to-cart.interface';
import {WinesIcons} from '../../../../../interfaces/images.interface';
import { ItemDetailType } from 'src/app/shared/enums/itemDetailTypeNo.enum';

@Component({
  selector: 'app-cards-style',
  templateUrl: './cards-style.component.html',
  styleUrls: ['./cards-style.component.scss']
})
export class CardsStyleComponent implements OnInit {
  @Input() item: Item;
  @Input() isOnlyPopup: boolean = false;
  @Input() isSquareStyle: boolean;
  @Input() isShowPriceWrapper: boolean;
  @Input() isAdded: boolean;
  @Input() images: WinesIcons;
  @Input() ratings;

  @Output() addItemToCart$: EventEmitter<AddItemToCart> = new EventEmitter<AddItemToCart>();
  @Output() showPriceWrapper$: EventEmitter<any> = new EventEmitter<any>();
  @Output() hidePriceWrapper$: EventEmitter<any> = new EventEmitter<any>();
  @Output() viewFullDetails$: EventEmitter<any> = new EventEmitter<any>();
  @Output() showAvailableVintages$: EventEmitter<any> = new EventEmitter<any>();


  constructor() { }

  ngOnInit() { }

  showPriceWrapper() {
    this.showPriceWrapper$.emit();
  }

  hidePriceWrapper() {
    this.hidePriceWrapper$.emit();
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
