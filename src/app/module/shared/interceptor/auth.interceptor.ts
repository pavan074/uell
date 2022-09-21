//https://medium.com/@ryanchenkie_40935/angular-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8

import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { environment } from '../../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.token;
        console.log(req.url);

        if (token) {
            const cloned = req.clone({
                headers: this.addExtraHeaders(req, token)
            });
            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }
        
    }

    private addExtraHeaders(req: HttpRequest<any>, token: string): HttpHeaders {
        return environment.urlWithoutAuthHeader.includes(req.url) ? req.headers : req.headers.append('Authorization', 'Bearer '.concat(token));
    } 
}




/* @Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const token = this.authService.token;
        
        if (token) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + token)
            });
            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }
        
    }
} */
