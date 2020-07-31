import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { getPaymentMethods } from 'src/app/shared/helpers/payment-method-helpers';
import { PaymentMethodNumber } from 'src/app/shared/enums/payment-method.enum';
import { CartSummary } from 'src/app/shared/interfaces/cart/cart-summary.interface';
import * as userActions from '../../../@store/user/user.actions';
import { ActionsSubject } from '@ngrx/store';
import { ofType } from '@ngrx/effects';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserCard } from 'src/app/user/common/interfaces';

@Component({
  selector: 'app-checkout-payment-options',
  templateUrl: './payment-options.component.html',
  styleUrls: ['./payment-options.component.scss']
})
export class CheckoutPaymentOptionsComponent implements OnInit {
  @Input() public paymentMethods: any;
  @Input() public paymentMethod: PaymentMethodNumber;
  @Input() public newCard: boolean;
  @Output() paymentMethod$ = new EventEmitter<PaymentMethodNumber>();
  @Output() newCard$ = new EventEmitter<boolean>();
  @Input() cartSummary: CartSummary;

  public PaymentMethodNumbers = PaymentMethodNumber;
  destroyed$ = new Subject<boolean>();
  paymentUserCards: UserCard[];
  showNewCardCancelButton: boolean = true;

  constructor(
    private actions$: ActionsSubject
  ) { }

  ngOnInit() {
    this.paymentMethods = this.paymentMethods || getPaymentMethods();

    // force add if no cards
    this.actions$.pipe(
      ofType(userActions.loadUserCardsDataSuccess),
      takeUntil(this.destroyed$),
    ).subscribe(({userCards}) => {
      this.paymentUserCards = userCards;
      this.forceAddNewCardIfNoneExist();
    });
  }

  onNewCard(newCard) {
    this.newCard$.emit(newCard);
  }

  onPaymentMethodChanged(paymentMethod: PaymentMethodNumber) {
    this.paymentMethod$.emit(paymentMethod);
    this.forceAddNewCardIfNoneExist();
  }

  forceAddNewCardIfNoneExist() {
    if (!(this.paymentUserCards && this.paymentUserCards.length > 0)) {
      this.showNewCardCancelButton = false;
      this.onNewCard(true);
    } else {
      this.showNewCardCancelButton = true;
    }
  }

}
