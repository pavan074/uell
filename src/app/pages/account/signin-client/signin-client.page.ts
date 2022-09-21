import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { NotificationService } from '../../../module/shared/service/notification.service';
import { XhrService } from '../../../module/shared/service/xhr.service';
import { AuthService } from '../../../service/auth.service';
import { LoaderService } from '../../../service/loader.service';
import { PrivacyService } from '../../../service/privacy.service';
import * as moment from 'moment';
//import { Route } from '@angular/compiler/src/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-signin-client',
  templateUrl: './signin-client.page.html',
  styleUrls: ['./signin-client.page.scss'],
})
export class SigninClientPage implements OnInit {
    
  data: any;
  form: FormGroup;
  formList: any[];

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
      private router: Router
  ) {
      this.formList = [
          {ctrlName: 'nome', displayName: 'NOME', inputType: 'text'},
          {ctrlName: 'cognome', displayName: 'COGNOME', inputType: 'text'},          
          {ctrlName: 'email', displayName: 'EMAL/USERNAME', inputType: 'email'},
          {ctrlName: 'password', displayName: 'PASSWORD', inputType: 'password'},
          {ctrlName: 'passwordMatch', displayName: 'CONFERMA PASSWORD', inputType: 'password'},
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
        nome: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(mxl)]],
        cognome: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(mxl)]],
        email: [{value: null, disabled: this.isDisabled()}, [Validators.required, Validators.email, Validators.maxLength(mxl)]],
        password: [{value: null, disabled: this.isDisabled()}, [Validators.required, Validators.minLength(6), Validators.maxLength(mxl)]],
        passwordMatch: [{value: null, disabled: this.isDisabled()}, [Validators.required, this.passwordMatch('password')]],
        privacy_1: [false, [Validators.required]],
        privacy_2: [false, [Validators.required]]
      }; 
      this.form = this.formBuilder.group(obj);
  }    

  isDisabled() {
      //return this.activatedRoute.snapshot.paramMap.get('operationType') == 'update' ? true : false;
      return false;
  }

  formSeed() {
      var model = {
        "id":0,
        "nome": "Massimo",
        "cognome": "Pavan",
        "email": "test@test.com",
        "password": "test74",
        "passwordMatch": "test74",
      }
      this.form.patchValue(model, {emitEvent: false});
  }

  submit() { 
    if(!this.form.value.privacy_1 || !this.form.value.privacy_2){
      alert('Consenso a condizioni e privacy obbligatorio')
    }else{
      if(this.form.valid){
          console.log(this.form.value);
          //Signin
          let clientModel = this.form.value;
          
          this.loaderService.startLoader();
          this.xhrService.post(this.xhrService.getWebApi('BakeUp').concat('client'), clientModel).subscribe(data => { 
            this.loaderService.stopLoader();
            this.authService.setAuth('client', data).then((data) => { 
              console.log('AuthService | ', 'setClientValue | ', data);
              this.redirect();              
            });
          })
        }else{
            this.notificationService.notify({title: 'Attenzione', content: 'Dati non corretti o mancanti'});
        }
    }
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
      this.router.navigate(['/home-client']);
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