import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Storage} from "@ionic/storage";
import 'rxjs/add/operator/map';
import * as AV from 'leancloud-storage'
import {LCAppKey, LCAppId} from "../app.config";


@Injectable()
export class LCStorageProvider {
  constructor() {
    AV.init({appId: LCAppId, appKey: LCAppKey})
  }

  registerObject(Class) {
    return AV.Object.register(Class)
  }
}
