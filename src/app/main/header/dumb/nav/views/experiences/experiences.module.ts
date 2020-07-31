import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../../../../shared/shared.module';
import {routes} from './experiences-routing.module';
import {ExperiencesComponent} from './dumb/experiences.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule, ExperiencesComponent],
  declarations: [
    ExperiencesComponent,
  ],
})

export class ExperiencesModule { }
