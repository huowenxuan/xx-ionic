import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Events} from 'ionic-angular';
import 'rxjs/add/operator/toPromise';
import {IM} from "../utils/IM";

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
  im: IM

  constructor(public http: Http,
              public events: Events) {
    this.im = IM.shareIM()

    this.getHistoryConversations(10)
  }

  async getHistoryConversations(count) {
    return await this.im.getHistoryConversations(count)
  }

  async createSingleConversation(toUserId): Promise<any> {
    return await this.im.createSingleConversation(toUserId)
  }

  async receiveMsg(callback) {
    this.im.receiveMsg(async (conversation, message) => {
      callback && callback(conversation, message)
    })
  }

  async sendTextMsg(conversation, text) {
    return await this.im.sendTextMsg(conversation, text)
  }

  async getHistoryMsgs(conversation, count) {
    return await this.im.getHistoryMsgs(conversation, 10)
  }

  getUserInfo(): Promise<UserInfo> {
    const userInfo: UserInfo = {
      id: '1',
      name: 'Luff',
      avatar: 'assets/img/avatar.gif'
    };
    return new Promise(resolve => resolve(userInfo));
  }

}
