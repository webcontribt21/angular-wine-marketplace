import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { StoriesComponent } from './container/stories.component';
import { StoryHomeComponent } from './pages/story-home/story-home.component';
import { StoryCategoryComponent } from './pages/story-category/story-category.component';
import { StoryCategoryAllComponent } from './pages/story-category-all/story-category-all.component';
import { StoryArticleComponent } from './pages/story-article/story-article.component';
import { StoryContributorComponent } from './pages/story-contributor/story-contributor.component';
import { ContributorDetailComponent } from './pages/contributor-detail/contributor-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: StoriesComponent,
    children: [
      {
        path: 'home',
        component: StoryHomeComponent,
      },
      {
        path: 'all',
        component: StoryCategoryAllComponent,
      },
      {
        path: 'category/:id',
        component: StoryCategoryComponent,
      },
      {
        path: 'article/:id',
        component: StoryArticleComponent,
      },
      {
        path: 'contributor/:id',
        component: ContributorDetailComponent,
      },
      {
        path: 'contributors',
        component: StoryContributorComponent,
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class StoriesRoutingModule {}
