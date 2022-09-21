import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from "moment";
import { tap, map, shareReplay} from 'rxjs/operators';
import * as jwt_decode from "jwt-decode";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, from, BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

    counter: number = 0; 
    loading: any;  
    setInterval: any;  

    constructor(private loadingController: LoadingController) {}

    startLoader() {
        this.counter = 1;
        this.loadingController.create({
            //spinner: 'circles'
            spinner: 'crescent',
            //message: 'Caricamento',
            cssClass:'custom-loader-class'
        }).then((overlay)=>{
            if(this.loading === undefined){
                this.loading = overlay;
                this.loading.present();
            }
        });
    }

    stopLoader(): void {
        if(this.counter == 1 && this.loading) {
            this.closeLoader();
        }
        if(this.counter == 1 && !this.loading) {
            this.setInterval = setInterval(function(){ 
                console.log('StopLoader repeat');
                this.closeLoader();
            }.bind(this), 100);
        }
    }

    closeLoader(): void {
        if(this.loading) {
            this.loading.dismiss();
            this.counter = 0;
            this.loading = undefined;
            clearInterval(this.setInterval);
        }
    }

}