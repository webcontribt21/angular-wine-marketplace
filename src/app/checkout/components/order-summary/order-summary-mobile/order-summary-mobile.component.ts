import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CartSummary } from 'src/app/shared/interfaces/cart/cart-summary.interface';
import { UserAddress } from 'src/app/user/common/interfaces';
import { ItemDetailType } from 'src/app/shared/enums/itemDetailTypeNo.enum';
import { getItemDetailTypeValue } from 'src/app/checkout/views/checkout-summary/container/checkout-summary.component';

@Component({
  selector: 'app-checkout-order-summary-mobile',
  templateUrl: './order-summary-mobile.component.html',
  styleUrls: ['./order-summary-mobile.component.scss']
})
export class CheckoutOrderSummaryMobileComponent implements OnInit {
  @Input() cartSummary: CartSummary;
  @Input() deliveryAddress: UserAddress;
  @Input() isComplete = false;
  @Input() continueLabel: string;
  @Input() canContinue: boolean;
  @Input() isProcessingOrder: boolean = false;
  @Output() continue = new EventEmitter();

  public itemDetailTypes = ItemDetailType;
  public getItemDetailTypeValue = getItemDetailTypeValue;
  display = false;

  constructor() {}

  ngOnInit(): void {}

  onContinueClick() {
    this.continue.emit(null);
  }
}
