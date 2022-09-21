import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewPasswordSupplierPageRoutingModule } from './new-password-supplier-routing.module';

import { NewPasswordSupplierPage } from './new-password-supplier.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    IonicModule,
    NewPasswordSupplierPageRoutingModule
  ],
  declarations: [NewPasswordSupplierPage]
})
export class NewPasswordSupplierPageModule {}
