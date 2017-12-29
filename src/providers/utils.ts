import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import {Platform} from "ionic-angular";
import {ControllersService} from "./controllers-service";
import {Clipboard} from "@ionic-native/clipboard";
import * as moment from "moment";

@Injectable()
export class UtilsProvider {
  constructor( public platform: Platform,
                public ctrls: ControllersService,
                public clipboard: Clipboard,) {
  }

  copy(text: string) {
    if(this.platform.is('cordova')) {
      return this.clipboard.copy(text)
    } else {
      return new Promise((resolve, reject)=>
        this.copyForBrowser(text) ? resolve() : reject())
    }
  }

  private copyForBrowser(input) {
    const el = document.createElement('textarea');

    el.value = input;

    // Prevent keyboard from showing on mobile
    el.setAttribute('readonly', '');

    // el.style.contain = 'strict';
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    el.style.fontSize = '12pt'; // Prevent zooming on iOS

    const selection = document.getSelection();
    let originalRange
    if (selection.rangeCount > 0) {
      originalRange = selection.getRangeAt(0);
    }

    document.body.appendChild(el);
    el.select();

    // Explicit selection workaround for iOS
    el.selectionStart = 0;
    el.selectionEnd = input.length;

    let success = false;
    try {
      success = document.execCommand('copy');
    } catch (err) {}

    document.body.removeChild(el);

    if (originalRange) {
      selection.removeAllRanges();
      selection.addRange(originalRange);
    }

    return success;
  }

  formatDate(date: Date): string {
    date = new Date(date);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    let now = new Date();
    let mseconds = -(date.getTime() - now.getTime());
    let time_std = [1000, 60 * 1000, 60 * 60 * 1000, 24 * 60 * 60 * 1000];
    if (mseconds < time_std[3]) {
      if (mseconds > 0 && mseconds < time_std[1]) {
        return Math.floor(mseconds / time_std[0]).toString() + ' 秒前';
      }
      if (mseconds > time_std[1] && mseconds < time_std[2]) {
        return Math.floor(mseconds / time_std[1]).toString() + ' 分钟前';
      }
      if (mseconds > time_std[2]) {
        return Math.floor(mseconds / time_std[2]).toString() + ' 小时前';
      }
    } else {
      let thisYear = new Date().getFullYear();
      // year = (thisYear === year) ? '' : (year + '/');
      return month + '月' + day + '日';
    }
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
}
