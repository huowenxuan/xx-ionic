import {IMClient, Realtime, TextMessage} from 'leancloud-realtime'
import AV from 'leancloud-storage'
import {TypedMessagesPlugin, ImageMessage} from 'leancloud-realtime-plugin-typed-messages'

const LCAppId = 'qSOnDMNzKdGGSipnT7OxO7Cb-gzGzoHsz'
const LCAppKey = 'WakeTHDyS6A3QjCfGtQGor0g'
const LCMasterKey = 'n4LgUleKqdD8RVrBl7dBsDvE'

let _instance: IM
let _client

export class IM {
  userId: String

  static defaultIM() {
    if (_instance) {
      return _instance
    } else {
      return new IM()
    }
  }

  private constructor() {
    AV.init({
      appId: LCAppId,
      appKey: LCAppKey
    })
  }

  getClient(): IMClient {
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

  login(userId) {
    this.userId = userId

    this.receiveMessage((conversation, message)=>{
      console.warn(message.text)
    })
  }

  async receiveMessage(callback) {
    let client  = await this.getClient()
    client.on('message', (message, conversation) => {
      callback(conversation, message)
    })
  }

  async createSingleConversation(toUserId) {
    let client  = await this.getClient()
    return client.createConversation({
      members: [this.userId, toUserId],
      unique: true
    })
  }

  static sencTextMessage(conversation, text) {
    return conversation.send(new TextMessage(text))
  }
}
