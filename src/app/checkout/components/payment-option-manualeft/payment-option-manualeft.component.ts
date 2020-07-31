import { Component, OnInit, Input } from '@angular/core';
import { CartSummary } from 'src/app/shared/interfaces/cart/cart-summary.interface';

@Component({
  selector: 'app-checkout-payment-option-manualeft',
  templateUrl: './payment-option-manualeft.component.html',
  styleUrls: ['./payment-option-manualeft.component.scss']
})
export class CheckoutPaymentOptionManualEftComponent implements OnInit {
  @Input()
  cartSummary: CartSummary;

  ngOnInit() {}
}
