import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router'

@Component({
  selector: 'app-pay-plan-success',
  templateUrl: './pay-plan-success.page.html',
  styleUrls: ['./pay-plan-success.page.scss'],
})
export class PayPlanSuccessPage implements OnInit {

  constructor(
    private router: Router
 ) {
  }

  ngOnInit() {
  }

  close(){
    this.router.navigate(['/home'], {queryParams: {hoge: 1}})
  }
}
