import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, of, from } from 'rxjs';
import { catchError, map, tap, shareReplay, take } from 'rxjs/operators';
import { Platform } from '@ionic/angular';
//import { HTTP } from '@ionic-native/http/ngx';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';

@Injectable({
    providedIn: 'root'
})
export class XhrService {  

    public http: HTTP | HttpClient;
    public _isNative: boolean = environment.isNative ? environment.isNative : false;

    constructor(private platform: Platform, public httpNative: HTTP, public httpClient: HttpClient) {}

    public get(url: string, params?: any, options?: any) {

        console.log('IsNative: ' + this.isNative());
        // if(options && options.log==true)
        // {
        //     console.log(url);
        // }
        if(this.isNative()){
            this.http = this.httpNative;

            //Don't check SSL Certificate
            this.http.setServerTrustMode('nocheck');
            this.http.setHeader('*', 'Access-Control-Allow-Origin' , '*');
            this.http.setHeader('*', 'Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
            this.http.setHeader('*', 'Accept','application/json');
            this.http.setHeader('*', 'content-type','application/json');
            
            //Important to set the data serializer or the request gets rejected
            this.http.setDataSerializer('json');

            return from(this.http.get(encodeURI(url), params, {})).pipe(map(x=>x.data)).pipe(map(x=>JSON.parse(x)));

        }else{
            this.http = this.httpClient;
            return this.http.get<any>(url, params);
        };
    }

    post(url: string, params?: any, options?: any): Observable<any> {
        if(this.isNative()){
            this.http = this.httpNative;

            //Don't check SSL Certificate
            this.http.setServerTrustMode('nocheck');
            this.http.setHeader('*', 'Access-Control-Allow-Origin' , '*');
            this.http.setHeader('*', 'Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
            this.http.setHeader('*', 'Accept','application/json');
            this.http.setHeader('*', 'content-type','application/json');
            
            //Important to set the data serializer or the request gets rejected
            this.http.setDataSerializer('json');

            return from(this.http.post(encodeURI(url), params, {})).pipe(map(x=>x.data)).pipe(map(x=>JSON.parse(x)));

        }else{
            this.http = this.httpClient;
            return this.http.post<any>(url, params);
        };
    }

    put(url: string, params?: any, options?: any): Observable<any> {
        if(this.isNative()){
            this.http = this.httpNative;

            //Don't check SSL Certificate
            this.http.setServerTrustMode('nocheck');
            this.http.setHeader('*', 'Access-Control-Allow-Origin' , '*');
            this.http.setHeader('*', 'Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
            this.http.setHeader('*', 'Accept','application/json');
            this.http.setHeader('*', 'content-type','application/json');
            
            //Important to set the data serializer or the request gets rejected
            this.http.setDataSerializer('json');

            return from(this.http.put(encodeURI(url), params, {})).pipe(map(x=>x.data)).pipe(map(x=>JSON.parse(x)));

        }else{
            this.http = this.httpClient;
            return this.http.put<any>(url, params);
        };
    }

    delete(url: string, params?: any, options?: any): Observable<any> {
        if(this.isNative()){
            this.http = this.httpNative;

            //Don't check SSL Certificate
            this.http.setServerTrustMode('nocheck');
            this.http.setHeader('*', 'Access-Control-Allow-Origin' , '*');
            this.http.setHeader('*', 'Access-Control-Allow-Methods', '*');
            this.http.setHeader('*', 'Accept','application/json');
            this.http.setHeader('*', 'content-type','application/json');
            
            //Important to set the data serializer or the request gets rejected
            this.http.setDataSerializer('json');

            //return from(this.http.delete(url, params, {})).pipe(map(x=>x.data)).pipe(map(x=>JSON.parse(x)));
            return from(this.http.delete(encodeURI(url), params, {})).pipe(map(x=>x.data));

        }else{
            this.http = this.httpClient;
            return this.http.delete<any>(url, params);
        };
    }

    getWebApi (name: string, type?: string) {
        if(!type){
            type = environment.networkType
        };
        var waObj = environment.webApi.find(x=>x.name === name);
        var server: any[] = waObj.server.filter(x=>x.type === type);
        return (server) ? server[0].url: null;
    }  

    isNative () {
        return this._isNative;
        //return (this.platform.is('ios') || this.platform.is('android')) ? true : false;
    }    
}




/* @Injectable({
    providedIn: 'root'
})
export class XhrService {    
    
    constructor(public http: HttpClient) {}
  
    get(url: string, obj?: any, skipCatchErr?: boolean): Observable<any> {
        let resp = this.http.get<any>(url, obj);
        return resp;
        return (skipCatchErr) ? resp : resp.pipe(catchError(this.handleError<any>('PostXhrOperation')));
    }

    post(url: string, obj?: any, skipCatchErr?: boolean): Observable<any> {
        let resp = this.http.post<any>(url, obj);
        return resp;
        //return (skipCatchErr) ? resp : resp.pipe(catchError(this.handleError<any>('PostXhrOperation')));
    }

    put(url: string, obj?: any, skipCatchErr?: boolean): Observable<any> {
        let resp = this.http.put<any>(url, obj);
        return resp;
        //return (skipCatchErr) ? resp : resp.pipe(catchError(this.handleError<any>('PutXhrOperation')));
    }

    getWebApi (name: string, type?: string) {
        if(!type){
            type = environment.networkType
        };
        var waObj = environment.webApi.find(x=>x.name === name);
        var server: any[] = waObj.server.filter(x=>x.type === type);
        return (server) ? server[0].url: null;
    }
    
} */