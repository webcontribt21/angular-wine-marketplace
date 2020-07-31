import { NgModule } from '@angular/core';

import { LinkListComponent } from './container/link-list/link-list.component';
import { AboutComponent } from './container/about/about.component';
import { FooterComponent } from './container/footer.component';
import { FooterRoutingModule } from './footer-routing.module';
import { SharedModule } from '../../shared/shared.module';
// import { StoryDetailsComponent } from './components/story-details/story-details.component';
// import { AdvertsComponent } from './container/adverts/adverts.component';
import { LinkCardComponent } from './components/link-card/link-card.component';
import { MedalComponent } from './container/medal/medal.component';
import { SocialComponent } from './container/social/social.component';
// import { LatestStoriesComponent } from './container/latest-stories/latest-stories.component';
// import { StoryBlockComponent } from './container/story-block/story-block.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    // StoryDetailsComponent,
    // AdvertsComponent,
    // LatestStoriesComponent,
    // StoryBlockComponent
  ]
})
export class FooterModule {}
