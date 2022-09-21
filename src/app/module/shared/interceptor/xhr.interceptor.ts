import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
//import { RollbarService } from '../../shared/shared.module';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, finalize } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { LoadingController, ToastController } from '@ionic/angular';

//Service
import { NotificationService } from '../service/notification.service';

//Interface
import { Notification } from '../interface/notification.interface';

@Injectable({ providedIn: 'root' })
export class XhrInterceptor implements HttpInterceptor {

    private contatore: number;
    loading: any;
    toast: any;

    constructor(private injector: Injector, private router: Router, public notificationService: NotificationService, private loadingController: LoadingController, private toastCtrl: ToastController) {
        this.contatore = 0;
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.contatore++;
        this.startLoader();

        return next.handle(request)
            .pipe(
                //retry(1),
                finalize(() => {
                    if (this.contatore <= 1) {
                        this.stopLoader();
                    }
                    this.contatore--;
                })
            )
    }
    
    /* startLoader() {
        this.toastCtrl.create({
            message: 'Saved ok',
            duration: 1000,
            position: 'top'
        }).then((t) => {
            if (this.contatore != 0 && this.toast === undefined) {
                this.toast = t;
                this.toast.present();
            }
        });
    } */

     startLoader(): void {  
         //console.log('startLoader');
         /* this.loadingController.create({
             //spinner: 'circles'
             spinner: 'dots',
         }).then((overlay)=>{
             if(this.contatore != 0 && this.loading === undefined){
                 this.loading = overlay;
                 this.loading.present();
             }
         }); */
     }

    stopLoader(): void {
        //console.log('stopLoader');
        /* if (this.loading) {
            this.loading.dismiss();
            this.loading = undefined;
        } */
    }

}