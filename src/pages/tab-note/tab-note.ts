import {Component} from '@angular/core';
import {
  AlertController,
  IonicPage, MenuController,
  ModalController,
  NavController,
  NavParams, Platform,
} from 'ionic-angular';
import LCStorage from "../../utils/LCStorage";
import * as moment from 'moment';
import {Clipboard} from '@ionic-native/clipboard';
import {UserService} from "../../providers/user-service";
import {NoteEditPage} from "../note-edit/note-edit";
import {CalendarModal, CalendarModalOptions, DayConfig} from "ion2-calendar";
import {MarkdownPage} from "../markdown/markdown";
import {ControllersService} from "../../providers/controllers-service";
import {SettingsProvider} from "../../providers/settings";

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
              public menu: MenuController,
              public ctrls: ControllersService,
              public userService: UserService,) {
  }

  async ionViewDidLoad() {
    if (this.userService.userId) {
      this.reload(true)
    }
  }

  async reload(loading?) {
    this.skip = 0

    let loader = this.ctrls.loading()
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

  getTime(createdAt) {
    if (!createdAt) return ''
    let m = moment(createdAt)
    let hour = m.hour()
    let min = m.minute()
    return `${hour}:${min}`
  }

  getDate(date) {
    if (!date) return ''
    if (this.isSameDay(date, Date.now())) return ''

    let weekCns = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    let m = moment(date)
    let year = m.year()
    let month = m.month() + 1
    let day = m.date()
    let weekday = m.weekday()

    let end = `${month}/${day} ${weekCns[weekday]}`
    if (!this.isThisYear(date)) {
      end = `${year}/${end}`
    }
    return end + '  '
  }

  showTime(start, end) {
    let endDate = this.getDate(end)
    let startTime = this.getTime(start)
    let endTime = this.getTime(end)

    let time = endTime
    if (startTime) {
      time = `${startTime} - ${endTime}`
    }

    return `${endDate}${time}`
  }

  deleteNote(note) {
    let doDelete = () => {
      LCStorage.deleteNote(note.id)
        .then(() => {
          this.ctrls.toast('删除成功').present()
          this.reload()
        })
    }

    let alert = this.alertCtrl.create({
      title: '确定删除？',
      message: '',
      buttons: [
        {text: '取消', role: 'cancel'},
        {text: '删除', handler: () => doDelete()}
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
    this.ctrls.toast('如果只选择一天，点击两下即可').present()
    myCalendar.onDidDismiss(date => {
      if (!date) return
      let from = date.from.dateObj
      let to = date.to.dateObj
      LCStorage.getNotesRange(this.userService.userId, from, to)
        .then((notes) => {
          this.createDaysMarkdown(notes)
        })
    })
  }

  createDaysMarkdown(notes) {
    let markdown = ''
    let lastShowDate = null

    let sortedNotes = []
    let todayNotes = []
    notes.forEach(({attributes: note}: any, index) => {
      note.end = new Date(note.end)
      if (!this.isSameDay(note.end, lastShowDate)) {
        lastShowDate = note.end
        todayNotes.reverse()
        sortedNotes.push(...todayNotes)
        todayNotes = [note]
      } else {
        todayNotes.push(note)
      }
    })
    todayNotes.reverse()
    sortedNotes.push(...todayNotes)

    lastShowDate = null
    sortedNotes.forEach((note: any, index) => {
      note.end = new Date(note.end)
      if (!this.isSameDay(note.end, lastShowDate)) {
        markdown += '------\n\n'
        lastShowDate = note.end
        markdown += `## ${note.end.getMonth() + 1}.${note.end.getDate()} \n`
      }

      let showStart = note.start ? `${note.start.getHours()}.${note.start.getMinutes()}` : ''
      let showEnd = `${note.end.getHours()}.${note.end.getMinutes()}`
      markdown += `### ${showStart}-${showEnd} \n`
      markdown += note.text + '\n\n'
    })

    this.navCtrl.push(MarkdownPage, {markdown: markdown})
  }

}
