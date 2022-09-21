import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
//import { AuthService } from './service/auth.service';
import { ActivateService as AuthService } from './service/activate.service';
import { environment } from './../environments/environment';
import { AlertController } from '@ionic/angular';
import { XhrService } from './module/shared/service/xhr.service';
import { Router,NavigationEnd  } from '@angular/router';
import { CacheService } from "ionic-cache";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  
  public environment = environment;
  public data: any;
  public appPages = [
    { title: 'Home', url: '/', icon: 'mail' },
    //{ title: 'Activate', url: '/activate', icon: 'paper-plane' },
    //{ title: 'Questionari', url: '/area-selection', icon: 'paper-plane' },
    { title: 'Completato', url: '/', icon: 'heart' },
    { title: 'Feedback', url: '/', icon: 'archive' },
    { title: 'Richiedi test DNA', url: '/', icon: 'trash' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  public selectedIndex: any;
  public notificationToken: string;

  constructor(
    public platform: Platform,
    public splashScreen: SplashScreen,
    //private statusBar: StatusBar,
    public authService: AuthService,
    public alertController: AlertController,  
    public xhrService: XhrService,
    public route:Router,
    //public cache: CacheService
  ) {
    this.initializeApp();
    //this.setIonicCache();

    this.authService.auth$.subscribe((data) => {
      console.log('Auth | ', data);
      this.data = data; 
      //this.sendToken();
    });

    //this.routeEvent(this.route);

  }

  /* setIonicCache(){
    this.cache.setDefaultTTL(60 * 60 * 24); //Una volta al giorno
  } */

  /* routeEvent(router: Router){
    router.events.subscribe(e => {
      if(e instanceof NavigationEnd){
        console.log(e);    
        let value = {
          eventType: '[' + this.getPlatform() + ']' + e.url,
          eventRef: '[' + this.getPlatform() + ']' + e.url,
          refDate: new Date(),
          userId: (this.data && this.data.isLogged) ? this.data.data.id : -1,
          //userType: this.data.subject,
          userType: (this.data && this.data.isLogged) ? this.data.subject : '',
        }
        this.xhrService.post(this.xhrService.getWebApi('BakeUp').concat('Log/LogEvent'), value).subscribe(data => {})
      }
    });
  } */

  getPlatform(){
    if(this.platform.is('android')){
      return 'android';
    }
    if(this.platform.is('ios')){
      return 'ios';
    }
    return 'web';
  }

  initializeApp() {
    this.platform.ready().then(() => {
      //this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  /* sendToken() {    
    if(this.data && this.data.isLogged && this.notificationToken){
      let value = { 
        token: this.notificationToken,
        userId: this.data.data.id,
        deviceType: this.data.subject == 'supplier' ? 'seller' : this.data.subject
      };    
      console.log(value);
      this.xhrService.post(this.xhrService.getWebApi('BakeUp').concat('Notifications/RegisterDevice'), value).subscribe(data => {});     
    }
  } */  

  ngOnInit() {
    //throw "Too big";
    
    if(environment.isNative){
      this.platform.ready().then(() => {
      }); 

    }    
  }

}
