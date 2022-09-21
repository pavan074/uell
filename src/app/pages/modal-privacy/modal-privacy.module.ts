import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalPrivacyPageRoutingModule } from './modal-privacy-routing.module';

import { ModalPrivacyPage } from './modal-privacy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalPrivacyPageRoutingModule
  ],
  //declarations: [ModalPrivacyPage]
})
export class ModalPrivacyPageModule {}
