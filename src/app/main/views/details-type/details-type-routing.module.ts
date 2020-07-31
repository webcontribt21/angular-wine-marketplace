import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DetailsTypeComponent } from './container/details-type.component';
import { ProductListComponent } from './container/smart/product-list/product-list.component';
import { ProductItemComponent } from './container/smart/product-item/product-item.component';
import { DataLoadedGuard } from '../../../shared/guards';
import { ProductItemResolver } from '../../../shared/resolvers/product-item.resolver';
import { ProductListCustomFilterResolver } from 'src/app/shared/resolvers/product-list-custom-filter.resolver';

export const routes: Routes = [
  // {
  //   path: 'old/:type',
  //   component: DetailsTypeComponent,
  //   children: [
  //     {
  //       path: ':description',
  //       component: ProductListComponent,
  //       canActivate: [DataLoadedGuard]
  //     },
  //     {
  //       path: ':description/item/:id/:name',
  //       component: ProductItemComponent,
  //       resolve: { message: ProductItemResolver }
  //     }
  //   ]
  // },
  {
    path: '',
    component: DetailsTypeComponent,
    children: [
      {
        path: 'item/:id/:name',
        component: ProductItemComponent,
        resolve: { message: ProductItemResolver },
        canActivate: [DataLoadedGuard]
      },
      {
        path: '**',
        component: ProductListComponent,
        resolve: { customFilters: ProductListCustomFilterResolver },
        canActivate: [DataLoadedGuard]
      }
    ]
  },
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   redirectTo: 'wines'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ProductItemResolver, ProductListCustomFilterResolver]
})
export class DetailsTypeRoutingModule {}
