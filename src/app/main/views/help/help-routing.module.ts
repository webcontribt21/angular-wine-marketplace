import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { HelpShippingComponent } from './pages/help-shipping/help-shipping.component';
import { HelpComponent } from './container/help.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { TermsUseComponent } from './pages/terms-use/terms-use.component';
import { TermsSaleComponent } from './pages/terms-sale/terms-sale.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';

export const routes: Routes = [
  {
    path: '',
    component: HelpComponent,
    children: [
      {
        path: 'shipping',
        component: HelpShippingComponent,
      },
      {
        path: 'about',
        component: AboutUsComponent,
      },
      {
        path: 'contact',
        component: ContactUsComponent,
      },
      {
        path: 'legal/use',
        component: TermsUseComponent,
      },
      {
        path: 'legal/sale',
        component: TermsSaleComponent,
      },
      {
        path: 'legal/privacy',
        component: PrivacyComponent,
      },
      {
        path: '',
        redirectTo: 'shipping',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HelpRoutingModule {}
