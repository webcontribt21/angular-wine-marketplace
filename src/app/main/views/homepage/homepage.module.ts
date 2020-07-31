import { NgModule } from '@angular/core';

import { StoriesCarouselComponent } from './container/stories-carousel/stories-carousel.component';
import { HomepageComponent } from './container/homepage.component';
import { HomepageRoutingModule } from './homepage-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { StoryDetailsComponent } from './components/story-details/story-details.component';
import { AdvertsComponent } from './container/adverts/adverts.component';
import { AdvertCardComponent } from './components/advert-card/advert-card.component';
import { LatestStoriesComponent } from './container/latest-stories/latest-stories.component';
import { StoryBlockComponent } from './container/story-block/story-block.component';
import { TopBannerComponent } from './container/top-banner/top-banner.component';

@NgModule({
  imports: [
    HomepageRoutingModule,
    SharedModule
  ],
  declarations: [
    HomepageComponent,
    StoriesCarouselComponent,
    StoryDetailsComponent,
    AdvertsComponent,
    AdvertCardComponent,
    LatestStoriesComponent,
    StoryBlockComponent,
    TopBannerComponent
  ]
})
export class HomepageModule {}
