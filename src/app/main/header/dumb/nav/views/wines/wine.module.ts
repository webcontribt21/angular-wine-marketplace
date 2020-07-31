import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {WinesComponent} from './wines.component';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../../../../shared/shared.module';
import {SubCategoriesComponent} from './dumb/category/subCategories/sub-categories.component';
import {CategoryComponent} from './dumb/category/category.component';
import {SubCategoryComponent} from './dumb/category/subCategories/subCategory/sub-category.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ],
  exports: [RouterModule, WinesComponent],
  declarations: [
    WinesComponent,
    CategoryComponent,
    SubCategoriesComponent,
    SubCategoryComponent,
  ],
})

export class WineModule { }
