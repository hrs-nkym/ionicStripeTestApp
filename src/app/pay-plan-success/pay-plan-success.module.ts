import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayPlanSuccessPageRoutingModule } from './pay-plan-success-routing.module';

import { PayPlanSuccessPage } from './pay-plan-success.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayPlanSuccessPageRoutingModule
  ],
  declarations: [PayPlanSuccessPage]
})
export class PayPlanSuccessPageModule {}
