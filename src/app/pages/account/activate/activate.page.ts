import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, AbstractControl, Validators, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { BehaviorSubject, fromEvent, merge, Observable, Subject, forkJoin, of, from } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, startWith, tap } from 'rxjs/operators';
import { NotificationService } from '../../../module/shared/service/notification.service';
import { XhrService } from '../../../module/shared/service/xhr.service';
import { AuthService } from '../../../service/auth.service';
import { ActivateService } from '../../../service/activate.service';
import { LoaderService } from '../../../service/loader.service';
import { PrivacyService } from '../../../service/privacy.service';
import * as moment from 'moment';
//import { Route } from '@angular/compiler/src/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.page.html',
  styleUrls: ['./activate.page.scss'],
})
export class ActivatePage implements OnInit {
    
  data: any;
  form: FormGroup;
  formList: any[];
  $regionList = this.xhrService.post(this.xhrService.getWebApi('Main').concat('Account/GetRegions'))

  constructor(
      private loaderService: LoaderService, 
      private formBuilder:FormBuilder, 
      private route: Router, 
      private activatedRoute: ActivatedRoute, 
      private navCtrl: NavController,
      private notificationService: NotificationService,  
      private privacyService: PrivacyService,       
      private xhrService: XhrService,       
      private authService: AuthService,
      private activateService: ActivateService,
      private router: Router
  ) {
      this.formList = [
        {ctrlName: 'firstName', displayName: 'NOME', inputType: 'text'},
        {ctrlName: 'lastName', displayName: 'COGNOME', inputType: 'text'},          
        {ctrlName: 'sex', displayName: 'SESSO', inputType: 'select', $optionsAsync: of([{title: 'Maschio', val: 'M'}, {title: 'Femmina', val: 'F'}])},
        {ctrlName: 'dataNascita', displayName: 'DATA DI NASCITA', inputType: 'date'},
        {ctrlName: 'eta', displayName: 'ETA', inputType: 'number'},
        {ctrlName: 'indirizzo', displayName: 'INDIRIZZO', inputType: 'text'},
        {ctrlName: 'city', displayName: 'CITTA\'', inputType: 'text'},
        {ctrlName: 'region', displayName: 'REGIONE', inputType: 'select', $optionsAsync: of([{"title":"Abruzzo","val":"Abruzzo"},{"title":"Basilicata","val":"Basilicata"},{"title":"Calabria","val":"Calabria"},{"title":"Campania","val":"Campania"},{"title":"Emilia-Romagna","val":"Emilia-Romagna"},{"title":"Friuli-Venezia Giulia","val":"Friuli-Venezia Giulia"},{"title":"Lazio","val":"Lazio"},{"title":"Liguria","val":"Liguria"},{"title":"Lombardia","val":"Lombardia"},{"title":"Marche","val":"Marche"},{"title":"Molise","val":"Molise"},{"title":"Piemonte","val":"Piemonte"},{"title":"Puglia","val":"Puglia"},{"title":"Sardegna","val":"Sardegna"},{"title":"Sicilia","val":"Sicilia"},{"title":"Toscana","val":"Toscana"},{"title":"Trentino-Alto Adige","val":"Trentino-Alto Adige"},{"title":"Umbria","val":"Umbria"},{"title":"osta","val":"Valle d'Aosta"},{"title":"Veneto","val":"Veneto"}])/* this.xhrService.post(this.xhrService.getWebApi('Main').concat('Account/GetRegions')) */},
        {ctrlName: 'nationality', displayName: 'NAZIONE', inputType: 'select', $optionsAsync: of([{title: 'Italia', val: 'IT'}, {title: 'Altro', val: 'Altro'}])},
        {ctrlName: 'altezza', displayName: 'ALTEZZA', inputType: 'number'},
        {ctrlName: 'weight', displayName: 'PESO', inputType: 'number'},
        {ctrlName: 'cardiopatia', displayName: 'CARDIPATICO', inputType: 'select', $optionsAsync: of([{title: 'Sì', val: 'Si'}, {title: 'No', val: 'No'}])},
        {ctrlName: 'email', displayName: 'EMAIL', inputType: 'text'},
        {ctrlName: 'uellCode', displayName: 'CODICE UELL', inputType: 'text'},
        {ctrlName: 'fitnessCenter', displayName: 'CENTRO FITNESS', inputType: 'text'}
      ]
  }    

  ngOnInit() {}
  
  ionViewWillEnter() {
      this.formInit(true);
      if(environment.seedFake){
        this.formSeed();
      }
  }




  // --------------------  Form  --------------------
  
  formInit(disabled: boolean) {
      var mxl: number = 50;
      var obj = {
        firstName: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(mxl)]],
        lastName: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(mxl)]],
        sex: [null, [Validators.required]],
        dataNascita: [null, [Validators.required]],
        eta: [null, [Validators.required]],
        indirizzo: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(mxl)]],
        city: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(mxl)]],
        region: [null, [Validators.required]],
        nationality: [null, [Validators.required]],
        altezza: [null, [Validators.required]],
        weight: [null, [Validators.required]],
        cardiopatia: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email, Validators.maxLength(mxl)]],
        uellCode: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(mxl)]],
        fitnessCenter: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(mxl)]],
        
        /* privacy_1: [false, [Validators.required]],
        privacy_2: [false, [Validators.required]] */
      }; 
      this.form = this.formBuilder.group(obj);
  }  

  formSeed() {
      var model = {
        "firstName": "Aldo",
        "lastName": "Mazzer",
        "sex": "M",
        "dataNascita": "2022-09-13T15:01:32.066Z",
        "eta": 20,
        "indirizzo": "via adige 1",
        "city": "Padova",
        "region": "Abruzzo",
        "nationality": "IT",
        "altezza": 180,
        "weight": 80,
        "cardiopatia": "No",
        "email": "mm@mm.it",
        "uellCode": "testCode",
        "fitnessCenter": "test"
      }
      this.form.patchValue(model, {emitEvent: false});
  }

  submit() { 
    /* if(!this.form.value.privacy_1 || !this.form.value.privacy_2){
      alert('Consenso a condizioni e privacy obbligatorio')
    }else{ */
      if(this.form.valid){
          console.log(this.form.value);
          let value = this.form.value;          
          this.loaderService.startLoader();
          this.xhrService.post(this.xhrService.getWebApi('Main').concat('Account/Activate'), value).subscribe(data => { 
            this.loaderService.stopLoader();
            this.activateService.setAuth(null, value, data).then((data) => { 
              console.log('ActivateService | ', 'setValue | ', data);
              this.redirect();              
            });
          })
        }else{
            this.notificationService.notify({title: 'Attenzione', content: 'Dati non corretti o mancanti'});
        }
    //}
  }

  disabled() { 
      //return this.form.pristine ? true : false;
      return this.form.invalid ? true : false;
  }

  redirect(){
    if(this.activatedRoute.snapshot.queryParamMap.get('fromUrl')){      
      this.navCtrl.back();
      //this.router.navigate([this.activatedRoute.snapshot.queryParamMap.get('fromUrl')]);    
    }else{
      this.router.navigate(['/intro']);
    }
  }
  
  formGetError(fieldName: string) {
      var form = this.form;
      let result = '';
      if (form instanceof FormGroup) { 
          if(form.controls[fieldName].hasError('required')) result = 'Campo obbligatorio';
          if(form.controls[fieldName].hasError('minlength')) result = 'Valore troppo breve';
          if(form.controls[fieldName].hasError('maxlength')) result = 'Valore troppo lungo';
          if(form.controls[fieldName].hasError('min')) result = 'Valore troppo basso';
          if(form.controls[fieldName].hasError('max')) result = 'Valore troppo lungo'; 
          if(form.controls[fieldName].hasError('email')) result = 'Formato email non corretto'; 
      }        
      return result; 
  }    
    
  formGetAllErrors(form: FormGroup | FormArray): { [key: string]: any; } | null {
    let hasError = false;
    const result = Object.keys(form.controls).reduce((acc, key) => {
        const control = form.get(key);
        const errors = (control instanceof FormGroup || control instanceof FormArray) ? this.formGetAllErrors(control) : control.errors;
        if (errors) {
            acc[key] = errors;
            hasError = true;
        }
        return acc;
    }, {} as { [key: string]: any; });
    return hasError ? result : null;
  }

  back() {
    this.navCtrl.back();
  } 

  passwordMatch(matchTo: string): ValidatorFn {
    return (control: AbstractControl, ): {[key: string]: any} | null => {  
        return !!control.parent && !!control.parent.value && control.value === control.parent.controls[matchTo].value ? null : { 'isMatching': true };   
    };
  }  

  getPrivacy(){
    this.privacyService.getPrivacy('client');
  }

}