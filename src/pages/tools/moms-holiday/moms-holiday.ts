import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import * as moment from "moment";
import {Storage} from "@ionic/storage";
import {CalendarComponentOptions, DayConfig} from "ion2-calendar";
import {UtilsProvider} from "../../../providers/utils";

/**
 * Generated class for the MomsHolidayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// 显示今日之前的几天
const beforeDay = 10

@IonicPage()
@Component({
  selector: 'page-moms-holiday',
  templateUrl: 'moms-holiday.html',
})
export class MomsHolidayPage {
  lastHoliday: string

  _lastPicker

  type: 'string'
  calendar
  calendarOptions: CalendarComponentOptions = {
    from: moment().subtract(beforeDay, 'day').toDate(),
    monthPickerFormat: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
  }

  constructor(public navCtrl: NavController,
              public storage: Storage,
              public utils: UtilsProvider,
              public navParams: NavParams) {
    this.init()
  }

  ionViewDidLoad() {
  }

  set lastPicker(picker) {
    this._lastPicker = picker
    this.update(picker)
  }

  get lastPicker() {
    return this._lastPicker
  }

  async update(picker) {
    this.lastHoliday = moment(this.utils.isoToDate(picker))
      .format('YYYY-MM-DD')
    await this.saveStorage(this.lastHoliday)
    this.cal()
  }

  async init() {
    let date = moment(await this.getStorage()).toDate()
    this.lastPicker = this.utils.dateToISO(date)
    this.cal()
  }

  async getStorage() {
    this.lastHoliday = await this.storage.get('moms-holiday')
    if (!this.lastHoliday) {
      this.lastHoliday = '2018-07-13'
      await this.saveStorage(this.lastHoliday)
    }
    return this.lastHoliday
  }

  async saveStorage(day) {
    await this.storage.set('moms-holiday', day)
  }

  cal() {
    let dayMsgs = []
    // 上一个假日
    let lastHoliday = moment(this.lastHoliday)
    // 上一个周期的工作日，假日往前提3天。作为周期的开始
    let lastWeekday = lastHoliday.subtract(3, 'day')
    let current = moment()
      .hour(0)
      .minute(0)
      .second(0)
      .millisecond(0)
      .subtract(beforeDay, 'day')
    for (let i = 0; i < 100; i++) {
      let diff = current.diff(lastWeekday, 'day')
      let index = diff % 5
      if (diff < 0) {
        current = current.add(1, 'day')
        continue
      }

      let msg: any = {date: current.toDate()}
      switch (index) {
        case 0:
          msg.title = '👇'
          break
        case 1:
          msg.title = '☝️'
          break
        case 2:
          msg.title = '🌙'
          break
        default:
          msg.title = '💤'
          console.log(current.format('YYYY-MM-DD'))
          if (index === 4) {
            console.log('---------')
          }
      }
      current = current.add(1, 'day')
      dayMsgs.push(msg)
    }
    this.calendarOptions = {
      ...this.calendarOptions,
      daysConfig: dayMsgs.map(({date, title}) => ({
          date,
          marked: true,
          disabled: false,
          subTitle: title,
        })
      )
    }
  }

}
