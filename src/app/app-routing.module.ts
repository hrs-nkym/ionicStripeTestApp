import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  // },
  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // },
  // 直下へのアクセスは /auth へリダイレクト
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { // 未ログイン状態でアクセスできる画面群のルーティング
    path: '',
    loadChildren: () => import('./pages/public/public.module').then(m => m.PublicModule)
  },
  { // ログイン状態でアクセスできる画面群のルーティング
    path: '',
    loadChildren: () => import('./pages/closed/closed.module').then(m => m.ClosedModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/public/auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'pay-plan-cancel',
    loadChildren: () => import('./pay-plan-cancel/pay-plan-cancel.module').then( m => m.PayPlanCancelPageModule)
  },
  {
    path: 'pay-plan-success',
    loadChildren: () => import('./pay-plan-success/pay-plan-success.module').then( m => m.PayPlanSuccessPageModule)
  },
  {
    path: 'pay-plan-payment',
    loadChildren: () => import('./pages/closed/pay-plan-payment/pay-plan-payment.module').then( m => m.PayPlanPaymentPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
