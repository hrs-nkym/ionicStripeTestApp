import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayPlanCancelPageRoutingModule } from './pay-plan-cancel-routing.module';

import { PayPlanCancelPage } from './pay-plan-cancel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayPlanCancelPageRoutingModule
  ],
  declarations: [PayPlanCancelPage]
})
export class PayPlanCancelPageModule {}
