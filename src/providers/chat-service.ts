import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Events } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';

export class Message {
  id: string; // lc id
  _id: string; // 自定义id
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

  constructor(public http: Http,
              public events: Events) {
  }

  mockNewMsg(msg) {
    // setTimeout(() => {
    //   this.events.publish('chat:received', mockMsg, Date.now())
    // }, Math.random() * 1800)
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
