import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewPasswordSupplierPage } from './new-password-supplier.page';

const routes: Routes = [
  {
    path: '',
    component: NewPasswordSupplierPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewPasswordSupplierPageRoutingModule {}
