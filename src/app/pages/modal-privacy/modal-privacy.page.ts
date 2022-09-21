import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal-privacy',
  templateUrl: './modal-privacy.page.html',
  styleUrls: ['./modal-privacy.page.scss'],
})
export class ModalPrivacyPage implements OnInit {
  
  data: any;

  constructor(private modalController: ModalController, private navParams: NavParams) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.data = this.navParams.get('data');
  }  

  back(){
    this.dismissModal();
  }  

  async dismissModal(action?: string) {
    await this.modalController.dismiss({
      action: action
    });
  }

}
