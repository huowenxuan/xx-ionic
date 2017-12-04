import AV from 'leancloud-storage'
import {LCAppKey, LCAppId} from "../app.config";

AV.init({appId: LCAppId, appKey: LCAppKey})

export class Note extends AV.Object {
}

AV.Object.register(Note);

export default class LCStorage {

  static async createNote(userId: string, time: Date, text:string) {
    // 新建一个 Note 对象
    let note = new Note();
    note.set('userId', userId);
    note.set('time', time); // 创建的时间，createdAt被LC占用了
    note.set('text', text);
    return new Promise((resolve, reject) => {
      note.save().then(
        (res) => resolve(res.id),
        (error) => reject(error))
    })
  }

  static updateNote(id, text, time) {
    let note = AV.Object.createWithoutData('Note', id)
    note.set('text', text)
    time &&  note.set('time', time)
    return new Promise((resolve, reject) => {
      note.save().then(
        (res) => resolve(res.id),
        (error) => reject(error))
    })
  }

  static async getNotes(userId, skip = 0, limit = 10): Promise<any> {
    let query = new AV.Query('Note');
    query.equalTo('userId', userId);
    query.addDescending('time');
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
  static getNotesRange(userId, from: Date, to: Date) {
    // 从第一天第0秒，到最后一天的最后一秒
    from.setHours(0);from.setMinutes(0);from.setSeconds(0)
    to.setHours(23);to.setMinutes(59);to.setSeconds(59)

    let query = new AV.Query('Note')
    query.equalTo('userId', userId)
    query.addDescending('time')
    query.greaterThanOrEqualTo('time', from)
    query.lessThanOrEqualTo('time', to)

    return new Promise((resolve, reject) => {
      query.find().then(
        (results) => resolve(results),
        (error) => reject(error))
    })
  }

  static getANote(id) {
    let query = new AV.Query('Note');
    return new Promise((resolve, reject) => {
      query.get(id).then(
        (results) => resolve(results),
        (error) => reject(error))
    })
  }

  static deleteNote(id) {
    let note = AV.Object.createWithoutData('Note', id);
    return new Promise((resolve, reject) => {
      note.destroy().then(
        (res) => resolve(),
        (error) => reject(error))
    })

  }
}
