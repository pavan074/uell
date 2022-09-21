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

@Component({
  selector: 'app-password-recovery-supplier',
  templateUrl: './password-recovery-supplier.page.html',
  styleUrls: ['./password-recovery-supplier.page.scss'],
})
export class PasswordRecoverySupplierPage {
    
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
      public notificationService: NotificationService, 
      public alertController: AlertController
  ) {
      this.hidePassword = true;
      this.formStatus = false;
      this.localStorageKey = 'user';

      this.createLoginForm(formBuilder);
      //this.retrieveStoredCredential();
  }
  
  createLoginForm(formBuilder: FormBuilder) {
      var obj = {
        username: ['', [Validators.required, Validators.email, Validators.maxLength(50)]]
      };    
      this.form = formBuilder.group(obj);
      this.form.valueChanges.subscribe(value => {
          this.formStatusCheck(value);
      });
  }
  
  formStatusCheck(value) {
      this.formStatus = (this.form.valid) ? true : false;
  }
  
  getErrorMessage(fieldName: string) {
      if(fieldName === 'username'){
          if(this.form.controls.username.hasError('required')){
              return 'Inserire un valore'; 
          } 
          if(this.form.controls.username.hasError('maxlength')){
              return 'Valore superiore ai 50 caratteri'; 
          }           
      }
  }
  
  submit() {
    if (this.formStatus === true) {

      const value = {
        username: this.form.controls.username.value
      };

      this.loaderService.startLoader();
      this.xhrService.post(this.xhrService.getWebApi('BakeUp').concat('passwordRecovery/password-recovery-mail'), value).subscribe(data => {
        this.loaderService.stopLoader();
        this.presentAlert();
        this.router.navigateByUrl('/walkthrought');
        /* from(this.authService.setAuth('supplier', data)).subscribe(data => {  
          this.loaderService.stopLoader();
          this.router.navigateByUrl('/home-supplier'); 
        });  */
      })

    }else{
      this.notificationService.notify({title: 'Attenzione', content: 'Dati non corretti o mancanti'});
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Recupero credenziali',
      //subHeader: notification.subtitle,
      message: 'Ti abbiamo mandato un\'email al tuo indirizzo di posta elettronica. Utilizza il link presente nel messaggio per modificare la tua password.',
      buttons: ['OK']
    });

    await alert.present();
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




