import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { RootState } from '../../../../@store/reducers/reducers';
import { getItemDetailTypes } from '../../../../@store/wineCategory/wine-category.selector';
import { ItemDetailTypeValue } from '../../../../shared/interfaces/item-detail-type-value.interface';
import { All_SECTIONS } from '../../../../shared/constants';
import { SelectItem } from 'primeng/components/common/selectitem';
import { CartSummary } from 'src/app/shared/interfaces/cart/cart-summary.interface';
import { UserAddress } from 'src/app/user/common/interfaces';
import { cartSummarySelector } from 'src/app/@store/cart/cart.selector';
import { deliveryAddressSelector, orderSummarySelector } from 'src/app/@store/checkout/checkout.selector';
import { OrderSummary } from 'src/app/shared/interfaces/checkout/order-summary.interface';
import { PaymentStatusNumber } from 'src/app/shared/enums/payment-status.enum';
import { PaymentGatewayMethodNumber } from 'src/app/shared/enums/payment-gateway-method.enum';
import { CanDeactivateComponent } from 'src/app/shared/interfaces/canDeactivateComponent.interface';

interface Reason {
  name: string;
  code: string;
}

@Component({
  selector: 'app-checkout-confirmation',
  templateUrl: './checkout-confirmation.component.html',
  styleUrls: ['./checkout-confirmation.component.scss']
})
export class CheckoutConfirmationComponent implements CanDeactivateComponent, OnInit {
  orderSummary$: Observable<OrderSummary> = this.store$.pipe(select(orderSummarySelector));
  cartSummary$: Observable<CartSummary> = this.store$.pipe(select(cartSummarySelector));
  checkoutDeliveryAddress$: Observable<UserAddress> = this.store$.pipe(select(deliveryAddressSelector));

  reasons: SelectItem[];
  selectedReason: Reason;
  paymentGatewayMethodNumber = PaymentGatewayMethodNumber;

  constructor(private store$: Store<RootState>, private router: Router) {}

  ngOnInit() {
    this.reasons = [
      { label: 'Choose', value: null },
      { label: 'Reason 1', value: { id: 1, name: 'Reason 1', code: '1' } },
      { label: 'Reason 2', value: { id: 2, name: 'Reason 2', code: '2' } }
    ];
  }

  onContinueShoppingClick() {
    this.router.navigate(['/']);
  }

  confirm(currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot): Observable<boolean>  {
    return of(!nextState.url.toLocaleLowerCase().startsWith('/checkout'));
  }
}
