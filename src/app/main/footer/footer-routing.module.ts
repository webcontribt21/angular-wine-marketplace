import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FooterComponent } from './container/footer.component';

export const routes: Routes = [
  {
    path: '',
    component: FooterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FooterRoutingModule {}
