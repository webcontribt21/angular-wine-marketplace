import { NgModule } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { AccordionModule } from 'primeng/accordion';

import { SharedModule } from '../../../shared/shared.module';
import { UserpageRoutingModule } from './userpage-routing.module';
import { UserpageComponent } from './container/smart/userpage.component';
import { UserOrderHistoryComponent } from './pages/user-order-history/user-order-history.component';
import { OrderDetailsComponent } from './container/smart/order-details/order-details.component';
import { SecondNavComponent } from './container/thumb/second-nav/second-nav.component';
import { OrderShipmentComponent } from './components/order-shipment/order-shipment.component';
import { OrderProductComponent } from './components/order-product/order-product.component';
import { OrderDetailsCardComponent } from './components/order-details-card/order-details-card.component';
import { UserOrderListComponent } from './container/smart/user-order-list/user-order-list.component';

@NgModule({
  imports: [
    UserpageRoutingModule,
    SharedModule,
    TabViewModule,
    AccordionModule
  ],
  declarations: [
    UserpageComponent,
    UserOrderHistoryComponent,
    OrderDetailsComponent,
    SecondNavComponent,
    OrderShipmentComponent,
    OrderProductComponent,
    OrderDetailsCardComponent,
    UserOrderListComponent
  ]
})
export class UserpageModule {}
