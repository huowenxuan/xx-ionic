import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastCmp, ToastController} from 'ionic-angular';
import LCStorage, {Note} from "../../utils/LCStorage";
import {Storage} from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-note-edit',
  templateUrl: 'note-edit.html',
})
export class NoteEditPage {
  time = new Date()
  input = ''
  note: Note

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
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
    if (!userId) {
      console.log('未登录')
      return
    }

    if (!text) {
      return
    }

    LCStorage.saveNote(userId, this.time, text)
    this.navCtrl.pop()
  }

  command(cmd) {
    this.input += cmd
  }
}
