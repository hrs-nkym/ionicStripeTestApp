// import { Component } from '@angular/core';
import { Component, OnInit } from '@angular/core';

// import { Platform } from '@ionic/angular';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavController } from '@ionic/angular';
import { AmplifyService } from 'aws-amplify-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    // private platform: Platform,
    // private splashScreen: SplashScreen,
    // private statusBar: StatusBar
    private navCtrl: NavController,
    private amplifyService: AmplifyService,
  ) {
    // this.initializeApp();
  }

  // initializeApp() {
  //   this.platform.ready().then(() => {
  //     this.statusBar.styleDefault();
  //     this.splashScreen.hide();
  //   });
  // }
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    this.amplifyService.authStateChange$.subscribe(authState => {
      switch (authState.state) {
        case 'signedIn':
          this.navCtrl.navigateForward(['/home']);
          break;
        case 'signedOut':
          this.navCtrl.navigateForward(['/auth']);
          break;
      }
    });
  }
}
