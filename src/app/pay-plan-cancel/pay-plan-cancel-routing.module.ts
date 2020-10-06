import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayPlanCancelPage } from './pay-plan-cancel.page';

const routes: Routes = [
  {
    path: '',
    component: PayPlanCancelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayPlanCancelPageRoutingModule {}
