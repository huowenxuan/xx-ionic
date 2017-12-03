import {Component} from '@angular/core';
import {
  AlertController,
  IonicPage,
  LoadingController,
  ModalController,
  NavController,
  NavParams,
  ToastController
} from 'ionic-angular';
import LCStorage from "../../utils/LCStorage";
import * as moment from 'moment';
import {Clipboard} from '@ionic-native/clipboard';
import {UserService} from "../../providers/user-service";
import {NoteEditPage} from "../note-edit/note-edit";
import {CalendarModal, CalendarModalOptions, DayConfig} from "ion2-calendar";
import {MarkdownPage} from "../markdown/markdown";
import {timestamp} from "rxjs/operator/timestamp";

@Component({
  selector: 'page-tab-note',
  templateUrl: 'tab-note.html',
})
export class TabNotePage {
  notes = []
  skip = 0
  limit = 10

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController,
              public userService: UserService,
              public loadingCtrl: LoadingController) {
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

  isSameDay(d1, d2) {
    if (!d1 || !d2) return false

    let m1 = moment(d1)
    let m2 = moment(d2)
    if (m1.year() != m2.year()) return false
    return m1.date() === m2.date() && m1.month() === m2.month()
  }

  showTime(createdAt) {
    let m = moment(createdAt)
    let hour = m.hour()
    let min = m.minute()
    return `${hour}:${min}`
  }

  showDate(date) {
    if (this.isSameDay(date, Date.now())) {
      return ''
    }
    let weekCns = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

    let m = moment(date)
    let year = m.year()
    let month = m.month() + 1
    let day = m.date()
    let weekday = m.weekday()

    let time = `${month}/${day} ${weekCns[weekday - 1]}`
    if (!this.isThisYear(date)) {
      time = `${year}/${time}`
    }
    return time
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
      onSuccess: () => this.reload()
    })
  }

  toDaysMarkdown() {
    const options: CalendarModalOptions = {
      pickMode: 'range',
      title: '选择日期',
      defaultDate: new Date(),
      defaultDates: [new Date()],
      defaultDateRange: {from: new Date(), to: new Date()},
      from: moment().subtract(60, 'days').toDate(),
      to: new Date(),
      defaultScrollTo: new Date(),
      monthFormat: 'YYYY 年 MM 月 ',
      weekdays: ['日', '一', '二', '三', '四', '五', '六'],
      weekStart: 0,
      color: 'dark'
    };
    let myCalendar = this.modalCtrl.create(CalendarModal, {
      options: options
    });

    myCalendar.present();
    this.toastCtrl.create({
      message: '如果只选择一天，点击两下即可',
      duration: 2000,
      position: 'bottom'
    }).present()
    myCalendar.onDidDismiss(date => {
      console.log(date)
      let from = date.from.dateObj
      let to = date.to.dateObj
      LCStorage.getNotesRange(this.userService.userId, from, to)
        .then((notes)=>{
          this.createDaysMarkdown(notes)
        })
    })
  }

  createDaysMarkdown(notes) {
    let markdown = ''
    let lastShowDate
    notes.forEach(({attributes: note}: any, index)=>{
      note.time = new Date(note.time)
      if (!this.isSameDay(note.time, lastShowDate)) {
        lastShowDate = note.time
        markdown += `## ${note.time.getMonth()+1}.${note.time.getDate()} \n`
      }

      markdown += `### -${note.time.getHours()}.${note.time.getMinutes()} \n`
      markdown += note.text + '\n ----- \n'
    })

    this.navCtrl.push(MarkdownPage, {markdown: markdown})
  }

}
