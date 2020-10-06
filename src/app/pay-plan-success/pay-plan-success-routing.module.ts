import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayPlanSuccessPage } from './pay-plan-success.page';

const routes: Routes = [
  {
    path: '',
    component: PayPlanSuccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayPlanSuccessPageRoutingModule {}
