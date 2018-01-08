import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Storage} from "@ionic/storage";
import 'rxjs/add/operator/map';
import * as AV from 'leancloud-storage'
import {LCStorageProvider} from "./lc-storage";

export class AccountBook extends AV.Object {
  userId: string
  time: Date
  type: string
  price: number
}

@Injectable()
export class MoneyService {
  constructor(public lcStorage: LCStorageProvider) {
    AV.Object.register(AccountBook);
  }
}
