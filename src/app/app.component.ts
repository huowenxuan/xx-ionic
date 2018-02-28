import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {TabsPage} from '../pages/tabs/tabs';
import {Keyboard} from "@ionic-native/keyboard";
import {SettingsProvider} from "../providers/settings";
import * as FastClick from 'fastclick'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
  menuPage: any

  selectedTheme: String
  themes = ['theme-pink', 'theme-eveylast', 'theme-fay', 'theme-dark', 'theme-grey-green', 'theme-yellow-purple', 'theme-basic', 'theme-warm']
  _randomThemeToggle

  watch = ''
  timeout = null

  constructor(platform: Platform,
              private statusBar: StatusBar,
              public keyboard: Keyboard,
              public settings: SettingsProvider,
              splashScreen: SplashScreen) {
    this.initTheme()
    // FastClick.attach(document.body)

    platform.ready().then(() => {
      splashScreen.hide();
      // this.statusBar.styleDefault() // styleLightContent
      this.statusBar.hide()
      keyboard.disableScroll(true)

    });

    this.setWatch()
  }


  set randomThemeToggle(toggle) {
    if (toggle) {
      let randomIdx = Math.floor(Math.random() * this.themes.length)
      this.settings.setTheme(this.themes[randomIdx])
    } else {
      this.settings.setTheme(this.selectedTheme)
    }

    this._randomThemeToggle = toggle
    this.settings.setThemeRandom(toggle)
  }

  get randomThemeToggle() {
    return this._randomThemeToggle
  }

  async initTheme() {
    this.selectedTheme = await this.settings.getTheme()
    this.randomThemeToggle  = await this.settings.getThemeRandom()
  }

  public toggleAppTheme(theme) {
    this.selectedTheme = theme
    this.settings.setTheme(theme);
  }

  setWatch() {
    if (this.timeout) return

    this.timeout = setInterval(()=>{
      let date = new Date()
      this.watch = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    }, 1000)
  }
}
