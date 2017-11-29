import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import LCStorage from "../../utils/LCStorage";
import * as moment from 'moment';
import {Clipboard} from '@ionic-native/clipboard';

@Component({
  selector: 'page-tab-note',
  templateUrl: 'tab-note.html',
})
export class TabNotePage {
  notes = []
  userId
  skip = 0
  limit = 10

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storage: Storage,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController,
              public clipboard: Clipboard) {
  }

  async ionViewDidLoad() {
    this.userId = await this.storage.get("userId")
    if (this.userId) {
      this.reload()
    } else {
      console.log('未登录')
    }
  }

  async reload() {
    this.skip = 0
    this.notes = await LCStorage.getNotes(this.userId, 0, this.limit)
  }

  async refresh(refresher) {
    await this.reload()
    refresher.complete()
  }

  async loadMore(infiniteScroll) {
    this.skip += this.limit
    let notes = await LCStorage.getNotes(this.userId, this.skip, this.limit)
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
}
