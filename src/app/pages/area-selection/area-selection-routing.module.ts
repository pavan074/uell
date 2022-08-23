import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AreaSelectionPage } from './area-selection.page';

const routes: Routes = [
  {
    path: '',
    component: AreaSelectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AreaSelectionPageRoutingModule {}
