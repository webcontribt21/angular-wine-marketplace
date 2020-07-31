import { Component, OnInit } from '@angular/core';
// import { UserService } from '../../user/services/user.service';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { RootState } from '../../@store/reducers/reducers';

import { Item } from '../../shared/interfaces/item.interface';
import { itemsSelector } from '../../@store/items/items.selector';
import { isAuth } from '../../@store/auth';

// import * as navActions from '../../@store/nav/nav.actions';
// import * as dataActions from '../../@store/data';
// import * as authActions from '../../@store/auth/auth.actions';
import { AddItemToCart } from '../../shared/interfaces/cart/add-item-to-cart.interface';

@Component({
  selector: 'app-checkout-header',
  templateUrl: './checkout-header.component.html',
  styleUrls: ['./checkout-header.component.scss']
})
export class CheckoutHeaderComponent implements OnInit {
  items$: Observable<Item[]> = this.store$.pipe(select(itemsSelector));
  isAuth$: Observable<boolean> = this.store$.pipe(select(isAuth));

  constructor(
    // private userService: UserService,
    private store$: Store<RootState>) {}

  ngOnInit() { }
}
