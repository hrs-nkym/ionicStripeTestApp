import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { IonicModule } from '@ionic/angular';
// import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
// import { HomePageRoutingModule } from './home-routing.module';
import { SharedModule } from '@/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: HomePage}]),
    // CommonModule,
    // FormsModule,
    // IonicModule,
    // HomePageRoutingModule
  ],
  declarations: [HomePage, ]
})
export class HomePageModule {}
