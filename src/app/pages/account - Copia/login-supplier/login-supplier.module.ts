import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginSupplierPageRoutingModule } from './login-supplier-routing.module';

import { LoginSupplierPage } from './login-supplier.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    IonicModule,
    LoginSupplierPageRoutingModule
  ],
  declarations: [LoginSupplierPage]
})
export class LoginSupplierPageModule {}
