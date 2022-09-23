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
  
  public data: any[];  
  public userId: number;
  public status: any;
  public colors = ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'light', 'medium', 'dark', ];

  constructor(private navController: NavController, private loaderService: LoaderService, private notificationService: NotificationService, public activatedRoute: ActivatedRoute, private activateService: ActivateService, private dataService: DataService, private xhrService: XhrService) {  
    
  }

  ngOnInit() {}

  ionViewWillEnter(){
    this.activateService.getAuth().then((data) => {
      console.log('Activate | ', data?.data);
      this.userId = data?.data;
      //alert(this.userId);
      if(this.userId){
        this.loaderService.startLoader();
        this.xhrService.get(this.xhrService.getWebApi('Main').concat('Answers/GetAll?userId=' + this.userId)).subscribe(data=>{ 
          this.loaderService.stopLoader();
          this.data = this.dataService.getArea(data);
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
      //this.userId = null;           
      this.navController.navigateForward(['/activate']);
    });
  }

  submit() {
    this.xhrService.post(this.xhrService.getWebApi('Main').concat('Answers/CalcData?userId=' + this.userId), {}).subscribe(data=>{
      this.notificationService.notify({title: 'CONFERMA', content: 'Questionario inoltrato correttamente'});
    });
  } 

  getValueProgressBar(item: any) {
    return item.nReply / item.nQuestion;
  } 

  getValue(item: any) {
    return Math.round((item.nReply / item.nQuestion) * 100);
  } 

  navigate(item: any) {
    //this.navController.navigateBack(['/area-selection', this.activatedRoute.snapshot.paramMap.get('userId')]);
    if(item.qArea == 'Nutrizione'){   
      this.navController.navigateForward(['/form', this.userId, item.qArea, 'null', 0]);
    }else{      
      this.navController.navigateForward(['/categoria-selection', this.userId, item.qArea]);
    }
  }

}
