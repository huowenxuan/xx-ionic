import AV from 'leancloud-storage'
import {LCAppKey, LCAppId} from "../app.config";

AV.init({appId: LCAppId, appKey: LCAppKey})

export class Note extends AV.Object {
}

AV.Object.register(Note);

export default class LCStorage {

  static async createNote(userId, time, text) {
    // 新建一个 Note 对象
    let note = new Note();
    note.set('userId', userId);
    note.set('time', time); // 创建的时间，createdAt被LC占用了
    note.set('text', text);
    return new Promise((res, rej)=>{
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

  static async getNotes(userId, skip=0, limit=10): Promise<any> {
    let query = new AV.Query('Note');
    query.equalTo('userId', userId);
    query.addDescending('time');
    query.skip(skip)
    query.limit(limit)

    return new Promise((rej, res)=>{
      query.find().then(
        function (results) {
          rej(results)
          // rej(results.map((item)=>item.attributes))
        },
        function (error) {
          res(error)
        });
    })
  }

  static getANote(id) {
    let query = new AV.Query('Note');
    query.get(id).then(
      function (note) {
      },
      function (note) {
      }
    );
  }

  static deleteNote(id) {
    let note = AV.Object.createWithoutData('Note', id);
    return new Promise((res, rej)=>{
      note.destroy().then(function (success) {
        res()
      }, function (error) {
        rej()
      });
    })

  }
}
