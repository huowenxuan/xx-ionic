import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Storage} from "@ionic/storage";
import 'rxjs/add/operator/map';
import * as AV from 'leancloud-storage'
import {LCStorageProvider} from "./lc-storage";

export class Note extends AV.Object {
  userId: string
  start?: Date // 开始时间，非必须，createdAt被LC占用了
  end: Date  // 日程结束时间
  text: string
}

@Injectable()
export class NoteService {
  constructor(public lcStorage: LCStorageProvider) {
    lcStorage.registerObject(Note)
  }

  async createNote(userId: string, start:Date, end: Date, text:string) {
    // 新建一个 Note 对象
    let note = new Note();
    note.set('userId', userId);
    note.set('start', start);
    note.set('end', end);
    note.set('text', text);
    return new Promise((resolve, reject) => {
      note.save().then(
        (res) => resolve(res.id),
        (error) => reject(error))
    })
  }

  updateNote(id, text, start, end) {
    let note = AV.Object.createWithoutData('Note', id)
    note.set('text', text)
    note.set('start', start)
    note.set('end', end)
    return new Promise((resolve, reject) => {
      note.save().then(
        (res) => resolve(res.id),
        (error) => reject(error))
    })
  }

  async getNotes(userId, skip = 0, limit = 10): Promise<any> {
    let query = new AV.Query(Note);
    query.equalTo('userId', userId);
    query.addDescending('end');
    query.skip(skip)
    query.limit(limit)

    return new Promise((resolve, reject) => {
      query.find().then(
        (results) => resolve(results),
        (error) => reject(error))
    })
  }

  /**
   * 获取某一日期范围内的note
   */
  getNotesRange(userId, from: Date, to: Date): Promise<any> {
    // 从第一天第0秒，到最后一天的最后一秒
    from.setHours(0);from.setMinutes(0);from.setSeconds(0)
    to.setHours(23);to.setMinutes(59);to.setSeconds(59)

    let query = new AV.Query(Note)
    query.equalTo('userId', userId)
    // 降序
    query.addDescending('end')
    // 超过
    query.greaterThanOrEqualTo('end', from)
    // 小于
    query.lessThanOrEqualTo('end', to)

    return new Promise((resolve, reject) => {
      query.find().then(
        (results) => resolve(results),
        (error) => reject(error))
    })
  }

  getANote(id) {
    let query = new AV.Query(Note);
    return new Promise((resolve, reject) => {
      query.get(id).then(
        (results) => resolve(results),
        (error) => reject(error))
    })
  }

  deleteNote(id) {
    let note = AV.Object.createWithoutData('Note', id);
    return new Promise((resolve, reject) => {
      note.destroy().then(
        (res) => resolve(),
        (error) => reject(error))
    })
  }
}
