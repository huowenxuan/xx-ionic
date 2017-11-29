import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import LCStorage, {Note} from "../../utils/LCStorage";
import {Storage} from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-note',
  templateUrl: 'note.html',
})
export class NotePage {
  time = new Date()
  input = ''
  note: Note

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage) {
    let note = navParams.get('note')
    if (note) {
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotePage');
  }

  async save() {
    let text = this.input
    let userId = await this.storage.get("userId")
    if (userId) {
      LCStorage.saveNote(userId, this.time, text)
      this.navCtrl.pop()
    } else {
      console.log('未登录')
    }
  }
}
