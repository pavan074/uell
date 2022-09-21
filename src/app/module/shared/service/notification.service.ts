import {Injectable} from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

//Interface
import {Notification} from '../interface/notification.interface';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    notification: Notification;
    
    constructor(public alertController: AlertController, public toastController: ToastController) {}

    async notify(notification: Notification) {

        const alert = await this.alertController.create({
          header: notification.title,
          //subHeader: 'Subtitle',
          message: notification.content,
          buttons: ['OK']
        });
    
        await alert.present();
      }

    async notifyConfirm(notification: Notification) {
        let resolveFunction: (confirm: boolean) => void;
        let promise = new Promise<boolean>(resolve => {
            resolveFunction = resolve;
        });
        const alert = await this.alertController.create({
          header: notification.title,
          message: notification.content,
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => resolveFunction(false)
            }, {
              text: 'Ok',
              handler: () => resolveFunction(true)
            }
          ]
        });    
        await alert.present();
        return promise;
    }

    async notifyToast(notification: Notification) {
      const toast = await this.toastController.create({
        header: notification.title,
        //subHeader: 'Subtitle',
        message: notification.content,
        duration: 2000
      });
      toast.present();
    }
    
}