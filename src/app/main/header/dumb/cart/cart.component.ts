import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CartIcons } from '../../../../shared/interfaces/images.interface';
import { ItemInCart } from '../../../../shared/interfaces/cart/add-item-to-cart.interface';
import { CartSummary } from 'src/app/shared/interfaces/cart/cart-summary.interface';
import { cartSummarySelector } from 'src/app/@store/cart/cart.selector';
import { count } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  @Input() cartSummary: CartSummary;
  @Input() cartQuantity: number;
  @Input() isLoading: boolean = false;
  @Input() isAuth: boolean = false;
  @Input() images: CartIcons;
  @Input() isOpenCartModal: boolean = false;
  @Input() name: string = '';
  @Output() toggleCartModal$: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() closeCartModal$: EventEmitter<any> = new EventEmitter<any>();
  @Output() removeItemFromCart = new EventEmitter<{ _id: string, quantity: number }>();

  constructor() {}

  ngOnInit() {}

  toggleCartMenu() {
    // this.toggleCartModal$.emit();
    this.isOpenCartModal = !this.isOpenCartModal;
    this.toggleCartModal$.emit(this.isOpenCartModal);
  }

  // cartItemCount() {
  //   return (
  //     (this.cartSummary &&
  //       this.cartSummary.shipments &&
  //       this.cartSummary.shipments.length &&
  //       this.cartSummary.shipments
  //         .map(m => m.cartItems.map(c => c.quantity || 0).reduce((total, value) => (total += value)))
  //         .reduce((total, value) => (total += value))) ||
  //     0
  //   );
  // }

  ngOnDestroy(): void {
    this.closeCartModal$.emit();
  }

  modalRemoveItemFromCart(item) {
    this.removeItemFromCart.emit(item);
  }
}
