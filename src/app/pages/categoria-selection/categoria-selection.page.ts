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
export class CategoriaSelectionService implements Resolve<any> {
  constructor(private loaderService: LoaderService, private xhrService: XhrService, private activateService: ActivateService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let userId = route.params.userId;
    return this.xhrService.get(this.xhrService.getWebApi('Main').concat('Answers/GetAll?userId=' + userId));
  }
}

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

  ngOnInit() {}

  ionViewWillEnter(){
    this.resolveData(); 
  }

  resolveData(){  
    this.activatedRoute.data.pipe(map(x=>x.data)).subscribe(data => {
      //console.log(data);      
      this.data = this.dataService.getCategoria(data, this.qArea);
      /* if(this.qArea == 'Nutrizione'){
        this.data = data.filter(x=> x.qArea == this.qArea);
      } */
    });
  }  

  back() {
    //this.navController.navigateBack(['/area-selection', this.activatedRoute.snapshot.paramMap.get('userId')]);
    this.navController.navigateBack(['/intro']);
  }
  
}
