import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AmplifyIonicModule, AmplifyService } from 'aws-amplify-angular';

const modules = [
  FormsModule,
  IonicModule,
  CommonModule,
  AmplifyIonicModule,
];

@NgModule({
  declarations: [],
  // imports: [
  //   CommonModule
  // ]
  imports: [...modules],
  exports: [...modules],
  providers: [AmplifyService]
})
export class SharedModule { }
