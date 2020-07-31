import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { CartItem } from 'src/app/shared/interfaces/cart/cart-summary.interface';

@Component({
  selector: 'app-checkout-summary-qty-selector',
  templateUrl: './summary-qty-selector.component.html',
  styleUrls: ['./summary-qty-selector.component.scss']
})
export class SummaryQtySelectorComponent implements OnInit {
  @Input() cartItem: CartItem;
  @Output() qtySelected: EventEmitter<number> = new EventEmitter<number>();

  public soldOut = false;
  public qtyLimit = 59;

  selectedCount = { name: '1', code: 1 };
  options: { name: string; code: number }[] = [];

  constructor() {}

  ngOnInit() {
    // console.log('item', this.item);
    this.options = this.quantities(this.cartItem.cartItemSoldInQuantitiesOf, this.cartItem.quantity, this.cartItem.stockQty);
    this.selectedCount = { name: this.cartItem.quantity.toString(), code: this.cartItem.quantity };
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

  onQtyChange() {
    this.qtySelected.emit(this.selectedCount.code);
  }
}
