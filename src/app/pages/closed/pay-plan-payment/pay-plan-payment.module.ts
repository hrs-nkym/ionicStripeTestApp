import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayPlanPaymentPageRoutingModule } from './pay-plan-payment-routing.module';

import { PayPlanPaymentPage } from './pay-plan-payment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayPlanPaymentPageRoutingModule
  ],
  declarations: [PayPlanPaymentPage]
})
export class PayPlanPaymentPageModule {}
