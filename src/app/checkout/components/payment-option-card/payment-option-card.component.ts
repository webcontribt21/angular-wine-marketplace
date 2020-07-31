import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-checkout-payment-option-card',
  templateUrl: './payment-option-card.component.html',
  styleUrls: ['./payment-option-card.component.scss']
})
export class CheckoutPaymentOptionCardComponent implements OnInit {
  @Output()
  newCard$ = new EventEmitter<boolean>();

  ngOnInit() {}

  onNewCardClick() {
    this.newCard$.emit(true);
  }
}
