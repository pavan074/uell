import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router, Params, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
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
  selector: 'app-new-password-supplier',
  templateUrl: './new-password-supplier.page.html',
  styleUrls: ['./new-password-supplier.page.scss'],
})
export class NewPasswordSupplierPage {
    
  form: FormGroup;

  constructor(
      private loaderService: LoaderService, 
      private formBuilder:FormBuilder, 
      private authService: AuthService, 
      private xhrService: XhrService,
      private router: Router, 
      private navCtrl: NavController,
      public notificationService: NotificationService,
      private activatedRoute: ActivatedRoute
  ) {
      this.createLoginForm(formBuilder);
  }
  
  createLoginForm(formBuilder: FormBuilder) {
    var mxl: number = 50;
    var obj = {
      userId: [this.activatedRoute.snapshot.paramMap.get('id'), [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(mxl)]],
      passwordMatch: ['', [Validators.required, this.passwordMatch('password')]]
    };    
    this.form = formBuilder.group(obj);
  }
  
  submit() {
    if (this.form.valid) {

      const value = {
        userId: this.form.controls.userId.value,
        password: this.form.controls.password.value
      };

      this.loaderService.startLoader();
      this.xhrService.post(this.xhrService.getWebApi('BakeUp').concat('passwordRecovery/new-password'), value).subscribe(data => {
        from(this.authService.setAuth('supplier', data)).subscribe(data => {  
          this.loaderService.stopLoader();
          this.router.navigateByUrl('/home-supplier'); 
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
          if(form.controls[fieldName].hasError('isMatching')) result = 'Password non corrispondenti';
      }        
      return result; 
  } 

  passwordMatch(matchTo: string): ValidatorFn {
    return (control: AbstractControl, ): {[key: string]: any} | null => {  
        return !!control.parent && !!control.parent.value && control.value === control.parent.controls[matchTo].value ? null : { 'isMatching': true };   
    };
  }  

  back() {
    this.navCtrl.back();
  }
  
}




