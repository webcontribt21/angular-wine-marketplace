import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CheckoutSummaryComponent } from './views/checkout-summary/container/checkout-summary.component';
import { CheckoutShippingComponent } from './views/checkout-shipping/container/checkout-shipping.component';
import { CheckoutPaymentComponent } from './views/checkout-payment/container/checkout-payment.component';
import { CheckoutConfirmationComponent } from './views/checkout-confirmation/container/checkout-confirmation.component';
import { AuthGuard, DataLoadedGuard, ConfirmationGuard } from '../shared/guards';
// import { DetailsTypeComponent } from './container/details-type.component';
// import { ProductListComponent } from './container/smart/product-list/product-list.component';

export const routes: Routes = [
  { path: 'summary', component: CheckoutSummaryComponent },
  { path: '', redirectTo: 'summary', pathMatch: 'full' },
  // {
  //   path: '',
  //   component: CheckoutSummaryComponent,
  //   pathMatch: 'full'
  // },
  {
    path: 'shipping',
    component: CheckoutShippingComponent,
    canActivate: [AuthGuard, DataLoadedGuard]
  },
  {
    path: 'payment',
    component: CheckoutPaymentComponent,
    canActivate: [AuthGuard, DataLoadedGuard]
  },
  {
    path: 'confirmation',
    component: CheckoutConfirmationComponent,
    canActivate: [AuthGuard, DataLoadedGuard],
    canDeactivate: [ConfirmationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule {}
