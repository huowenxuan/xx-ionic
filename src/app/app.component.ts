import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {TabsPage} from '../pages/tabs/tabs';
import {Keyboard} from "@ionic-native/keyboard";
import {SettingsProvider} from "../providers/settings";
import {Storage} from "@ionic/storage";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
  menuPage: any

  selectedTheme: String
  themes = ['pink', 'eveylast', 'fay', 'dark', 'grey-green', 'yellow-purple', 'basic', 'warm']

  constructor(platform: Platform,
              private statusBar: StatusBar,
              public keyboard: Keyboard,
              public settings: SettingsProvider,
              public storage: Storage,
              splashScreen: SplashScreen) {
    this.initTheme()

    platform.ready().then(() => {
      splashScreen.hide();
      this.statusBar.styleLightContent()
      keyboard.disableScroll(true)
    });
  }

  initTheme() {
    this.storage.get("theme")
      .then((theme) => {
        if (theme) {
          this.selectedTheme = theme
          this.settings.setActiveTheme(theme)
        }
      })
    this.settings.getActiveTheme().subscribe(val => {
      this.selectedTheme = val
      this.storage.set("theme", val)
    });
  }

  public toggleAppTheme(theme) {
    this.settings.setActiveTheme('theme-' + theme);
  }
}
