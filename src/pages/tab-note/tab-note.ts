import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from "@ionic/storage";
import LCStorage from "../../utils/LCStorage";
import * as moment from 'moment';
import { Clipboard } from '@ionic-native/clipboard';

@Component({
  selector: 'page-tab-note',
  templateUrl: 'tab-note.html',
})
export class TabNotePage {
  notes

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public clipboard: Clipboard
  ) {
    this.notes = []
  }

  async ionViewDidLoad() {
    let userId = await this.storage.get("userId")
    if (userId) {
      this.notes = await LCStorage.getAllNote(userId)
    } else {
      console.log('未登录')
    }
  }

  showTime(createdAt) {
    let m = moment(createdAt)
    let year = m.month()
    let month = m.month()
    let day = m.date()
    let hour = m.hour()
    let minute = m.minute()
    return `${hour}:${minute}`
  }

  copy() {
    this.clipboard.copy('sss')
  }

}
