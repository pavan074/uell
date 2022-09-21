import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from "moment";
import { environment } from '../../../../environments/environment';
import { tap, map, shareReplay} from 'rxjs/operators';
import * as jwt_decode from "jwt-decode";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, from, BehaviorSubject } from 'rxjs';
import { Auth } from '../interface/auth.interface';
import { XhrService } from './xhr.service';
import { NotificationService } from '../service/notification.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    token
}