import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {TabsPage} from '../pages/tabs/tabs';
import {Keyboard} from "@ionic-native/keyboard";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(platform: Platform,
              statusBar: StatusBar,
              public keyboard: Keyboard,
              splashScreen: SplashScreen) {
    platform.ready().then(() => {
      splashScreen.hide();
      statusBar.styleBlackOpaque()
      keyboard.disableScroll(true)
    });
  }
}
