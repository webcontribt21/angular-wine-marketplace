import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store, ActionsSubject } from '@ngrx/store';
import { ofType } from '@ngrx/effects';
import { Observable, Subject, combineLatest } from 'rxjs';
import { RootState } from '../../../../@store/reducers/reducers';
import * as userActions from '../../../../@store/user/user.actions';
import * as checkoutActions from '../../../../@store/checkout/checkout.actions';
import * as cartActions from '../../../../@store/cart/cart.actions';
import { UserAddress } from 'src/app/user/common/interfaces';
import { userAddressesSelector } from 'src/app/@store/user';
import { CartSummary } from 'src/app/shared/interfaces/cart/cart-summary.interface';

import {
  cartSummarySelector,
  isLoadingApplyVoucherSelector,
  voucherErrorSelector,
  successUpdateVoucherDataSelector,
  isLoadingCartSelector
} from '../../../../@store/cart/cart.selector';
import * as checkoutSelectors from 'src/app/@store/checkout/checkout.selector';
import { Country } from 'src/app/shared/interfaces/country.interface';
import { take, takeUntil, withLatestFrom, tap } from 'rxjs/operators';

@Component({
  selector: 'app-checkout-shipping',
  templateUrl: './checkout-shipping.component.html',
  styleUrls: ['./checkout-shipping.component.scss']
})
export class CheckoutShippingComponent implements OnInit, OnDestroy  {
  destroyed$ = new Subject<boolean>();

  cartSummary$: Observable<CartSummary> = this.store$.pipe(select(cartSummarySelector));
  isLoadingCartSummary$: Observable<boolean> = this.store$.pipe(select(isLoadingCartSelector));
  userAddresses$: Observable<UserAddress[]> = this.store$.pipe(select(userAddressesSelector));
  checkoutHasAddressesSelected$: Observable<boolean> = this.store$.pipe(select(checkoutSelectors.checkoutHasAddressesSelected));
  countries$: Observable<Country[]> = this.store$.pipe(select(checkoutSelectors.deliveryCountriesSelector));
  checkoutDeliveryAddressId$: Observable<string> = this.store$.pipe(select(checkoutSelectors.deliveryAddressIdSelector));
  checkoutDeliveryAddress$: Observable<UserAddress> = this.store$.pipe(select(checkoutSelectors.deliveryAddressSelector));
  checkoutBillingAddressId$: Observable<string> = this.store$.pipe(select(checkoutSelectors.billingAddressIdSelector));
  uiAddressInAddModeSelector$: Observable<boolean> = this.store$.pipe(select(checkoutSelectors.uiAddressInAddModeSelector));
  uiAddressInEditModeSelector$: Observable<boolean> = this.store$.pipe(select(checkoutSelectors.uiAddressInEditModeSelector));
  addressAddEdit$: Observable<UserAddress> = this.store$.pipe(select(checkoutSelectors.addressAddEditSelector));
  isLoadingApplyVoucher$: Observable<boolean> = this.store$.pipe(select(isLoadingApplyVoucherSelector));
  voucherError$: Observable<string> = this.store$.pipe(select(voucherErrorSelector));
  voucherSuccessData$: Observable<any> = this.store$.pipe(select(successUpdateVoucherDataSelector));

  constructor(private store$: Store<RootState>, private actions$: ActionsSubject, private router: Router) { }

  ngOnInit() {

    this.store$.dispatch(checkoutActions.clearOrder());
    this.store$.dispatch(checkoutActions.clearNewCardDetails());

    // force add if no addresses
    this.actions$.pipe(
      ofType(userActions.loadUserAddressesDataSuccess),
      takeUntil(this.destroyed$),
    ).subscribe(({userAddresses}) => {
      if (!(userAddresses && userAddresses.length > 0)) {
        this.onAddUserAddress(true);
      }
    });

    // force add if delete all addresses
    this.actions$.pipe(
      ofType(userActions.deleteUserAddressSuccess),
      withLatestFrom(this.userAddresses$),
      takeUntil(this.destroyed$),
    ).subscribe(([props, userAddresses]) => {
      if (!(userAddresses && userAddresses.length > 0)) {
        this.onAddUserAddress(true);
      }
    });
    this.store$.dispatch(userActions.loadUserAddressesData());

    this.voucherSuccessData$.subscribe(data => {
      if (data) {
        this.store$.dispatch(cartActions.loadSummary());
      }
    });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  onAddUserAddress(isFirstAddress = false) {
    this.resetAddEdit();
    const address: Partial<UserAddress> = {
      isDeliveryDefault: isFirstAddress,
      isBillingDefault: isFirstAddress,
      isBusiness: false
    };
    this.store$.dispatch(checkoutActions.beginAddAddress({ address }));
  }

  onEditUserAddress(address: UserAddress) {
    this.store$.dispatch(checkoutActions.beginEditAddress({ address }));
  }

  onDeleteUserAddress(address: UserAddress) {
    if (confirm('Are you sure you want to remove this adress?')) {
      this.store$.dispatch(userActions.deleteUserAddress({ _id: address._id }));
    }
  }

  onSelectCheckoutDeliveryAddress(address: UserAddress) {
    this.store$.dispatch(checkoutActions.setDeliveryAddress({ _id: address._id }));
  }

  onSelectCheckoutBillingAddress(address: UserAddress) {
    this.store$.dispatch(checkoutActions.setBillingAddress({ _id: address._id }));
  }

  onAddUserAddressSave(address: UserAddress) {
    this.store$.dispatch(userActions.createUserAddress({ address }));
  }

  onAddUserAddressCancel() {
    this.store$.dispatch(checkoutActions.endAddAddress());
  }

  onEditUserAddressSave(address: UserAddress) {
    this.store$.dispatch(userActions.editUserAddress({ address }));
  }

  onEditUserAddressCancel() {
    this.store$.dispatch(checkoutActions.endEditAddress());
  }

  onContinueClick() {
    this.router.navigate(['checkout', 'payment']);
  }

  onApplyVoucher(voucherCode: string) {
    this.store$.dispatch(cartActions.applyVoucherRequest({ voucherCode }));
  }

  resetAddEdit() {
    combineLatest(this.uiAddressInAddModeSelector$, this.uiAddressInEditModeSelector$).pipe(
      take(1),
      tap(([uiAddressInAddMode, uiAddressInEditMode]) => {
        if (uiAddressInAddMode) {
          this.store$.dispatch(checkoutActions.endAddAddress());
        }
        if (uiAddressInEditMode) {
          this.store$.dispatch(checkoutActions.endEditAddress());
        }
      })
    ).subscribe();
  }
}
