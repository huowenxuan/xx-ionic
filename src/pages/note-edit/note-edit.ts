import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastCmp, ToastController} from 'ionic-angular';
import LCStorage, {Note} from "../../utils/LCStorage";
import {UserService} from "../../providers/user-service";

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
    public loadingCtrl: LoadingController,
    public userService: UserService,
    public toastCtrl: ToastController) {
    let note = navParams.get('note')
    if (note) {
    }
  }

  ionViewDidLoad() {
  }

  async save() {
    let text = this.input
    if (!text) {
      return
    }

    let onSuccess = this.navParams.get('onSuccess')
    let loader = this.loadingCtrl.create({content: "Please wait...",})
    loader.present()

    LCStorage.createNote(this.userService.userId, this.time, text)
      .then((noteId)=>{
        loader.dismiss()
        onSuccess && onSuccess(noteId)
        this.toastCtrl.create({
          message: '保存成功',
          duration: 2000,
          position: 'bottom'
        }).present()
        this.navCtrl.pop()
      })
      .catch(()=>{
        loader.dismiss()
        this.toastCtrl.create({
          message: '保存失败',
          duration: 2000,
          position: 'bottom'
        }).present()
      })
  }

  command(cmd) {
    this.input += cmd
  }
}
