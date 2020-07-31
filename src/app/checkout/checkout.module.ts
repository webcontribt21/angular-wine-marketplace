import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { SharedModule } from '../shared/shared.module';

import { SliderModule } from 'primeng/components/slider/slider';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { SidebarModule } from 'primeng/sidebar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MessageModule } from 'primeng/message';

import { CheckoutOrderSummaryMobileComponent } from './components/order-summary/order-summary-mobile/order-summary-mobile.component';
import { CheckoutOrderSummaryDesktopComponent } from './components/order-summary/order-summary-desktop/order-summary-desktop.component';
import { CheckoutSummaryComponent } from './views/checkout-summary/container/checkout-summary.component';
import { CheckoutShippingComponent } from './views/checkout-shipping/container/checkout-shipping.component';
import { CheckoutPaymentComponent } from './views/checkout-payment/container/checkout-payment.component';
import { CheckoutAddressListDesktopComponent } from './components/address-list/address-list-desktop/address-list-desktop.component';
import { CheckoutAddressListMobileComponent } from './components/address-list/address-list-mobile/address-list-mobile.component';
import { CheckoutAddressAddEditComponent } from './components/address-add-edit/address-add-edit.component';
import { CheckoutPaymentOptionsComponent } from './components/payment-options/payment-options.component';
import { CheckoutPaymentOptionCardComponent } from './components/payment-option-card/payment-option-card.component';
import { CheckoutPaymentOptionCardAddComponent } from './components/payment-option-card-add/payment-option-card-add.component';
import { CheckoutPaymentOptionSnapscanComponent } from './components/payment-option-snapscan/payment-option-snapscan.component';
import { CheckoutPaymentOptionInstantEftComponent } from './components/payment-option-instanteft/payment-option-instanteft.component';
import { CheckoutConfirmationComponent } from './views/checkout-confirmation/container/checkout-confirmation.component';
import { CheckoutConfirmationShipmentComponent } from './components/confirmation-shipment/confirmation-shipment.component';
import { CheckoutPaymentOptionManualEftComponent } from './components/payment-option-manualeft/payment-option-manualeft.component';
import { SummaryQtySelectorComponent } from './components/summary-qty-selector/summary-qty-selector.component';

// import {SecondNavComponent} from './container/dumb/second-nav/second-nav.component';
// import {BreadcrumbsComponent} from './container/dumb/breadcrumbs/breadcrumbs.component';
// import {ProductListComponent} from './container/smart/product-list/product-list.component';
// import {FiltersComponent} from './container/smart/product-list/filters/filters.component';
// import {FilterListComponent} from './container/smart/product-list/filters/filter-list/filter-list.component';
// import {CurrentFiltersComponent} from './container/smart/product-list/current-filters/current-filters.component';

// import {CurrentFilterComponent} from './container/smart/product-list/current-filters/current-filter/current-filter.component';
// import {FilterComponent} from './container/smart/product-list/filters/filter-list/filter/filter.component';
// import {PriceRangeComponent} from './container/smart/product-list/filters/filter-list/price-range/price-range.component';

// import {ItemsListComponent} from './container/smart/product-list/items-list/items-list.component';

// import {SortItemsControlComponent} from './container/smart/product-list/items-list/smart/sort-items-control/sort-items-control.component';
// import {SwitcherUnavailableWinesComponent} from './container/smart/product-list/items-list/smart/switcher-unavailable-wines/switcher-unavailable-wines.component';
// import {StyleItemsControlComponent} from './container/smart/product-list/items-list/smart/style-items-control/style-items-control.component';

// import { MobileFiltersSelectComponent } from './container/smart/product-list/filters/filter-list/mobile-filters-select/mobile-filters-select.component';

@NgModule({
  declarations: [
    CheckoutSummaryComponent,
    CheckoutOrderSummaryMobileComponent,
    CheckoutOrderSummaryDesktopComponent,
    CheckoutShippingComponent,
    CheckoutAddressListDesktopComponent,
    CheckoutAddressListMobileComponent,
    CheckoutAddressAddEditComponent,
    CheckoutPaymentComponent,
    CheckoutPaymentOptionsComponent,
    CheckoutPaymentOptionCardComponent,
    CheckoutPaymentOptionCardAddComponent,
    CheckoutPaymentOptionSnapscanComponent,
    CheckoutPaymentOptionInstantEftComponent,
    CheckoutPaymentOptionManualEftComponent,
    CheckoutConfirmationComponent,
    CheckoutConfirmationShipmentComponent,
    SummaryQtySelectorComponent
    // SecondNavComponent,
    // BreadcrumbsComponent,
    // ProductListComponent,
    // FiltersComponent,
    // FilterListComponent,
    // CurrentFiltersComponent,
    // CurrentFilterComponent,
    // FilterComponent,
    // PriceRangeComponent,
    // ItemsListComponent,
    // SortItemsControlComponent,
    // SwitcherUnavailableWinesComponent,
    // StyleItemsControlComponent,
    // MobileFiltersSelectComponent,
  ],
  exports: [],
  imports: [
    CheckoutRoutingModule,
    SharedModule,
    SliderModule,
    FormsModule,
    ReactiveFormsModule,
    InputSwitchModule,
    AutoCompleteModule,
    DropdownModule,
    PaginatorModule,
    SidebarModule,
    RadioButtonModule,
    SelectButtonModule,
    MessageModule
  ]
})
export class CheckoutModule {}
