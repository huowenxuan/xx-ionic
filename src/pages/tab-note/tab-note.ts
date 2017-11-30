import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import LCStorage from "../../utils/LCStorage";
import * as moment from 'moment';
import {Clipboard} from '@ionic-native/clipboard';
import {UserService} from "../../providers/user-service";
import {NoteEditPage} from "../note-edit/note-edit";

@Component({
  selector: 'page-tab-note',
  templateUrl: 'tab-note.html',
})
export class TabNotePage {
  notes = []
  skip = 0
  limit = 10

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController,
              public userService: UserService,
              public loadingCtrl: LoadingController,
              public clipboard: Clipboard) {
  }

  async ionViewDidLoad() {
    if (this.userService.userId) {
      this.reload(true)
    }
  }

  async reload(loading?) {
    this.skip = 0

    let loader = this.loadingCtrl.create({content: "Please wait...",})
    if (loading) {
      loader.present()
    }
    this.notes = await LCStorage.getNotes(this.userService.userId, 0, this.limit)
    loader.dismiss()
  }

  async refresh(refresher) {
    await this.reload()
    refresher.complete()
  }

  async loadMore(infiniteScroll) {
    this.skip += this.limit
    let notes = await LCStorage.getNotes(this.userService.userId, this.skip, this.limit)
    if (notes) {
      this.notes.push(...notes)
    }
    infiniteScroll.complete()
  }

  isThisYear(date) {
    return moment(date).year() === moment().year()
  }

  isToday(date) {
    let m = moment(date)
    let year = m.year()
    let month = m.month()
    let day = m.date()

    let nowM = moment()
    let nowYear = nowM.year()
    let nowMonth = nowM.month()
    let nowDay = nowM.date()
    if (year != nowYear) {
      return false
    }

    return day === nowDay && month === nowMonth
  }

  showTime(createdAt) {
    let m = moment(createdAt)
    let hour = m.hour()
    let min = m.minute()
    return `${hour}:${min}`
  }

  showDate(date) {
    if (this.isToday(date)) {
      return ''
    }
    let weekCns = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

    let m = moment(date)
    let year = m.year()
    let month = m.month()
    let day = m.date()
    let weekday = m.weekday()

    let time = `${month}/${day} ${weekCns[weekday - 1]}`
    if (!this.isThisYear(date)) {
      time = `${year}/${time}`
    }
    return time
  }

  copy() {
    this.clipboard.copy('sss')
  }

  deleteNote(note) {
    let alert = this.alertCtrl.create({
      title: '确定删除？',
      message: '',
      buttons: [
        {text: '取消', role: 'cancel'},
        {
          text: '删除', handler: () => {
          LCStorage.deleteNote(note.id)
            .then(() => {
              this.toastCtrl.create({
                message: '删除成功',
                duration: 2000,
                position: 'bottom'
              }).present()

              this.reload()
            })
        }
        }
      ]
    });
    alert.present();
  }

  toEdit(note) {
    this.navCtrl.push(NoteEditPage, {
      note,
      onSuccess: ()=>this.reload()
    })
  }
}
