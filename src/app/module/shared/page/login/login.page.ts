import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';

//Service
import { AuthService } from '../../service/auth.service';
import { NotificationService } from '../../service/notification.service';

//Interface
import { Notification } from '../../interface/notification.interface';

//https://www.joshmorony.com/advanced-forms-validation-in-ionic-2/

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
    
    hidePassword: boolean;
    formStatus: boolean;
    form: FormGroup;
    localStorageKey: string;

    constructor(
        private formBuilder:FormBuilder, 
        private authService: AuthService, 
        private router: Router, 
        private navCtrl: NavController,
        public notificationService: NotificationService
    ) {
        this.hidePassword = true;
        this.formStatus = false;
        this.localStorageKey = 'user';

        this.createLoginForm(formBuilder);
        this.retrieveStoredCredential();
    }
    
    createLoginForm(formBuilder: FormBuilder) {
        var obj = {
          username: ['', [Validators.required, Validators.email, Validators.maxLength(20)]],
          password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
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

    retrieveStoredCredential() {
      const userString = localStorage.getItem(this.localStorageKey);
      const userObj = JSON.parse(userString);
      if (userObj) {
        this.form.controls['username'].setValue(userObj.username);
        this.form.controls['password'].setValue(window.atob(userObj.password));
        this.form.controls['remember'].setValue(userObj.remember);
      }
    }
    
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

          const userData = {
            username: this.form.controls.username.value,
            password: this.form.controls.password.value,
            //remember: this.form.controls.remember.value,
          };

          // Memorizzo le credenziali utente
          /* if (userData.remember === true) {
            localStorage.setItem(this.localStorageKey, JSON.stringify({username: userData.username, password: window.btoa(userData.password), remember: userData.remember}));
          } else {
            localStorage.removeItem(this.localStorageKey);
          } */
          
          //Eseguo il login server side
          /* this.authService.login(userData.username, userData.password).subscribe(
            data => { this.router.navigateByUrl('/home-supplier'); }
          ); */
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




