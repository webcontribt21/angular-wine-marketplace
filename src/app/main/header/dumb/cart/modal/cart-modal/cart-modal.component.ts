import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AddItemToCart } from '../../../../../../shared/interfaces/cart/add-item-to-cart.interface';
import { CartSummary, Item, CartItem } from 'src/app/shared/interfaces/cart/cart-summary.interface';
import { ItemDetailType } from 'src/app/shared/enums/itemDetailTypeNo.enum';
import { getItemDetailTypeValue } from 'src/app/checkout/views/checkout-summary/container/checkout-summary.component';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss']
})
export class CartModalComponent implements OnInit {
  @Input() isLoading: boolean;
  @Input() isAuth: boolean;
  @Input() cartSummary: CartSummary;

  @Output() removeItemFromCart = new EventEmitter<{ _id: string, quantity: number }>();

  public itemDetailTypes = ItemDetailType;
  public getItemDetailTypeValue = getItemDetailTypeValue;
  iosDevice: boolean;

  constructor() { }

  ngOnInit() {
    if (navigator.vendor != null && navigator.vendor.match(/Apple Computer, Inc./) && navigator.userAgent.match(/iPhone/i) || (navigator.userAgent.match(/iPod/i))) {
      // alert("Ipod or Iphone");
      this.iosDevice = true;
    } else if (navigator.vendor != null && navigator.vendor.match(/Apple Computer, Inc./) && navigator.userAgent.match(/iPad/i)) {
      // alert("Ipad");
    } else if (navigator.vendor != null && navigator.vendor.match(/Apple Computer, Inc./) && navigator.userAgent.indexOf('Safari') != -1) {
      // alert("Safari");
    } else if (navigator.vendor == null || navigator.vendor != null) {
      // alert("Not Apple Based Browser");
      // this.iosDevice = true;
    }
  }

  getItemImage(item: Item) {
    if (item.itemImages && item.itemImages.length > 0) {
      return item.itemImages[0].imageUrl;
    }
    return 'https://via.placeholder.com/25x92/A3AAAD/A3AAAD';
  }

  removeItemFromCartClick(item: CartItem) {
    this.removeItemFromCart.emit({ _id: item._id, quantity: item.quantity });
  }
}
