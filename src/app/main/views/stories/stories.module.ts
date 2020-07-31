import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { StoriesRoutingModule } from './stories-routing.module';
import { StoriesComponent } from './container/stories.component';
import { StoryHomeComponent } from './pages/story-home/story-home.component';
import { FeaturedStoriesComponent } from './container/smart/featured-stories/featured-stories.component';
import { MostPopularComponent } from './container/smart/most-popular/most-popular.component';
import { ContributorCardComponent } from './components/contributor-card/contributor-card.component';
import { TopContributorsComponent } from './container/smart/top-contributors/top-contributors.component';
import { StoryHomeVideosComponent } from './container/smart/story-home-videos/story-home-videos.component';
import { StoryMenuCarouselComponent } from './components/story-menu-carousel/story-menu-carousel.component';
import { StoryCategoryComponent } from './pages/story-category/story-category.component';
import { StoryCategoryAllComponent } from './pages/story-category-all/story-category-all.component';
import { StoryCategoryHeaderComponent } from './components/story-category-header/story-category-header.component';
import { StoryViewComponent } from './components/story-view/story-view.component';
import { StoryArticleComponent } from './pages/story-article/story-article.component';
import { ArticleDescriptionComponent } from './components/article-description/article-description.component';
import { ImageDescriptorComponent } from './components/image-descriptor/image-descriptor.component';
import { ArticleContentComponent } from './components/article-content/article-content.component';
import { ArticleImageCarouselComponent } from './components/article-image-carousel/article-image-carousel.component';
import { BreadscrumbsComponent } from './container/dumb/breadscrumbs/breadscrumbs.component';
import { StoryContributorComponent } from './pages/story-contributor/story-contributor.component';
import { AuthorCardComponent } from './components/author-card/author-card.component';
import { AuthorsComponent } from './container/smart/authors/authors.component';
import { ContributorDetailComponent } from './pages/contributor-detail/contributor-detail.component';

@NgModule({
  imports: [
    StoriesRoutingModule,
    SharedModule
  ],
  declarations: [
    StoriesComponent,
    StoryHomeComponent,
    FeaturedStoriesComponent,
    MostPopularComponent,
    ContributorCardComponent,
    TopContributorsComponent,
    StoryHomeVideosComponent,
    StoryMenuCarouselComponent,
    StoryCategoryComponent,
    StoryCategoryAllComponent,
    StoryCategoryHeaderComponent,
    StoryViewComponent,
    StoryArticleComponent,
    ArticleDescriptionComponent,
    ImageDescriptorComponent,
    ArticleContentComponent,
    ArticleImageCarouselComponent,
    BreadscrumbsComponent,
    StoryContributorComponent,
    AuthorCardComponent,
    AuthorsComponent,
    ContributorDetailComponent
  ]
})

export class StoriesModule {}
