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
  menuPage: any

  selectedTheme: String
  themes = ['theme-pink', 'theme-eveylast', 'theme-fay', 'theme-dark', 'theme-grey-green', 'theme-yellow-purple', 'theme-basic', 'theme-warm']
  _randomThemeToggle

  constructor(platform: Platform,
              private statusBar: StatusBar,
              public keyboard: Keyboard,
              public settings: SettingsProvider,
              splashScreen: SplashScreen) {
    this.initTheme()

    platform.ready().then(() => {
      splashScreen.hide();
      this.statusBar.styleLightContent()
      keyboard.disableScroll(true)
    });
  }

  set randomThemeToggle(toggle) {
    this._randomThemeToggle = toggle
    this.settings.setThemeRandom(toggle)
  }

  get randomThemeToggle() {
    return this._randomThemeToggle
  }

  async initTheme() {
    let theme = await this.settings.getTheme()
    this.selectedTheme = theme || this.themes[0]

    this.randomThemeToggle  = await this.settings.getThemeRandom()
    if (this.randomThemeToggle) {
      let randomIdx = Math.floor(Math.random() * this.themes.length)
      this.settings.setTheme(this.themes[randomIdx])
    }
  }

  public toggleAppTheme(theme) {
    this.selectedTheme = theme
    this.settings.setTheme(theme);
  }
}
