import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../../../../shared/shared.module';
import {routes} from './spirits-routing.module';
import {SpiritsComponent} from './dumb/spirits.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule, SpiritsComponent],
  declarations: [
    SpiritsComponent,
  ],
})

export class SpiritsModule { }
