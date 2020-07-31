import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { RootRouter } from './shared/enums';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'buy-wine',
        redirectTo: RootRouter.WINES
      },
      {
        path: RootRouter.WINES,
        loadChildren: () => import('./main/views/details-type/details-type.module').then(m => m.DetailsTypeModule)
      },
      {
        path: RootRouter.HOMEPAGE,
        loadChildren: () => import('./main/views/homepage/homepage.module').then(m => m.HomepageModule)
      },
      {
        path: RootRouter.STORIES,
        loadChildren: () => import('./main/views/stories/stories.module').then(m => m.StoriesModule)
      },
      {
        path: RootRouter.USERPAGE,
        loadChildren: () => import('./main/views/userpage/userpage.module').then(m => m.UserpageModule)
      },
      {
        path: RootRouter.HELPPAGE,
        loadChildren: () => import('./main/views/help/help.module').then(m => m.HelpPageModule)
      },
      {
        path: '',
        redirectTo: RootRouter.HOMEPAGE,
        pathMatch: 'full'
      }
    ]
  },
  {
    path: RootRouter.CHECKOUT,
    component: CheckoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule)
      }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      enableTracing: false
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
