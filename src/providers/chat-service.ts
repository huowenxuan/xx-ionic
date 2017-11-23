import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Events } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';
import {IM} from "../utils/IM";

export class Message {
  id: string; // lc id
  tmp_id: string; // 自定义缓存id
  timestamp: Date;
  from: string;
  status: string; // 是否发送成功
  conversationId: string; // conversationId
}
export class TextMessage extends Message{
  text: string;
}

export class UserInfo {
  id: string;
  name?: string;
  avatar?: string;
}

@Injectable()
export class ChatService {
  im: IM
  _conversation

  constructor(public http: Http,
              public events: Events) {
    this.im = IM.shareIM()

    this.getConversation()
    this.receiveMsg()
  }

  async getConversation(): Promise<any> {
    if (!this._conversation) {
      try {
        this._conversation = await this.im.createSingleConversation('2')
      } catch (e) {
        setTimeout(()=>this.getConversation(), 1000)
      }
    }
    return this._conversation
  }

  async receiveMsg() {
    this.im.receiveMsg(async (conversation, message)=>{
      if ( conversation.id === (await this.getConversation()).id) {
        this.events.publish('chat:received', message)
      }
    })
  }

  async sendTextMsg(text) {
    let conversation = await this.getConversation()
    return await this.im.sendTextMsg(conversation, text)
  }

  getMsgList(): Promise<Message[]> {
    return Promise.resolve([] as Message[]);
    // const msgListUrl = './assets/mock/msg-list.json';
    // return this.http.get(msgListUrl)
    //   .toPromise()
    //   .then(response => response.json().array as ChatMessage[])
    //   .catch(err => Promise.reject(err || 'err'));
  }

  getUserInfo(): Promise<UserInfo> {
    const userInfo: UserInfo = {
      id: '1',
      name: 'Luff',
      avatar: './assets/img/avatar.gif'
    };
    return new Promise(resolve => resolve(userInfo));
  }

}
