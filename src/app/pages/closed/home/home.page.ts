import { Component } from '@angular/core';
import { AmplifyService } from "aws-amplify-angular";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private amplifyService: AmplifyService,
  ) {}

  onSignOutButtonClicked() {
    this.amplifyService.auth().signOut();
  }
}
