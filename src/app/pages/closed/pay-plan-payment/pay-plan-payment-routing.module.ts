import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayPlanPaymentPage } from './pay-plan-payment.page';

const routes: Routes = [
  {
    path: '',
    component: PayPlanPaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayPlanPaymentPageRoutingModule {}
