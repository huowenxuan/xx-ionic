import AV from 'leancloud-storage'
import {LCAppKey, LCAppId} from "../const/config";

AV.init({appId: LCAppId, appKey: LCAppKey})

export class Note extends AV.Object {
}

AV.Object.register(Note);

export default class LCStorage {

  static saveNote(userId, time, text) {
    // 新建一个 Note 对象
    let note = new Note();
    note.set('userId', userId);
    note.set('time', time); // 创建的时间，createdAt被LC占用了
    note.set('text', text);
    note.save().then(function (note) {
      console.log('保存note成功: ' + note.id);
    }, function (error) {
      // 异常处理
      console.error('保存note失败: ' + error.message);
    });
  }

  static async getAllNote(userId) {
    let query = new AV.Query('Note');
    query.equalTo('userId', userId);

    return new Promise((rej, res)=>{
      query.find().then(
        function (results) {
          rej(results.map((item)=>item.attributes))
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

  static deleteNote() {

  }
}
