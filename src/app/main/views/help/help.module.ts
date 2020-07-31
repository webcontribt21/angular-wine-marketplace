import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { InputMaskModule } from 'primeng/inputmask';

import { SharedModule } from 'src/app/shared/shared.module';
import { HelpRoutingModule } from './help-routing.module';
import { HelpShippingComponent } from './pages/help-shipping/help-shipping.component';
import { HelpComponent } from './container/help.component';
import { SecondNavComponent } from './container/thumb/second-nav/second-nav.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { TermsUseComponent } from './pages/terms-use/terms-use.component';
import { TermsSaleComponent } from './pages/terms-sale/terms-sale.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';

@NgModule({
  imports: [
    SharedModule,
    HelpRoutingModule,
    AccordionModule,
    FormsModule,
    ReactiveFormsModule,
    InputMaskModule
  ],
  declarations: [
    HelpShippingComponent,
    HelpComponent,
    SecondNavComponent,
    AboutUsComponent,
    ContactUsComponent,
    TermsUseComponent,
    TermsSaleComponent,
    PrivacyComponent
  ]
})

export class HelpPageModule {}
