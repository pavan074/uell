import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AreaSelectionPageRoutingModule } from './area-selection-routing.module';

import { AreaSelectionPage } from './area-selection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AreaSelectionPageRoutingModule
  ],
  declarations: [AreaSelectionPage]
})
export class AreaSelectionPageModule {}
