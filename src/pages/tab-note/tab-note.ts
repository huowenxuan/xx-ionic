import {Component, ViewChild} from '@angular/core';
import {
  AlertController,
  IonicPage, MenuController,
  ModalController,
  NavController,
  NavParams, Platform, Tabs,
} from 'ionic-angular';
import {UserService} from "../../providers/user-service";
import {ControllersService} from "../../providers/controllers-service";
import {UtilsProvider} from "../../providers/utils";
import {SuperTabsController} from "ionic2-super-tabs";
import {NoteService} from "../../providers/note-service";
import {CalendarComponentOptions, CalendarModal, CalendarModalOptions} from "ion2-calendar";
import * as moment from "moment";
import {NoteEditPage} from "../note-edit/note-edit";
import {MarkdownPage} from "../markdown/markdown";
import {NoteSearchPage} from "../note-search/note-search";
import {MomsHolidayPage} from "../tools/moms-holiday/moms-holiday";

@Component({
  selector: 'page-tab-note',
  templateUrl: 'tab-note.html',
})
export class TabNotePage {
  notes = []
  offset = 0
  limit = 10

  calendar
  type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  calendarOptions: CalendarComponentOptions
  onCalendarChange = async ($event) => {
    this.notes = await this.noteService.getNotesRange(this.userService.userId, $event.toDate(), $event.toDate())
  }

  constructor(public params: NavParams,
              public navCtrl: NavController,
              public modalCtrl: ModalController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public noteService: NoteService,
              public utils: UtilsProvider,
              public ctrls: ControllersService,
              public userService: UserService,) {
    this.calendarOptions = {
      from: moment().subtract(10000, 'days').toDate(),
      to: new Date(),
      pickMode: 'single'
    };
  }

  async ionViewDidLoad() {
    if (this.userService.userId) {
      this.reload(true)
    }
  }

  async reload(loading?) {
    this.offset = 0

    let loader = this.ctrls.loading()
    if (loading) {
      loader.present()
    }
    this.notes = await this.noteService.getNotes(this.userService.userId, 0, this.limit)
    loader.dismiss()
  }

  async refresh(refresher) {
    await this.reload()
    refresher.complete()
  }

  toMarkdown(note) {
    this.navCtrl.push(MarkdownPage, {
      note: note,
      markdown: note.text,
      title: this.utils.formatDate(note.end),
      onEdit: () => this.reload()
    })
  }

  async loadMore(infiniteScroll) {
    this.offset += this.limit
    let notes = await this.noteService.getNotes(this.userService.userId, this.offset, this.limit)
    if (notes) {
      this.notes.push(...notes)
    }
    infiniteScroll.complete()
  }

  getTime(time, showDate) {
    if (!time) return ''
    let m = moment(time)
    let hour = m.hour()
    let min = m.minute()

    if (showDate) {
      let month = m.month() + 1
      let date = m.date()
      return `${month}/${date} ${hour}:${min}`
    }
    return `${hour}:${min}`
  }

  getDate(date) {
    if (!date) return ''
    let weekCns = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    let m = moment(date)
    let year = m.year()
    let month = m.month() + 1
    let day = m.date()
    let weekday = m.weekday()

    let end = `${month}/${day}\n${weekCns[weekday]}`
    if (!this.utils.isThisYear(date))
      end = `${end} ${year}`
    return end
  }

  showDate(note) {
    let shouldShow = true
    let index = this.notes.indexOf(note)
    if (index > -1) {
      let currentEnd = this.notes[index].end
      if (this.notes[index - 1]) {
        let lastEnd = this.notes[index - 1].end
        shouldShow = !this.utils.isSameDay(currentEnd, lastEnd)
      }
    }

    if (!shouldShow) return null
    return this.getDate(note.end)
  }

  showTime(note) {
    const {start, end} = note
    let showDate = start && end ? !this.utils.isSameDay(start, end) : false
    let startTime = this.getTime(start, showDate)
    let endTime = this.getTime(end, showDate)

    let time = endTime
    if (startTime) {
      time = `${startTime} - ${endTime}`
    }

    return time
  }

  deleteNote(note) {
    let doDelete = () => {
      this.noteService.deleteNote(note.id)
        .then(() => {
          this.ctrls.toast('删除成功').present()
          this.reload()
        })
    }

    let alert = this.alertCtrl.create({
      title: '确定删除？',
      message: '',
      mode: 'md',
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
    myCalendar.onDidDismiss(async date => {
      if (!date) return
      let from = date.from.dateObj
      let to = date.to.dateObj
      let loading = this.ctrls.loading()
      loading.present()
      let notes = await this.noteService.getNotesRange(this.userService.userId, from, to)
      loading.dismiss()
      this.createDaysMarkdown(notes)
    })
  }

  createDaysMarkdown(notes) {
    let markdown = ''
    let lastShowDate = null

    let sortedNotes = []
    let todayNotes = []
    notes.forEach((note: any) => {
      note.end = new Date(note.end)
      if (!this.utils.isSameDay(note.end, lastShowDate)) {
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
      let start = note.start && new Date(note.start)
      let end = new Date(note.end)
      if (!this.utils.isSameDay(end, lastShowDate)) {
        markdown += '------\n\n'
        lastShowDate = end
        markdown += `## ${end.getMonth() + 1}.${end.getDate()} \n`
      }

      let showStart = start ? `${start.getHours()}.${start.getMinutes()}` : ''
      let showEnd = `${end.getHours()}.${end.getMinutes()}`
      markdown += `### ${showStart}-${showEnd} \n`
      markdown += note.text + '\n\n'
    })

    this.navCtrl.push(MarkdownPage, {markdown: markdown})
  }

  toSearch() {
    this.navCtrl.push(NoteSearchPage)
  }
}
