import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PasswordRecoverySupplierPage } from './password-recovery-supplier.page';

const routes: Routes = [
  {
    path: '',
    component: PasswordRecoverySupplierPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasswordRecoverySupplierPageRoutingModule {}
