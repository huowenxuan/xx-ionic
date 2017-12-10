import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {TabsPage} from '../pages/tabs/tabs';
import {Keyboard} from "@ionic-native/keyboard";
import {SettingsProvider} from "../providers/settings";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
  selectedTheme: String = 'theme-pink'

  constructor(platform: Platform,
              private statusBar: StatusBar,
              public keyboard: Keyboard,
              private settings: SettingsProvider,
              splashScreen: SplashScreen) {
    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);

    platform.ready().then(() => {
      splashScreen.hide();
      this.statusBar.styleLightContent()
      keyboard.disableScroll(true)
    });
  }
}
