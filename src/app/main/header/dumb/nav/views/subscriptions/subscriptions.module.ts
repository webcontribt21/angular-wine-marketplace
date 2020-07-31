import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../../../../shared/shared.module';
import {routes} from './subscriptions-routing.module';
import {SubscriptionsComponent} from './dumb/subscriptions.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule, SubscriptionsComponent],
  declarations: [
    SubscriptionsComponent,
  ],
})

export class SubscriptionsModule { }
