import { Injectable } from '@angular/core';
import { AlertController, ModalController, NavController , Platform } from '@ionic/angular';
import { XhrService } from '../module/shared/service/xhr.service';
import { environment } from '../../environments/environment';
import { ModalPrivacyPage } from '../pages/modal-privacy/modal-privacy.page';
import { OverlayEventDetail } from '@ionic/core';
//import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Injectable({
  providedIn: 'root'
})
export class PrivacyService {

   data: any;
   modal: any;

   constructor(private xhrService: XhrService, public alertController: AlertController, public modalController: ModalController, /* private iab: InAppBrowser */) {} 


   
   getPrivacy(data: string){
      this.presentModal(data);
   }  



   async presentModal(data: string) {
      this.modal = await this.modalController.create({
        component: ModalPrivacyPage,
        componentProps: { 
          data: data,
        }
      });         
      this.modal.onDidDismiss().then((result: OverlayEventDetail) => {
         this.modal = undefined;
          if (result !== null) {
             /* if(result.data.action == 'redirectToStore'){
               //this.redirectToStore();             
             } */
          }
      });
      return await this.modal.present();
    }  

}