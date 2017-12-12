import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import {Storage} from "@ionic/storage";

@Injectable()
export class SettingsProvider {

  constructor(public storage: Storage) {
  }

  setTheme(theme) {
    this.storage.set('setting.theme', theme)
  }

  getTheme(){
    return this.storage.get('setting.theme')
  }

  setThemeRandom(isRandom: boolean) {
    return this.storage.set("setting.randomTheme", isRandom)
  }

  getThemeRandom() {
    return this.storage.get('setting.randomTheme')
  }
}
