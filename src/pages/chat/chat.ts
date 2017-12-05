import {Component, EventEmitter, NgZone, ViewChild} from '@angular/core';
import {IonicPage, NavParams} from 'ionic-angular';
import {Events, Content, TextInput} from 'ionic-angular';
import {ChatService, TextMessage, Message, UserInfo} from "../../providers/chat-service";
import {UserService} from "../../providers/user-service";
import {ChatInputComponent} from "../../components/ChatInput/chat-input";

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  @ViewChild('content') content: any;
  @ViewChild(ChatInputComponent) input: any;
  msgList: Message[] = [];
  toUserId: string;
  showEmojiPicker = false;
  _conversation

  constructor(public _zone: NgZone,
              public navParams: NavParams,
              public chatService: ChatService,
              public userService: UserService) {
    this.toUserId = navParams.get('toUserId')
  }

  ionViewWillLeave() {
  }

  async ionViewDidEnter() {
    this.initConversation()
  }

  async initConversation() {
    this.scrollToBottom();

    let conversation = await this.getConversation()
    if (!conversation) {
      setTimeout(() => this.initConversation(), 2000)
      return
    }

    this.msgList = await this.chatService.getHistoryMsgs(conversation, 10)
    this.scrollToBottom();

    this.chatService.receiveMsg(async (conversation, msg) => {
      if ((await this.getConversation()).id === conversation.id) {
        if (msg.from !== this.userService.userId) {
          let newMsg = new TextMessage()
          newMsg.id = msg.id;
          newMsg.timestamp = new Date(msg.timestamp)
          newMsg.from = msg.from
          newMsg.text = msg._lctext
          newMsg.status = 'ready'
          this.pushNewMsg(newMsg);
        }
      }
    })
  }

  async getConversation() {
    if (!this._conversation) {
      try {
        this._conversation = await this.chatService.createSingleConversation(this.toUserId)
      } catch (e) {
        setTimeout(() => this.getConversation(), 1000)
      }
    }
    return this._conversation
  }

  switchEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
    if (!this.showEmojiPicker) {
      this.input.setFocus();
    }
    this.scrollToBottom();
  }

  async sendMsg() {
    if (!this.input.getInput().trim()) return;

    let newTmpMsg: TextMessage = {
      id: null,
      tmp_id: new Date().toDateString(),
      from: this.userService.userId,
      timestamp: new Date(),
      text: this.input.getInput(),
      status: 'pending'
    };

    this.input.clearInput()
    this.pushNewMsg(newTmpMsg);
    if (!this.showEmojiPicker) {
      this.input.setFocus();
    }

    let conversation = await this.getConversation()
    let lcMessage = await this.chatService.sendTextMsg(conversation, newTmpMsg.text)
    this.msgList.forEach(async (msg) => {
      if (msg.tmp_id === newTmpMsg.tmp_id) {
        console.log('已发送：' + newTmpMsg.text)
        msg.id = lcMessage.id;
        msg.status = 'ready'
        msg.conversationId = lcMessage.cid
      }
    })

  }

  /**
   * @name pushNewMsg
   * @param msg
   */
  pushNewMsg(msg: Message) {
    this.msgList.push(msg);
    this.scrollToBottom();
  }

  scrollToBottom() {
    // 保证滚到footer上面
    this._zone.run(() => setTimeout(() => this.content.scrollToBottom(300)));
  }
}
