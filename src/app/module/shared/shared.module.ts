import { NgModule, LOCALE_ID, InjectionToken, Injectable, Inject, Injector, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './routing.module';
//import { BrowserModule } from '@angular/platform-browser';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
//import { MaterialModule } from './angular-material.module';
//import { ModuleWithProviders } from '@angular/compiler/src/core';
import { DecimalPipe } from '@angular/common';
//import * as Rollbar from 'rollbar';
import { environment } from '../../../environments/environment';
import { ErrorsHandler, /* RollbarService */ } from './class/errorsHandler.class';
//import { HTTP } from '@ionic-native/http/ngx';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';


//Interceptor -------------------------------------------------------------------------
//import { AuthInterceptor } from './interceptor/auth.interceptor';
import { XhrInterceptor } from './interceptor/xhr.interceptor';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        //BrowserModule,
        //BrowserAnimationsModule,
        HttpClientModule,
        FormsModule, ReactiveFormsModule,
        //MaterialModule,
        AppRoutingModule,
        /* TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }) */
    ],
    exports: [
        CommonModule,
        HttpClientModule,
        FormsModule, ReactiveFormsModule
    ],
    entryComponents: [],
    providers: [
        { provide: ErrorHandler, useClass: ErrorsHandler },
        //{ provide: RollbarService, useFactory: RollbarFactory },
        //{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true },
        HTTP
    ]
  })

  export class SharedModule {}

  /* export class SharedModule {
    static forRoot(): ModuleWithProviders{
        return{
            ngModule: SharedModule,
            providers: [
                DecimalPipe,
                { provide: LOCALE_ID, useValue: 'it' }
            ]
        }
    }
  } */



  



  /* export class SharedModule {
    static forRoot(): ModuleWithProviders{
        return{
            ngModule: SharedModule,
            providers: [
                DecimalPipe,
                { provide: LOCALE_ID, useValue: 'it' },
                { provide: ErrorHandler, useClass: ErrorsHandler },
                //{ provide: RollbarService, useFactory: RollbarFactory },
                { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
                { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true }
            ]
        }
    }
 } */
