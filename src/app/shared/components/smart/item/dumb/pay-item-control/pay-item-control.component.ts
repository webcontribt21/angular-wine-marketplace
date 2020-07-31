import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from '../../../../../interfaces/item.interface';
import { AddItemToCart } from '../../../../../interfaces/cart/add-item-to-cart.interface';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-pay-item-control',
  templateUrl: './pay-item-control.component.html',
  styleUrls: ['./pay-item-control.component.scss']
})
export class PayItemControlComponent implements OnInit {
  @Input() item: Item;
  @Input() isShowPriceWrapper: boolean = false;
  @Input() isAdded: boolean = false;
  @Input() isSquareStyle: boolean;
  @Output() addItemToCart$: EventEmitter<AddItemToCart> = new EventEmitter<AddItemToCart>();
  @Output() showAvailableVintages$: EventEmitter<any> = new EventEmitter<any>();

  public soldOut = false;
  public qtyLimit = 59;

  selectedCount = { name: '1', code: 1 };
  counts: { name: string; code: number }[] = [];

  constructor() {}

  ngOnInit() {
    // console.log('item', this.item);
    this.counts = this.quantities(this.item.supplier.soldInMultiplesOf, this.item.supplier.soldInMultiplesOf, this.item.supplier.stockQty);
    this.selectedCount = this.counts && this.counts[0];
  }

  quantities(multiples?: number, currentQty?: number, stockQty?: number): { name: string; code: number }[] {
    const quantities: { name: string; code: number }[] = [];
    const availableQty = stockQty ? (stockQty > this.qtyLimit ? this.qtyLimit : stockQty) : this.qtyLimit;
    multiples = multiples || 1;
    let counter: number = multiples;
    while (counter <= availableQty) {
      quantities.push({ name: counter.toString(), code: counter });
      counter += multiples;
    }

    const currenntItem = quantities.find(f => f.code === currentQty);
    if (!currenntItem) {
      quantities.unshift({ name: currentQty.toString(), code: currentQty });
    }
    return quantities;
  }

  addToCart(item: Item) {
    this.isAdded = !this.isAdded;
    const itemDataToCart: AddItemToCart = {
      itemId: item._id,
      itemSupplierId: item.suppliers[0]._id,
      quantity: this.selectedCount.code
    };
    this.addItemToCart$.emit(itemDataToCart);
  }

  showAvailableVintages() {
    this.showAvailableVintages$.emit();
  }
}
