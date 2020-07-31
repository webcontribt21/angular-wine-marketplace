import { ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { storageSync } from '@larscom/ngrx-store-storagesync';

import * as fromShop from '../shop/shop.reducer';
import * as fromWineCategory from '../wineCategory/wine-category.reducer';
import * as fromSpirits from '../spirits/spirits.reducer';
import * as fromAuth from '../auth/auth.reducer';
import * as fromUser from '../user/user.reducer';
import * as fromError from '../errors/error.reducer';
import * as fromNav from '../nav/nav.reducer';
import * as fromCountry from '../country/country.reducer';
import * as fromBrand from '../brands/brands.reducer';
import * as fromData from '../data/data.reducer';
import * as fromFilters from '../filters/filter.reducer';
import * as fromItems from '../items/items.reducer';
import * as fromItem from '../item/item.reducer';
import * as fromCart from '../cart/cart.reducer';
import * as fromCheckout from '../checkout/checkout.reducer';
import * as fromPagination from '../pagination/pagination.reducer';
import * as fromHome from '../home/home.reducer';
import * as fromQuickSearch from '../quick-search/quick-search.reducer';
import * as fromFooter from '../footer/footer.reducer';
import * as fromStory from '../story/story.reducer';
import * as fromStoryHome from '../story-home/story-home.reducer';
import * as fromSingleHome from '../story-single/story-single.reducer';
import * as fromUserOrder from '../user-order/user-order.reducer';
import { UserHelper } from 'src/app/shared/helpers';

export interface RootState {
  shopReducer: fromShop.ShopState;
  wineCategoryReducer: fromWineCategory.ItemDetailTypeState;
  spiritsReducer: fromSpirits.ItemDetailTypeState;
  authReducer: fromAuth.AuthState;
  userReducer: fromUser.UserState;
  errorReducer: fromError.ErrorState;
  navReducer: fromNav.NavState;
  countryReducer: fromCountry.CountriesState;
  brandReducer: fromBrand.BrandState;
  dataReducer: fromData.DataState;
  filterReducer: fromFilters.FilterState;
  itemsReducer: fromItems.ItemsState;
  itemReducer: fromItem.ItemState;
  router: RouterReducerState;
  cartReducer: fromCart.CartState;
  checkoutReducer: fromCheckout.CheckoutState;
  paginationReducer: fromPagination.PaginationState;
  homeReducer: fromHome.Homestate;
  quickSearchReducer: fromQuickSearch.QuickSearchState;
  footerReducer: fromFooter.Footerstate;
  storyReducer: fromStory.Storystate;
  storyHomeReducer: fromStoryHome.StoryHomeState;
  storySingleReducer: fromSingleHome.StorySingleState;
  userOrderReducer: fromUserOrder.UserOrderState;
}

export const reducers: ActionReducerMap<RootState> = {
  shopReducer: fromShop.reducer,
  wineCategoryReducer: fromWineCategory.reducer,
  spiritsReducer: fromSpirits.reducer,
  authReducer: fromAuth.reducer,
  userReducer: fromUser.reducer,
  errorReducer: fromError.reducer,
  navReducer: fromNav.reducer,
  countryReducer: fromCountry.reducer,
  brandReducer: fromBrand.reducer,
  dataReducer: fromData.reducer,
  filterReducer: fromFilters.reducer,
  itemsReducer: fromItems.reducer,
  itemReducer: fromItem.reducer,
  router: routerReducer,
  cartReducer: fromCart.reducer,
  checkoutReducer: fromCheckout.reducer,
  paginationReducer: fromPagination.reducer,
  homeReducer: fromHome.reducer,
  quickSearchReducer: fromQuickSearch.reducer,
  footerReducer: fromFooter.reducer,
  storyReducer: fromStory.reducer,
  storyHomeReducer: fromStoryHome.reducer,
  storySingleReducer: fromSingleHome.reducer,
  userOrderReducer: fromUserOrder.reducer,
};

export function storageSyncReducer(reducer: ActionReducer<RootState>) {
  return storageSync<RootState>({
    features: [
      { stateKey: 'authReducer', excludeKeys: ['ui'] },
      { stateKey: 'userReducer' },
      { stateKey: 'cartReducer' },
      { stateKey: 'checkoutReducer' }
      // save only router state to sessionStorage
      // { stateKey: 'router', storageForFeature: window.sessionStorage },
      // exclude key 'success' inside 'auth' and all keys 'loading' inside 'feature1'
      // { stateKey: 'feature1', excludeKeys: ['auth.success', 'loading'] }
    ],
    // defaults to localStorage
    rehydrateStateMerger: (state: RootState, rehydratedState: RootState) => {
      let rehydratedStateMerge = { ...rehydratedState };
      if (!rehydratedStateMerge.authReducer.auth.auth || !hasValidTokenInLocalStorage()) {
        delete rehydratedStateMerge.authReducer;
        delete rehydratedStateMerge.userReducer;
        localStorage.clear();
      } else {
        const auth = { ...state.authReducer, ...rehydratedStateMerge.authReducer };
        const user = { ...state.userReducer, ...rehydratedStateMerge.userReducer };
        rehydratedStateMerge = { ...rehydratedStateMerge, authReducer: auth, userReducer: user };
      }
      return { ...state, ...rehydratedStateMerge };
    },
    storage: window.sessionStorage
  })(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [storageSyncReducer];

export function hasValidTokenInLocalStorage() {
  const data = UserHelper.getTokenData();
  if (data) {
    if (!UserHelper.hasTokenExpired(data)) {
      return true;
    }
  }
  return false;
}
