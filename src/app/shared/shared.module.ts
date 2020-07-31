import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { guards } from './guards';
import { pipes } from './pipes';
import { BottomComponent } from './components/dumb/bottom/bottom.component';
import { LogoComponent } from './components/dumb/logo/logo.component';
import { ItemComponent } from './components/smart/item/item.component';
import { PayItemControlComponent } from './components/smart/item/dumb/pay-item-control/pay-item-control.component';
import { RatingInfoComponent } from './components/smart/item/dumb/rating-info/rating-info.component';
import { RatingModalComponent } from './components/smart/item/dumb/rating-modal/rating-modal.component';
import { CardsStyleComponent } from './components/smart/item/dumb/cards-style/cards-style.component';
import { ListsStyleComponent } from './components/smart/item/dumb/lists-style/lists-style.component';
import { CustomBreakPointsProvider } from './custom-breakpoints.component';
import { SubscribeFormComponent } from './components/smart/subscribe-form/subscribe-form.component';
import { DropdownComponent } from './components/smart/dropdown/dropdown.component';
import { HorizontalScrollDirective } from './directives/horizontal-scroll.directive';
import { WinesCarouselComponent } from './components/smart/wines-carousel/wines-carousel.component';
import { WineDetailsComponent } from './components/smart/wine-details/wine-details.component';
import { DebounceClickDirective } from './directives/debounce-click.directive';
import { SearchboxComponent } from './components/smart/searchbox/searchbox.component';
import { PaginatorComponent } from './components/smart/paginator/paginator.component';
import { SpinnerComponent } from './components/smart/spinner/spinner.component';
import { ArticleCardComponent } from './components/smart/article-card/article-card.component';
import { ImageWrapperComponent } from './components/smart/image-wrapper/image-wrapper.component';
import { TitleWrapperComponent } from './components/smart/title-wrapper/title-wrapper.component';
import { ResizedDirective } from './directives/resized-event.directive';
import { HorizontalMoveDirective } from './directives/horizontal-move.directive';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { StorySecondNavComponent } from './components/dumb/story-second-nav/story-second-nav.component';
import { WindowScrollDirective } from './directives/window-scroll.directive';
import { JwModalComponent } from './components/smart/jw-modal/jw-modal.component';

@NgModule({
  declarations: [
    ...pipes,
    BottomComponent,
    LogoComponent,
    ItemComponent,
    PayItemControlComponent,
    RatingInfoComponent,
    RatingModalComponent,
    CardsStyleComponent,
    ListsStyleComponent,
    SubscribeFormComponent,
    DropdownComponent,
    WinesCarouselComponent,
    WineDetailsComponent,
    HorizontalScrollDirective,
    DebounceClickDirective,
    SearchboxComponent,
    PaginatorComponent,
    SpinnerComponent,
    ArticleCardComponent,
    ImageWrapperComponent,
    TitleWrapperComponent,
    StorySecondNavComponent,
    ResizedDirective,
    HorizontalMoveDirective,
    ClickOutsideDirective,
    WindowScrollDirective,
    JwModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DropdownModule,
    FormsModule,
    FlexLayoutModule,
    SlickCarouselModule,
    PaginatorModule,
    ProgressSpinnerModule
  ],
  exports: [
    ...pipes,
    CommonModule,
    BottomComponent,
    LogoComponent,
    ItemComponent,
    SubscribeFormComponent,
    DropdownComponent,
    WinesCarouselComponent,
    WineDetailsComponent,
    SearchboxComponent,
    PaginatorComponent,
    SpinnerComponent,
    ArticleCardComponent,
    ImageWrapperComponent,
    TitleWrapperComponent,
    StorySecondNavComponent,
    HorizontalScrollDirective,
    FlexLayoutModule,
    SlickCarouselModule,
    DebounceClickDirective,
    ResizedDirective,
    HorizontalMoveDirective,
    ClickOutsideDirective,
    WindowScrollDirective,
    JwModalComponent,
    FormsModule,
    ProgressSpinnerModule,
  ],
  providers: [
    CustomBreakPointsProvider,
    ...guards
  ]
})
export class SharedModule {}
