import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';
import { UserCardFull } from 'src/app/user/common/interfaces';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/@store/reducers/reducers';
import * as checkoutActions from 'src/app/@store/checkout/checkout.actions';
import { inherits } from 'util';

interface Quantity {
  name: string;
  code: string;
}

interface UserCardFullD {
  cardName: string;
  cardNumber: string;
  cvv: string;
  expiryDateMonth: string;
  expiryDateYear: string;
  remember: boolean;
}

@Component({
  selector: 'app-checkout-payment-option-card-add',
  templateUrl: './payment-option-card-add.component.html',
  styleUrls: ['./payment-option-card-add.component.scss']
})
export class CheckoutPaymentOptionCardAddComponent implements OnInit {
  @Input() public newCard: boolean;
  @Input() public showNewCardCancelButton: boolean;
  @Output() newCard$ = new EventEmitter<boolean>();
  @Output() userCard$ = new EventEmitter<UserCardFull>();

  cardName: string;
  cardNumber: string;
  cvv: string;
  expiryDateMonth: Quantity;
  expiryDateYear: Quantity;
  remember: boolean;

  months: SelectItem[];
  years: SelectItem[];
  terms: SelectItem[];
  selectedMonth: Quantity;
  selectedYear: Quantity;
  selectedTerm: Quantity;


  constructor(private store$: Store<RootState>) {
    this.months = [
      { label: 'Choose', value: null },
      { label: '01', value: { id: 1, name: '01', code: '01' } },
      { label: '02', value: { id: 2, name: '02', code: '02' } },
      { label: '03', value: { id: 3, name: '03', code: '03' } },
      { label: '04', value: { id: 4, name: '04', code: '04' } },
      { label: '05', value: { id: 5, name: '05', code: '05' } },
      { label: '06', value: { id: 6, name: '06', code: '06' } },
      { label: '07', value: { id: 7, name: '07', code: '07' } },
      { label: '08', value: { id: 8, name: '08', code: '08' } },
      { label: '09', value: { id: 9, name: '09', code: '09' } },
      { label: '10', value: { id: 10, name: '10', code: '10' } },
      { label: '11', value: { id: 11, name: '11', code: '11' } },
      { label: '12', value: { id: 12, name: '12', code: '12' } }
    ];
    this.years = [
      { label: 'Choose', value: null },
      { label: '2020', value: { id: 1, name: '2020', code: '2020' } },
      { label: '2021', value: { id: 2, name: '2021', code: '2021' } },
      { label: '2022', value: { id: 3, name: '2022', code: '2022' } },
      { label: '2023', value: { id: 4, name: '2023', code: '2023' } },
      { label: '2024', value: { id: 5, name: '2024', code: '2024' } },
      { label: '2025', value: { id: 6, name: '2025', code: '2025' } },
      { label: '2026', value: { id: 7, name: '2026', code: '2026' } },
      { label: '2027', value: { id: 8, name: '2027', code: '2027' } },
      { label: '2028', value: { id: 9, name: '2028', code: '2028' } }
    ];
    this.terms = [
      { label: 'Choose', value: null },
      { label: 'Straight', value: { id: 1, name: 'Straight', code: 'Straight' } },
      { label: 'Budget', value: { id: 2, name: 'Budget', code: 'Budget' } }
    ];

    // DEV TEST - REMOVE ON PRODUCTION
    this.cardName = 'Joe Black';
    this.cardNumber = '4012888888881881';
    this.expiryDateMonth = { name: '11', code: '11' };
    this.expiryDateYear = { name: '2020', code: '2020' };
    this.cvv = '123';
    this.remember = true;
  }

  ngOnInit() {
    const userCardFull: UserCardFull = {
      cardName: this.cardName,
      cardNumber: this.cardNumber,
      cvv: this.cvv,
      expiryDateMonth: (this.expiryDateMonth ? this.expiryDateMonth.code : ''),
      expiryDateYear: (this.expiryDateYear ? this.expiryDateYear.code : ''),
      remember: this.remember
    };
    this.store$.dispatch(checkoutActions.setNewCardDetails({ userCardFull }));
  }

  onNewCardCancelClick() {
    this.newCard$.emit(false);
  }

  onCardDetailsChanged() {
    const userCardFull: UserCardFull = {
      cardName: this.cardName,
      cardNumber: this.cardNumber,
      cvv: this.cvv,
      expiryDateMonth: (this.expiryDateMonth ? this.expiryDateMonth.code : ''),
      expiryDateYear: (this.expiryDateYear ? this.expiryDateYear.code : ''),
      remember: this.remember
    }
    this.store$.dispatch(checkoutActions.setNewCardDetails({ userCardFull }));
  }

}
