import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from "moment";
import { tap, map, shareReplay} from 'rxjs/operators';
import * as jwt_decode from "jwt-decode";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, from, BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ActivateService implements CanActivate {

    public auth$: BehaviorSubject<any>;
    public storageKey: string = 'activate';   

    constructor(private router: Router, private storage: Storage) {
        this.auth$ = <BehaviorSubject<any>> new BehaviorSubject<any>({isLogged: false, subject: null, data: null});
        this.getAuth().then((data) => {
            if(data){
                this.auth$.next(data);
            }
        });
    }



    /* -------------------------- Get Set auth -------------------------- */

    async setAuth(subject: string, data: any): Promise<any>{
        let obj = { 
            isLogged: true, 
            subject: subject,
            data: data 
        };
        this.auth$.next(obj);
        return await this.storage.set(this.storageKey, obj);
    };

    async getAuth(): Promise<any>{
        return this.storage.get(this.storageKey);
    };

    async removeAuth(): Promise<any>{
        return this.storage.remove(this.storageKey);
    };



    /* -------------- CanActivate Interface Implementation -------------- */

    async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {        
        const data = await this.getStorageKey(this.storageKey);        
        if(data && data.isLogged){
            return true;
        }else{
            this.router.navigate(['activate']);
            return false;
        }
    } 

    async getStorageKey(key: string): Promise<any>{
        return await this.storage.get(key);
    } 



    /* -------------- Login Logout -------------- */

    login() {    
    } 

    logout(){
        this.removeAuth().then((data) => {
            this.auth$.next(null);
            console.log('Logout');
            //this.router.navigate(['walkthrought']);
        });
    } 
}






    /* async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {        
        const data = await this.getStorageKey(this.storageKey);        
        if(data && data.redirectPath){
            this.router.navigate([data.redirectPath]);
        }
        return true;
    }    

    async getStorageKey(key: string): Promise<any>{
        return await this.storage.get(key);
    }  

    setAsVisited(subjectType: string): void{
        this.storage.set(this.storageKey, { subjectType: subjectType, redirectPath: this.redirectPath[subjectType] }).then((data) => {
            console.log('WalkthroughtDispatcherService | ', 'setAsVisited');
        });
    } 

    setAsNotVisited(): void{
        this.storage.remove(this.storageKey).then((data) => {
            console.log('WalkthroughtDispatcherService | ', 'setAsNotVisited');
        });
    } */