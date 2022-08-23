import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataService } from 'src/app/service/data.service';
import * as _data from '../../../assets/data/questionario.json';

@Component({
  selector: 'app-area-selection',
  templateUrl: './area-selection.page.html',
  styleUrls: ['./area-selection.page.scss'],
})
export class AreaSelectionPage implements OnInit {
  
  public data: any[];

  constructor(private navController: NavController, private dataService: DataService) {}

  ngOnInit() {
    var _dataTemp = _data;    ;
    this.data = this.dataService.getArea(_dataTemp.data);
  }

  /* nextStep(){
    this.navController.navigateForward(['/day-list', this.Selection]);
  } */

  back() {
    this.navController.navigateBack(['/']);
  }
  
}
