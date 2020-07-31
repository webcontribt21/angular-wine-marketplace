import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RootState } from '../../../../@store/reducers/reducers';
import { SelectItem } from 'primeng/components/common/selectitem';

import { CartSummary, ItemDetail, Item, CartItem } from 'src/app/shared/interfaces/cart/cart-summary.interface';
import * as cartActions from '../../../../@store/cart/cart.actions';
import * as checkoutActions from '../../../../@store/checkout/checkout.actions';
import {
  cartSummarySelector,
  isLoadingApplyVoucherSelector,
  voucherErrorSelector,
  successUpdateVoucherDataSelector,
  isLoadingCartSelector
} from '../../../../@store/cart/cart.selector';
import { ItemDetailType } from 'src/app/shared/enums/itemDetailTypeNo.enum';
import { isGiftSelector, deliveryAddressSelector } from 'src/app/@store/checkout/checkout.selector';
import { UserAddress } from 'src/app/user/common/interfaces';
import { Router } from '@angular/router';

interface Quantity {
  name: string;
  code: string;
}

@Component({
  selector: 'app-checkout-summary',
  templateUrl: './checkout-summary.component.html',
  styleUrls: ['./checkout-summary.component.scss']
})
export class CheckoutSummaryComponent implements OnInit {
  cartSummary$: Observable<CartSummary> = this.store$.pipe(select(cartSummarySelector));
  isLoadingCartSummary$: Observable<boolean> = this.store$.pipe(select(isLoadingCartSelector));
  checkoutDeliveryAddress$: Observable<UserAddress> = this.store$.pipe(select(deliveryAddressSelector));
  isGift$: Observable<boolean> = this.store$.pipe(select(isGiftSelector));
  isLoadingApplyVoucher$: Observable<boolean> = this.store$.pipe(select(isLoadingApplyVoucherSelector));
  voucherError$: Observable<string> = this.store$.pipe(select(voucherErrorSelector));
  voucherSuccessData$: Observable<any> = this.store$.pipe(select(successUpdateVoucherDataSelector));

  public itemDetailTypes = ItemDetailType;
  public getItemDetailTypeValue = getItemDetailTypeValue;

  // quantities: SelectItem[];
  // selectedQuantity: Quantity;
  public qtyLimit = 59;

  constructor(private store$: Store<RootState>, private router: Router) {}

  ngOnInit() {
    this.store$.dispatch(cartActions.loadSummary());

    this.store$.dispatch(checkoutActions.clearOrder());
    this.store$.dispatch(checkoutActions.clearNewCardDetails());

    this.voucherSuccessData$.subscribe(data => {
      if (data) {
        this.store$.dispatch(cartActions.loadSummary());
      }
    });
  }

  getItemImage(item: Item): string {
    if (item.itemImages && item.itemImages.length > 0) {
      return item.itemImages[0].imageUrl;
    }
    return 'https://via.placeholder.com/25x92/A3AAAD/A3AAAD';
  }

  setIsGift(isGift: boolean) {
    // tslint:disable-next-line: deprecation
    event.preventDefault();
    console.log('isGift', isGift);
    this.store$.dispatch(checkoutActions.setIsGift({ isGift }));
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
    console.log('quantities', quantities);
    return quantities;
  }

  onRemoveCartItemClick(item) {
    this.store$.dispatch(cartActions.removeItemFromCart(item));
  }

  onSetCartItemQuantity(cartItem: CartItem, quantity: number) {
    this.store$.dispatch(cartActions.setQuantity({ _id: cartItem._id, quantity }));
  }

  onContinueClick() {
    this.router.navigate(['checkout', 'shipping']);
  }

  onApplyVoucher(voucherCode: string) {
    this.store$.dispatch(cartActions.applyVoucherRequest({ voucherCode }));
  }
}

export function getItemDetailTypeValue(itemDetails: ItemDetail[], itemDetailType: ItemDetailType) {
  const item = (itemDetails || []).find(f => f.type && f.type.itemDetailTypeNo === itemDetailType);
  return item && item.valueFromType && item.valueFromType.description;
}
