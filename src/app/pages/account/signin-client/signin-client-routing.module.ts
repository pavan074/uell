import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninClientPage } from './signin-client.page';

const routes: Routes = [
  {
    path: '',
    component: SigninClientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SigninClientPageRoutingModule {}
