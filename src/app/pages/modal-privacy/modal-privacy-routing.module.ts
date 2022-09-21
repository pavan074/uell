import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalPrivacyPage } from './modal-privacy.page';

const routes: Routes = [
  {
    path: '',
    component: ModalPrivacyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalPrivacyPageRoutingModule {}
