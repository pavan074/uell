import { InjectionToken, Injectable, Inject, Injector, ErrorHandler, NgZone, isDevMode } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
//import * as Rollbar from 'rollbar';
import { environment } from '../../../../environments/environment';
import { NotificationService } from '../service/notification.service';
import { LoaderService } from '../../../service/loader.service';
import { XhrService } from '../service/xhr.service';
import { Notification } from '../interface/notification.interface';
import { Router } from '@angular/router';

//export const RollbarService = new InjectionToken<Rollbar>('rollbar');

@Injectable() //https://medium.com/@aleixsuau/error-handling-angular-859d529fa53a
export class ErrorsHandler implements ErrorHandler {

    private active = false;

    constructor(private injector: Injector, private xhrService: XhrService) { }

    handleError(err: Error | HttpErrorResponse) {
    
        //Injection   
        const router = this.injector.get(Router);
        const zone = this.injector.get(NgZone);
        const notificationService = this.injector.get(NotificationService); 
        const loaderService = this.injector.get(LoaderService);   
        //const rollbar = this.injector.get(RollbarService);

        //Stop loader
        setTimeout(() => {  
            console.log('Stop loader from error class');
            loaderService.stopLoader();
         }, 2000);
    
        //Unauthorized
        if(this.checkUnauthorized(err)){

            if(err instanceof HttpErrorResponse){  
                zone.run(() => {
                    let notificationMessage = {title: 'Access unauthorized or expired', content: 'Try signing in again or check your credentials'};
                    notificationService.notify(notificationMessage);
                });            
                router.navigate(['/login']);
            }
            
        }else{
    
            //Console log error
            console.error('Error catch from ErrorsHandler: ', err);

            let errMessage = 'Errore in corso, riprovare più tardi';

            if (err.hasOwnProperty("error")) {   
                let error = err['error'];      
                if(environment.isNative){  
                    try { error = JSON.parse(error) } catch(e) {}   
                }                 
                if (error && error.hasOwnProperty("title") && error.hasOwnProperty("detail")) {
                    errMessage = error['detail'];
                }
            }
    
            alert(errMessage);
            if(environment.error.trace){
                this.log(err);                   
            }

        }      
    }    

    log(err: Error | HttpErrorResponse) {
        
        let errMessage = '';

        if(err instanceof Error) {
            errMessage = (<Error>err).message;
        }

        if(err instanceof HttpErrorResponse) {
            errMessage = (<HttpErrorResponse>err).error;
        }

        if (err.hasOwnProperty("error")) {   
            let error = err['error'];      
            if(environment.isNative){  
                try { error = JSON.parse(error) } catch(e) {}   
            }                 
            if (error && error.hasOwnProperty("title") && error.hasOwnProperty("detail")) {
                errMessage = error['detail'];
            }
        }

        let value = {
            message: errMessage,
            sender: null,
            context: null,
            severity: null
        };

        /* this.xhrService.post(this.xhrService.getWebApi('BakeUp').concat('Log/LogFromApp'), value).subscribe(data => {
            console.log('Log inviato | ', value); 
        }) */
    }   

    checkUnauthorized(err: Error | HttpErrorResponse): Boolean { 
        if(err instanceof HttpErrorResponse){  
            if (err.status === 401 || err.status === 403) {
                return true;      
            } 
        }
        return false;
    }
}







/* @Injectable()
export class ErrorsHandler implements ErrorHandler {

    constructor(private injector: Injector) { }

    handleError(err: Error | HttpErrorResponse) {
    
        const notificationService = this.injector.get(NotificationService);      
        const router = this.injector.get(Router)  
        const rollbar = this.injector.get(RollbarService);

        if (err instanceof HttpErrorResponse) {
            let notificationMessage: Notification = { title: (!navigator.onLine) ? 'No Internet Connection' : 'A server error occured', content: err.message };
            notificationService.notify(notificationMessage);
        } else {
            router.navigate(['/error'], { queryParams: {error: err} }); 
        }

        //let errParam = (err instanceof HttpErrorResponse) ? err.message: err;
        //router.navigate(['/error'], { queryParams: {error: errParam} });

        this.traceError(rollbar, err);        
        console.error('Error catch from ErrorsHandler: ', err);       
        return;
    }

    traceError(rollbar: Rollbar, err: Error | HttpErrorResponse) {
        if(environment.traceError){
            rollbar.error(err.message || err);
        } 
    }
} */