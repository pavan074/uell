import { Component, OnInit, ViewChild, Injectable, Pipe, PipeTransform } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute, Params, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, forkJoin, from, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter, merge, concatMap, flatMap, delay  } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormArray, FormControl, AbstractControl, Validators, ValidatorFn } from '@angular/forms';
import { XhrService } from '../../module/shared/service/xhr.service';
import { LoaderService } from 'src/app/service/loader.service';
import { DataService } from 'src/app/service/data.service';
//import * as _data from '../../../assets/data/questionario.json';



@Injectable({providedIn: 'root'})
export class FormService implements Resolve<any> {
  constructor(private loaderService: LoaderService, private xhrService: XhrService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let userId = route.params.userId;
    return this.xhrService.get(this.xhrService.getWebApi('Main').concat('Answers/GetAll?userId=' + userId));
  }
}



@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  
  public userId: number;
  public qArea: string;
  public categoria: string;
  public index: number;
  public dataSet: any[];
  public data: any;
  public form: FormGroup; 

  public eseguitoanswerAllowedVals: any[] = [{value: 'Sì'}, {value: 'No'}];

  constructor(private navController: NavController, public activatedRoute: ActivatedRoute, public formBuilder: FormBuilder, private loaderService: LoaderService, private xhrService: XhrService, private dataService: DataService) {
    this.userId = +activatedRoute.snapshot.paramMap.get('userId');
    this.qArea = activatedRoute.snapshot.paramMap.get('qArea');
    this.categoria = activatedRoute.snapshot.paramMap.get('categoria');
    this.index = +activatedRoute.snapshot.paramMap.get('index');
  }

  ngOnInit() {
    this.resolveData();  
  }

  resolveData(){  
    this.activatedRoute.data.pipe(map(x=>x.data)).subscribe(data => {
      //console.log(data);

      //Data
      if(this.categoria != 'null'){
        this.dataSet = data.filter(x=> x.qArea == this.qArea && x.categoria == this.categoria);
      }else{
        this.dataSet = data.filter(x=> x.qArea == this.qArea);
      }
      this.data = this.dataSet[this.index];
  
      //Form
      this.formInit();
      this.formSeed();
      this.formSaveRegistration();
    });
  }  

  formInit() {      
    let obj={ eseguito: null, risultato: null }; 
    obj[this.data.num] = new FormControl({value: null});
    this.form = this.formBuilder.group(obj, /* { updateOn: "blur" } */ ); 
  } 

  formSeed(): void
  {
    console.log(this.data);
    let obj = this.data; 
    obj[this.data.num] = this.data.respText;
    this.form.patchValue(obj);
  }

  formSaveRegistration() {
    this.form.valueChanges.pipe(distinctUntilChanged(), debounceTime(0)).subscribe(data => {
      console.log(data[this.data.num]);
      let value: any = {
        
        id: this.data.id,
        respText: data[this.data.num],
        eseguito: data.eseguito,
        risultato: data.risultato,
        notes: null

        /* DocumentId : +this.activatedRoute.snapshot.paramMap.get('documentId') */
      };
      this.xhrService.post(this.xhrService.getWebApi('Main').concat('Answers/SaveAnswers?userId=' + this.userId), value).subscribe(data=>{
        console.log(data);
      });
    });
  }

  nextStep(){
    this.navController.navigateForward(['/form', this.activatedRoute.snapshot.paramMap.get('userId'), this.qArea, this.categoria, this.index + 1]);
  }

  previousStep(){
    this.navController.navigateBack(['/form', this.activatedRoute.snapshot.paramMap.get('userId'), this.qArea, this.categoria, this.index - 1]);
  }

  back() {
    if(this.categoria != 'null'){ 
      this.navController.navigateBack(['/categoria-selection', this.activatedRoute.snapshot.paramMap.get('userId'), this.qArea]);
    }else{      
      this.navController.navigateBack(['/area-selection', this.activatedRoute.snapshot.paramMap.get('userId')]);
    }
  }
  
}
