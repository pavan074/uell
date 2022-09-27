import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginSupplierPage } from './login-supplier.page';

const routes: Routes = [
  {
    path: '',
    component: LoginSupplierPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginSupplierPageRoutingModule {}
