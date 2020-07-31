import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../../../../shared/shared.module';
import {routes} from './gifts-accessories-routing.module';
import {GiftsAccessoriesComponent} from './dumb/gifts-accessories.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule, GiftsAccessoriesComponent],
  declarations: [
    GiftsAccessoriesComponent,
  ],
})

export class GiftsAccessoriesModule { }
