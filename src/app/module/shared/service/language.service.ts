//import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Auth } from './../interface/auth.interface';
import { environment } from './../../../../environments/environment';

//https://ionicacademy.com/localise-ionic-ngx-translate/

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

    /* constructor(private translate: TranslateService, private authService: AuthService) {
        this.setLanguage();   
        this.authService.auth$.subscribe((data: Auth) => {
            if(data.payload){
                if(data.payload){
                    this.setLang(data.payload.account.languageCode);
                }
            }
        });     
    } */

    /* setLanguage() {
        this.translate.setDefaultLang(environment.language.default); 
        this.setLang(this.translate.getBrowserCultureLang());
    }

    setLang(lang: string) {        
        if(environment.language.list.indexOf(lang) !== -1){
            this.translate.use(lang);
        }     
    } */
}