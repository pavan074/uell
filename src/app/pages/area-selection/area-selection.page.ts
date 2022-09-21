import { Component, OnInit, ViewChild, Injectable, Pipe, PipeTransform } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { IonContent, IonSearchbar } from '@ionic/angular';
import { ActivatedRoute, Router, Params, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, forkJoin, from, of } from 'rxjs';
import { map, merge, concatMap, flatMap, delay  } from 'rxjs/operators';
import { AuthService } from '../../module/shared/service/auth.service';
import { NotificationService } from '../../module/shared/service/notification.service';
import { XhrService } from '../../module/shared/service/xhr.service';
import { DataService } from 'src/app/service/data.service';
import { LoaderService } from 'src/app/service/loader.service';
import { ActivateService } from 'src/app/service/activate.service';
import { HttpClient } from '@angular/common/http';
import { CacheService } from "ionic-cache";
//import * as _data from '../../../assets/data/questionario.json';



@Injectable({providedIn: 'root'})
export class AreaSelectionService implements Resolve<any> {
  constructor(private loaderService: LoaderService, private xhrService: XhrService, private activateService: ActivateService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let userId = route.params.userId;
    return this.xhrService.get(this.xhrService.getWebApi('Main').concat('Answers/GetAll?userId=' + userId));
  }
}



@Component({
  selector: 'app-area-selection',
  templateUrl: './area-selection.page.html',
  styleUrls: ['./area-selection.page.scss'],
})
export class AreaSelectionPage implements OnInit {
  
  public data: any[];

  constructor(private navController: NavController, public activatedRoute: ActivatedRoute, private dataService: DataService) {}

  ngOnInit() {}

  ionViewWillEnter(){
    this.resolveData(); 
  }

  resolveData(){  
    this.activatedRoute.data.pipe(map(x=>x.data)).subscribe(data => {
      //console.log(data);
      this.data = this.dataService.getArea(data);
    });
  }  

  /* nextStep(){
    this.navController.navigateForward(['/day-list', this.Selection]);
  } */ 

  navigate(item: any) {
    //this.navController.navigateBack(['/area-selection', this.activatedRoute.snapshot.paramMap.get('userId')]);
    if(item.qArea == 'Nutrizione'){   
      this.navController.navigateBack(['/form', this.activatedRoute.snapshot.paramMap.get('userId'), item.qArea, 'null', 0]);
    }else{      
      this.navController.navigateBack(['/categoria-selection', this.activatedRoute.snapshot.paramMap.get('userId'), item.qArea]);
    }
  }

  back() {
    this.navController.navigateBack(['/']);
  }
  
}
