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



/* @Injectable({providedIn: 'root'})
export class IntroService implements Resolve<any> {
  constructor(private loaderService: LoaderService, private xhrService: XhrService, private activateService: ActivateService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let userId = route.params.userId;
    return this.xhrService.get(this.xhrService.getWebApi('Main').concat('Answers/GetAll?userId=' + userId));
  }
} */

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  
  //public data: any[];  
  public userId: number;
  public status: any;

  constructor(private navController: NavController, public activatedRoute: ActivatedRoute, private activateService: ActivateService, private dataService: DataService, private xhrService: XhrService) {  
    
  }

  ngOnInit() {}

  ionViewWillEnter(){
    this.activateService.getAuth().then((data) => {
      console.log('Activate | ', data?.data);
      this.userId = data?.data;
      //alert(this.userId);
      if(this.userId){
        this.xhrService.get(this.xhrService.getWebApi('Main').concat('Answers/GetAll?userId=' + this.userId)).subscribe(data=>{
          //this.data = data;
          this.status = this.dataService.getStatus(data);
        });
      }
    });
  }

  /* ngOnInit() {
    this.resolveData();  
  }

  resolveData(){  
    this.activatedRoute.data.pipe(map(x=>x.data)).subscribe(data => {
      //console.log(data);
      this.data = data;
      this.status = this.dataService.getStatus(data);
    });
  }  */ 

  cancel() {
    this.activateService.removeAuth().then(data=>{
      this.userId = null;
    });
  }

  submit() {
    alert('Funzione non attiva');
  }

}
