import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController, ModalController } from '@ionic/angular';
import { PayPlanSuccessPage } from '../../../pay-plan-success/pay-plan-success.page';

import { AmplifyService } from 'aws-amplify-angular';
import { Auth } from '@aws-amplify/auth';
import { loadStripe } from '@stripe/stripe-js';
import { Router } from '@angular/router';
import { PayPlanCancelPage } from '@/app/pay-plan-cancel/pay-plan-cancel.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  // subApiGateway = 'https://runivwwps5.execute-api.ap-northeast-1.amazonaws.com/subscription';
  subApiGateway = 'https://i3y26vlp3i.execute-api.ap-northeast-1.amazonaws.com/sub';

  httpOptions = null;
  email = 'local@leafhub.me';
  // price = 'price_1HPjDaIwodtssiRUflmi6jRb';
  price = 'price_1HXMrEAaZtYZzHLQCgapRX3f';
  gid = 'gid_local_xxxxxx';
  name = 'leafhub,local';

  // PUBLIC_KEY = 'pk_test_51HMwm1IwodtssiRUiAReBUUSSXMqnwVFNcmnt3f4qYfO395RepPKWjChbtEHPn0PelhtCl7u9iQwloPwqbRGmvTr00Vqo1nldi';
  PUBLIC_KEY = 'pk_test_JYdiYD82MAZv5rHS6by6mKTn';
  DOMAIN = window.location.hostname;

  public slideConfig = {
    loop: true,
    spaceBetween: 3,
    centeredSlices: true,
    slidesPerView: 2.5,
  };
  public planItems = [
    { title: 'スターター月', explain: 'チームで利用する(5人まで)', price: '1,800', unit: '円/月', discription: ''},
    { title: 'スターター年', explain: 'チームで利用する(5人まで)', price: '900', unit: '円/月', discription: '50% off'},
    { title: 'ベーシック月', explain: '組織で利用する(10人まで)', price: '4,000', unit: '円/月', discription: ''},
    { title: 'ベーシック年', explain: '組織で利用する(10人まで)', price: '3,200', unit: '円/月', discription: '20% off'}
  ];

  constructor(
    private amplifyService: AmplifyService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  payment(page: any) {
    this.router.navigate(['/pay-plan-payment'], {queryParams: {hoge: 1}})
  }

  handleResult(result) {
    console.log('handleResult()', result);
  }

  onSignOutButtonClicked() {
    this.amplifyService.auth().signOut();
  }

<<<<<<< HEAD
  cancel(page: any) {
    this.router.navigate(['/pay-plan-cancel'], {queryParams: {hoge: 1}})
=======
  async presentModal() {
    const modal = await this.modalController.create({
      component: PayPlanSuccessPage,
    });
    return await modal.present();
  }

  cancelClick(page: any) {
    console.log('caceled!');
    this.router.navigate(['/pay-plan-cancel'], {queryParams: {hoge: 1}});
>>>>>>> 2dd8ea0bf4ef487a85c45a6b918b8bec225fc1c8
  }
}
