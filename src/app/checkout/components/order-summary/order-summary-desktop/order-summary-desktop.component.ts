import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartSummary } from 'src/app/shared/interfaces/cart/cart-summary.interface';
import { UserAddress } from 'src/app/user/common/interfaces';
import { ItemDetailType } from 'src/app/shared/enums/itemDetailTypeNo.enum';
import { getItemDetailTypeValue } from 'src/app/checkout/views/checkout-summary/container/checkout-summary.component';
import { ErrorResponse } from 'apollo-link-error';

@Component({
  selector: 'app-checkout-order-summary-desktop',
  templateUrl: './order-summary-desktop.component.html',
  styleUrls: ['./order-summary-desktop.component.scss']
})
export class CheckoutOrderSummaryDesktopComponent implements OnInit {
  @Input() cartSummary: CartSummary;
  @Input() deliveryAddress: UserAddress;
  @Input() isComplete = false;
  @Input() continueLabel: string;
  @Input() canContinue: boolean;
  @Input() isLoading: boolean = false;
  @Input() isProcessingOrder: boolean = false;
  @Input() error: string;
  @Output() continue = new EventEmitter();
  @Output() applyVoucher = new EventEmitter();

  public itemDetailTypes = ItemDetailType;
  public getItemDetailTypeValue = getItemDetailTypeValue;
  display = false;
  voucherCode: string;

  constructor() {
    this.voucherCode = '';
  }

  ngOnInit(): void {
  }

  onContinueClick() {
    this.continue.emit(null);
  }

  onApplyVoucher() {
    this.applyVoucher.emit(this.cartSummary.voucher.code ? '' : this.voucherCode);
  }
}
