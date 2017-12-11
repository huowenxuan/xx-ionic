import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Events} from 'ionic-angular';
import 'rxjs/add/operator/toPromise';

import {Realtime, TextMessage as LCTextMessage, IMClient} from 'leancloud-realtime'
import {TypedMessagesPlugin, ImageMessage} from 'leancloud-realtime-plugin-typed-messages'
import {LCAppId} from "../app.config";

let _client

export class Message {
  id?: string; // lc id
  tmp_id?: string; // 自定义缓存id
  timestamp?: Date;
  from: string;
  status: string; // 是否发送成功
  conversationId?: string; // conversationId
}

export class TextMessage extends Message {
  text: string;
}

export class UserInfo {
  id: string;
  name?: string;
  avatar?: string;
}

@Injectable()
export class ChatService {
  userId: String

  constructor(public http: Http,
              public events: Events) {
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

  async loginIM(userId) {
    this.userId = userId
    this.receiveMsg(null)
  }

  async getHistoryConversations(count=10) {
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

  async createSingleConversation(toUserId): Promise<any> {
    let client = await this.getClient()
    return client.createConversation({
      members: [this.userId, toUserId],
      unique: true
    })
  }

  async receiveMsg(callback) {
    let client = await this.getClient()
    client.on('message', (message, conversation) => {
      callback && callback(conversation, message)
    })
  }

  async sendTextMsg(conversation, text) {
    return conversation.send(new LCTextMessage(text))
  }

  async getHistoryMsgs(conversation, count=10) {
    return conversation.queryMessages({
      limit: count, // 范围1-1000,
    }).then((messages)=> {
      return messages
    })
  }
}
