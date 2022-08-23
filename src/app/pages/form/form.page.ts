import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute, Params, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl, AbstractControl, Validators, ValidatorFn } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { DataService } from 'src/app/service/data.service';
import * as _data from '../../../assets/data/questionario.json';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  
  public qArea: string;
  public categoria: string;
  public index: number;
  public dataSet: any[];
  public data: any;
  public form: FormGroup; 

  constructor(private navController: NavController, public activatedRoute: ActivatedRoute, public formBuilder: FormBuilder, private dataService: DataService) {

    //Params
    this.qArea = activatedRoute.snapshot.paramMap.get('qArea');
    this.categoria = activatedRoute.snapshot.paramMap.get('categoria');
    this.index = +activatedRoute.snapshot.paramMap.get('index');

    //Data
    var _dataTemp = _data;
    this.dataSet = _dataTemp.data.filter(x=> x.qArea == this.qArea && x.categoria == this.categoria);
    this.data = this.dataSet[this.index];

    //Form
    this.formInit();
    this.formSeed();
    this.formSaveRegistration();
  }

  ngOnInit() {}

  formInit() {      
    let obj={}; 
    obj[this.data.num] = new FormControl({value: null});
    this.form = this.formBuilder.group(obj, /* { updateOn: "blur" } */ ); 
  } 

  formSeed(): void
  {
    let obj={}; 
    obj[this.data.num] = this.data.respText;
    this.form.patchValue(obj);
  }

  formSaveRegistration() {
    this.form.valueChanges.pipe(distinctUntilChanged(), debounceTime(0)).subscribe(data => {
      console.log(data);
      let value: any = {
        /* DocumentId : +this.activatedRoute.snapshot.paramMap.get('documentId'),
        IdSubSection : +this.activatedRoute.snapshot.paramMap.get('idSubSection'),
        Data: JSON.stringify(data) */
      };
      //this.xhrService.put({name: 'Contarina', url: 'forms'}, value).subscribe(data=>{});
    });
  }

  nextStep(){
    this.navController.navigateForward(['/form', this.qArea, this.categoria, this.index + 1]);
  }

  previousStep(){
    this.navController.navigateBack(['/form', this.qArea, this.categoria, this.index - 1]);
  }

  back() {
    this.navController.navigateBack(['/categoria-selection', this.qArea]);
  }
  
}
