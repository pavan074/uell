import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriaSelectionPageRoutingModule } from './categoria-selection-routing.module';

import { CategoriaSelectionPage } from './categoria-selection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriaSelectionPageRoutingModule
  ],
  declarations: [CategoriaSelectionPage]
})
export class CategoriaSelectionPageModule {}
