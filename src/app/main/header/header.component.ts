import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { HEADER_ICONS } from '../../shared/constants';
// import { UserService } from '../../user/services/user.service';
import { Observable, Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { navMobileDropDownSelector, selectNavSectionSelector } from '../../@store/nav';
import { RootState } from '../../@store/reducers/reducers';
import { isOpenNavSectionSelector, selectNavClickedSelector } from '../../@store/nav/nav.seletor';
import { itemDetailTypesByKeySelector } from '../../@store/wineCategory/wine-category.selector';
import { ItemDetailType } from '../../shared/interfaces/Item-detail-type.interface';
import { Item } from '../../shared/interfaces/item.interface';
import { itemsSelector } from '../../@store/items/items.selector';
import { cartSummarySelector, cartQuantitySelector, isLoadingCartSelector } from '../../@store/cart/cart.selector';
import { isAuth, isShowModalSelector } from '../../@store/auth';
import { HeaderIcons } from '../../shared/interfaces/images.interface';
import { userDetailNameSelector } from '../../@store/user';
import { SortBy } from '../../shared/interfaces/sortBy';

import * as navActions from '../../@store/nav/nav.actions';
// import * as dataActions from '../../@store/data';
import * as authActions from '../../@store/auth/auth.actions';
import * as cartActions from '../../@store/cart/cart.actions';
import { CartSummary } from 'src/app/shared/interfaces/cart/cart-summary.interface';
import { ResizeService } from 'src/app/shared/services/resize.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit, OnDestroy {
  selectNavSection$: Observable<any> = this.store$.pipe(select(selectNavSectionSelector));
  clickedNavSection$: Observable<any> = this.store$.pipe(select(selectNavClickedSelector));
  isSelectNavSection$: Observable<boolean> = this.store$.pipe(select(isOpenNavSectionSelector));
  isShow$: Observable<boolean> = this.store$.pipe(select(navMobileDropDownSelector));
  itemDetailTypes$: Observable<ItemDetailType[]> = this.store$.pipe(select(itemDetailTypesByKeySelector, { key: 'wines' }));
  items$: Observable<Item[]> = this.store$.pipe(select(itemsSelector));
  cartSummary$: Observable<CartSummary> = this.store$.pipe(select(cartSummarySelector));
  cartQuantity$: Observable<number> = this.store$.pipe(select(cartQuantitySelector));
  cartIsLoading$: Observable<boolean> = this.store$.pipe(select(isLoadingCartSelector));

  // favouriteItems$: Observable<ItemInCart[]> = this.store$.pipe(select(itemsCartSelector));
  isAuth$: Observable<boolean> = this.store$.pipe(select(isAuth));
  isOpen$: Observable<boolean> = this.store$.pipe(select(isShowModalSelector));
  name$: Observable<string> = this.store$.pipe(select(userDetailNameSelector));
  icons: HeaderIcons = HEADER_ICONS;
  selectRule: SortBy = new SortBy('schedule_date', '', '');

  private resizeSubscription: Subscription;
  windowWidth: number;
  mobileWidth: number;
  public iosDevice: boolean;

  constructor(
    private store$: Store<RootState>,
    private resizeService: ResizeService
  ) {
    this.mobileWidth = 550;
  }

  ngOnInit() {
    //
    if (navigator.vendor != null && navigator.vendor.match(/Apple Computer, Inc./) && navigator.userAgent.match(/iPhone/i) || (navigator.userAgent.match(/iPod/i))) {
      // alert("Ipod or Iphone");
      this.iosDevice = true;
    } else if (navigator.vendor != null && navigator.vendor.match(/Apple Computer, Inc./) && navigator.userAgent.match(/iPad/i)) {
      // alert("Ipad");
    } else if (navigator.vendor != null && navigator.vendor.match(/Apple Computer, Inc./) && navigator.userAgent.indexOf('Safari') != -1) {
      // alert("Safari");
    } else if (navigator.vendor == null || navigator.vendor != null) {
      // alert("Not Apple Based Browser");
      this.iosDevice = true;
    }
    //

    this.windowWidth = window.innerWidth;

    this.resizeSubscription = this.resizeService.onResize$
      .subscribe(size => {
        this.windowWidth = size.innerWidth;
      });
  }

  ngOnDestroy() {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }

  toggleNavMenu() {
    this.store$.dispatch(navActions.navToggleMobileDropDownMenu());
  }

  toggleCategory(name: string): void {
    this.store$.dispatch(navActions.navToggleModal({ name }));
  }

  closeNavMenu() {
    this.store$.dispatch(navActions.navCloseModal());
    this.store$.dispatch(navActions.navCloseMobileDropDownMenu());
  }

  toggleAuthModal() {
    this.store$.dispatch(authActions.authToggleModal());
  }

  closeAuthModal() {
    this.store$.dispatch(authActions.authCloseModal());
  }

  toggleCartModel(visible: boolean) {
    if (visible) {
      this.store$.dispatch(cartActions.loadSummary());
    }
  }

  removeItemFromCart(item) {
    this.store$.dispatch(cartActions.removeItemFromCart(item));
  }

  logout() {
    this.store$.dispatch(authActions.logout());
  }
}
