import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriaSelectionPage } from './categoria-selection.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriaSelectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriaSelectionPageRoutingModule {}
