import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserpageComponent } from './container/smart/userpage.component';
import { UserOrderHistoryComponent } from './pages/user-order-history/user-order-history.component';

export const routes: Routes = [
  {
    path: '',
    component: UserpageComponent,
    children: [
      {
        path: 'order-history',
        component: UserOrderHistoryComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserpageRoutingModule {}
