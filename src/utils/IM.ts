import {Realtime, TextMessage, IMClient} from 'leancloud-realtime'
import AV from 'leancloud-storage'
import {TypedMessagesPlugin, ImageMessage} from 'leancloud-realtime-plugin-typed-messages'

const LCAppId = 'qSOnDMNzKdGGSipnT7OxO7Cb-gzGzoHsz'
const LCAppKey = 'WakeTHDyS6A3QjCfGtQGor0g'
const LCMasterKey = 'n4LgUleKqdD8RVrBl7dBsDvE'

let _instance: IM
let _client

// AV.init({appId: LCAppId, appKey: LCAppKey})

export class IM {
  userId: String

  public static shareIM() {
    if (!_instance) {
      _instance = new IM()
    }
    return _instance
  }

  private constructor() {
  }

  getClient(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      if (!this.userId) {
        console.warn('没登录')
        return reject('没登录')
      }

      if (!_client) {
        let realtime = new Realtime({
          appId: LCAppId,
          plugins: [TypedMessagesPlugin], // 注册富媒体消息插件
          region: 'cn'
        })
        _client = await realtime.createIMClient(this.userId)
      }

      resolve(_client)
    })
  }

  public login(userId) {
    this.userId = userId

    this.receiveMsg(null)
  }

  public async createSingleConversation(toUserId) {
    let client = await this.getClient()
    return client.createConversation({
      members: [this.userId, toUserId],
      unique: true
    })
  }

  async getHistoryConversations(count = 10) {
    let client = await this.getClient()
    return client.getQuery()
      .withLastMessagesRefreshed(true) // 显示最后一条消息(依然有可能不存在)
      .limit(count) // 数量
      .containsMembers([`${this.userId}`]) // 成员有自己(有些会话被删除掉,但是还是会存在在历史消息中,里面的成员中没有自己)
      .find() // 开始查找
      .then((conversations) => {
        return conversations;
      })
  }

  public async receiveMsg(callback) {
    let client = await this.getClient()
    client.on('message', (message, conversation) => {
      callback && callback(conversation, message)
    })
  }

  public async getHistoryMsgs(conversation, count=10) {
    return conversation.queryMessages({
      limit: count, // 范围1-1000,
    }).then((messages)=> {
      return messages
    })
  }

  public sendTextMsg(conversation, text) {
    return conversation.send(new TextMessage(text))
  }
}
