import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pay-plan-success',
  templateUrl: './pay-plan-success.page.html',
  styleUrls: ['./pay-plan-success.page.scss'],
})
export class PayPlanSuccessPage implements OnInit {

  constructor(public modalController: ModalController) {
  }

  ngOnInit() {
  }

  close(){
    this.modalController.dismiss();
  }
}
