import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, shareReplay, take } from 'rxjs/operators';




@Injectable({
    providedIn: 'root'
})
export class XhrService {    
    
    constructor(public http: HttpClient) {}
  
    get(url: string, obj?: any, skipCatchErr?: boolean): Observable<any> {
        let resp = this.http.get<any>(url, obj);
        return resp;
        /* return (skipCatchErr) ? resp : resp.pipe(catchError(this.handleError<any>('PostXhrOperation'))); */
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
    
}