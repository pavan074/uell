import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { Observable, forkJoin, from } from 'rxjs';
import { map, merge, concatMap, flatMap  } from 'rxjs/operators';
import { XhrService } from '../../../module/shared/service/xhr.service';

//Service
import { AuthService } from '../../../service/auth.service';
import { LoaderService } from '../../../service/loader.service';
import { NotificationService } from '../../../module/shared/service/notification.service';

//Interface
import { Notification } from '../../../module/shared/interface/notification.interface';

//https://www.joshmorony.com/advanced-forms-validation-in-ionic-2/

@Component({
  selector: 'app-login-supplier',
  templateUrl: './login-supplier.page.html',
  styleUrls: ['./login-supplier.page.scss'],
})
export class LoginSupplierPage {
    
  hidePassword: boolean;
  formStatus: boolean;
  form: FormGroup;
  localStorageKey: string;

  constructor(
      private loaderService: LoaderService, 
      private formBuilder:FormBuilder, 
      private authService: AuthService, 
      private xhrService: XhrService,
      private router: Router, 
      private navCtrl: NavController,
      public notificationService: NotificationService
  ) {
      this.hidePassword = true;
      this.formStatus = false;
      this.localStorageKey = 'user';

      this.createLoginForm(formBuilder);
      //this.retrieveStoredCredential();
  }
  
  createLoginForm(formBuilder: FormBuilder) {
    var mxl: number = 50;
    var obj = {
      username: ['', [Validators.required, Validators.email, Validators.maxLength(mxl)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(mxl)]],
      //remember: [false, []]
    };    
    this.form = formBuilder.group(obj);
    this.form.valueChanges.subscribe(value => {
        this.formStatusCheck(value);
    });
  }
  
  formStatusCheck(value) {
      this.formStatus = (this.form.valid) ? true : false;
  }

  /* retrieveStoredCredential() {
    const userString = localStorage.getItem(this.localStorageKey);
    const userObj = JSON.parse(userString);
    if (userObj) {
      this.form.controls['username'].setValue(userObj.username);
      this.form.controls['password'].setValue(window.atob(userObj.password));
      this.form.controls['remember'].setValue(userObj.remember);
    }
  } */
  
  getErrorMessage(fieldName: string) {
      if(fieldName === 'username'){
          if(this.form.controls.username.hasError('required')){
              return 'Inserire un valore'; 
          } 
          if(this.form.controls.username.hasError('maxlength')){
              return 'Valore superiore ai 20 caratteri'; 
          }           
      }
      if(fieldName === 'password'){
          if(this.form.controls.password.hasError('required')){
              return 'Inserire un valore'; 
          } 
          if(this.form.controls.password.hasError('maxlength')){
              return 'Valore superiore ai 20 caratteri'; 
          }           
      }
  }
  
  submit() {
    if (this.formStatus === true) {

      const value = {
        username: this.form.controls.username.value,
        password: this.form.controls.password.value
      };

      this.loaderService.startLoader();
      this.xhrService.post(this.xhrService.getWebApi('BakeUp').concat('authentication'), value).subscribe(data => {
        let userType = data.userType == 'seller' ? 'supplier' : data.userType;
        from(this.authService.setAuth(userType, data.user)).subscribe(data => { 
          this.loaderService.stopLoader();
          this.router.navigateByUrl('/intro');
        }); 
      })

    }else{
      this.notificationService.notify({title: 'Attenzione', content: 'Dati non corretti o mancanti'});
    }
  }
  
  formGetError(fieldName: string) {
      var form = this.form;
      let result = '';
      if (form instanceof FormGroup) { 
          if(form.controls[fieldName].hasError('required')) result = 'Campo obbligatorio';
          if(form.controls[fieldName].hasError('maxlength')) result = 'Valore troppo lungo';
          if(form.controls[fieldName].hasError('minlength')) result = 'Valore troppo breve';
          if(form.controls[fieldName].hasError('min')) result = 'Valore troppo basso';
          if(form.controls[fieldName].hasError('max')) result = 'Valore troppo lungo'; 
          if(form.controls[fieldName].hasError('email')) result = 'Formato email non corretto'; 
      }        
      return result; 
  } 

  back() {
    this.navCtrl.back();
  }
  
}




