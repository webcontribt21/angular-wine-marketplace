import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable, ErrorHandler } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ApolloConfigModule } from './graphql/apollo-config.module';
import { StoreModule } from '@ngrx/store';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, metaReducers } from './@store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './@store/effects';
import { AngularResizedEventModule } from 'angular-resize-event';

import { HeaderComponent } from './main/header/header.component';
import { NavComponent } from './main/header/dumb/nav/nav.component';
import { SearchItemsComponent } from './main/header/dumb/search/search-items/search-items.component';
import { ShippingComponent } from './main/header/dumb/shipping/shipping.component';
import { CartComponent } from './main/header/dumb/cart/cart.component';
import { AuthNavComponent } from './main/header/dumb/auth-nav/auth-nav.component';
import { SubscriptionComponent } from './main/subscription/subscription.component';
import { SharedModule } from './shared/shared.module';
import { AuthModalComponent } from './main/header/dumb/auth-nav/modal/auth-modal/auth-modal.component';
import { MainComponent } from './main/main.component';
import { CheckoutHeaderComponent } from './checkout/header/checkout-header.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { WineModule } from './main/header/dumb/nav/views/wines/wine.module';
import { SpiritsModule } from './main/header/dumb/nav/views/spirits/spirits.module';
import { ExperiencesModule } from './main/header/dumb/nav/views/experiences/experiences.module';
import { GiftsAccessoriesModule } from './main/header/dumb/nav/views/gifts-accessories/gifts-accessories.module';
import { SubscriptionsModule } from './main/header/dumb/nav/views/subscriptions/subscriptions.module';
// import { LinkComponent } from './main/footer/container/link-list/link/link.component';
// import { SubLinkListComponent } from './main/footer/container/link-list/sub-link-list/sub-link-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreRouterConnectingModule, NavigationActionTiming } from '@ngrx/router-store';
import { CustomSerializer } from './@store/router/custom-route-serializer';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CartModalComponent } from './main/header/dumb/cart/modal/cart-modal/cart-modal.component';
import { FavouritesComponent } from './main/header/dumb/favourites/favourites.component';
import { FavouritesModalComponent } from './main/header/dumb/favourites/modal/favourites-modal/favourites-modal.component';
import { SeachItemsModalComponent } from './main/header/dumb/search/search-items/modal/search-items-modal/search-items-modal.component';
// import { StoriesMenuComponent } from './main/header/dumb/nav/views/stories-menu/stories-menu.component';
import { AnalyticsService } from './shared/services/analytics.service';
import { SeoService } from './shared/services/seo.service';
import { ResizeService } from './shared/services/resize.service';
import { SocialComponent } from './main/footer/container/social/social.component';
import { MedalComponent } from './main/footer/container/medal/medal.component';
import { AboutComponent } from './main/footer/container/about/about.component';
import { LinkCardComponent } from './main/footer/components/link-card/link-card.component';
import { LinkListComponent } from './main/footer/container/link-list/link-list.component';
import { FooterComponent } from './main/footer/container/footer.component';

// import * as Sentry from '@sentry/browser';

// Sentry.init({
//   dsn: "https://5d5aa6f21b534d9d9af5a858af9f47c2@sentry.io/1539772"
// });

// @Injectable()
// export class SentryErrorHandler implements ErrorHandler {
//   constructor() { }
//   handleError(error) {
//     const eventId = Sentry.captureException(error.originalError || error);
//     Sentry.showReportDialog({ eventId });
//   }
// }

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    SearchItemsComponent,
    ShippingComponent,
    CartComponent,
    FavouritesComponent,
    AuthNavComponent,
    SubscriptionComponent,
    AuthModalComponent,
    CartModalComponent,
    FavouritesModalComponent,
    SeachItemsModalComponent,
    MainComponent,
    CheckoutHeaderComponent,
    CheckoutComponent,
    FooterComponent,
    LinkListComponent,
    LinkCardComponent,
    AboutComponent,
    MedalComponent,
    SocialComponent
    // SubLinkListComponent,
    // LinkComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ApolloConfigModule,
    SharedModule,
    UserModule,
    AuthModule,
    WineModule,
    SpiritsModule,
    ExperiencesModule,
    GiftsAccessoriesModule,
    SubscriptionsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      // initialState: {
      //   router: {
      //     state: {
      //       url: '/',
      //       params: {},
      //       queryParams: {}
      //     },
      //     navigationId: 0
      //   }
      // },
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule.forRoot({
      // stateKey: 'router',
      serializer: CustomSerializer
      // navigationActionTiming: NavigationActionTiming.PostActivation
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    OverlayPanelModule,
    AngularResizedEventModule
  ],
  providers: [
    AnalyticsService,
    SeoService,
    ResizeService
    // { provide: ErrorHandler, useClass: SentryErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
