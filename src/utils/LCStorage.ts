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
    return new Promise((res, rej) => {
      note.save().then(function (note) {
        res(note.id)
      }, function (error) {
        // 异常处理
        console.error('保存note失败: ' + error.message);
        rej(error)
      });
    })
  }

  static updateNote(id, text) {

  }

  static async getNotes(userId, skip = 0, limit = 10): Promise<any> {
    let query = new AV.Query('Note');
    query.equalTo('userId', userId);
    query.addDescending('time');
    query.skip(skip)
    query.limit(limit)

    return new Promise((rej, res) => {
      query.find().then(
        (results) => rej(results),
        (error) => res(error))
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

    return new Promise((rej, res) => {
      query.find().then(
        (results) => rej(results),
        (error) => res(error))
    })
  }

  static getANote(id) {
    let query = new AV.Query('Note');
    return new Promise((rej, res) => {
      query.get(id).then(
        (results) => rej(results),
        (error) => res(error))
    })
  }

  static deleteNote(id) {
    let note = AV.Object.createWithoutData('Note', id);
    return new Promise((res, rej) => {
      note.destroy().then(function (success) {
        res()
      }, function (error) {
        rej()
      });
    })

  }
}
