import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavParams} from 'ionic-angular';
import {Events, Content, TextInput} from 'ionic-angular';
import {ChatService, TextMessage, Message, UserInfo} from "../../providers/chat-service";

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  @ViewChild(Content) content: Content;
  @ViewChild('chat_input') messageInput: TextInput;
  msgList: Message[] = [];
  userId: string;
  toUserId: string;
  editorMsg = '';
  showEmojiPicker = false;
  _conversation

  constructor(public navParams: NavParams,
              public chatService: ChatService,
              public events: Events,) {
    this.toUserId = navParams.get('toUserId')
    this.userId = this.navParams.get('userId')
  }

  ionViewWillLeave() {
  }

  async ionViewDidEnter() {
    let conversation = await this.getConversation()
    this.msgList = await this.chatService.getHistoryMsgs(conversation, 10)
    this.scrollToBottom();

    this.chatService.receiveMsg(async (conversation, msg) => {
      if ((await this.getConversation()).id === conversation.id) {
        if (msg.from !== this.userId) {
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

  onFocus() {
    this.showEmojiPicker = false;
    this.content.resize();
    this.scrollToBottom();
  }

  switchEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
    if (!this.showEmojiPicker) {
      this.messageInput.setFocus();
    }
    this.content.resize();
    this.scrollToBottom();
  }

  async sendMsg() {
    if (!this.editorMsg.trim()) return;

    let newTmpMsg: TextMessage = {
      id: null,
      tmp_id: new Date().toDateString(),
      from: this.userId,
      timestamp: new Date(),
      text: this.editorMsg,
      status: 'pending'
    };

    this.editorMsg = '';
    this.pushNewMsg(newTmpMsg);
    if (!this.showEmojiPicker) {
      this.messageInput.setFocus();
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
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400)
  }
}
