import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute, Params, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import * as _data from '../../../assets/data/questionario.json';

@Component({
  selector: 'app-categoria-selection',
  templateUrl: './categoria-selection.page.html',
  styleUrls: ['./categoria-selection.page.scss'],
})
export class CategoriaSelectionPage implements OnInit {
  
  public data: any[];
  public qArea: string;

  constructor(private navController: NavController, public activatedRoute: ActivatedRoute, private dataService: DataService) {
    this.qArea = activatedRoute.snapshot.paramMap.get('qArea');
  }

  ngOnInit() {
    var _dataTemp = _data;    ;
    this.data = this.dataService.getCategoria(_dataTemp.data, this.qArea);
  }

  /* nextStep(){
    this.navController.navigateForward(['/day-list', this.Selection]);
  } */

  back() {
    this.navController.navigateBack(['/area-selection']);
  }
  
}
