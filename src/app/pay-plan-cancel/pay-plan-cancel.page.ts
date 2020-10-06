import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pay-plan-cancel',
  templateUrl: './pay-plan-cancel.page.html',
  styleUrls: ['./pay-plan-cancel.page.scss'],
})
export class PayPlanCancelPage implements OnInit {

  constructor(public toastController: ToastController,    private router: Router,) { }

  ngOnInit() {
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your settings have been saved.',
      duration: 2000
    });
    toast.present();
  }

  async cancelClick(){
     const toast = await this.toastController.create({
      header: 'Toast header',
      message: 'Click to Close',
      position: 'top',
      buttons: [
        {
          // side: '',
          icon: '',
          text: 'プランを解約しました。',
          handler: () => {
            this.router.navigate(['/home'])
          }
        }, {
          text: '閉じる',
          role: 'cancel',
          handler: () => {
            this.router.navigate(['/home'])
          }
        }
      ]
    });
    toast.present();
  }
}
