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
  user: UserInfo;
  toUser: UserInfo;
  editorMsg = '';
  showEmojiPicker = false;
  _conversation

  constructor(public navParams: NavParams,
              public chatService: ChatService,
              public events: Events,) {
    this.toUser = {
      id: navParams.get('toUserId'),
      name: navParams.get('toUserName')
    };
    this.chatService.getUserInfo()
      .then((res) => {
        this.user = res
      });

  }

  ionViewWillLeave() {
    // unsubscribe
    this.events.unsubscribe('chat:received');
  }

  ionViewDidEnter() {
    this.getMsg()
      .then(() => {
        this.scrollToBottom();
      });

    this.events.subscribe('chat:received', msg => {
      if (msg.from !== this.user.id) {
        let newMsg = new TextMessage()
        newMsg.id = msg.id;
        newMsg.timestamp = new Date(msg.timestamp)
        newMsg.from = msg.from
        newMsg.text = msg._lctext
        newMsg.status = 'ready'
        this.pushNewMsg(newMsg);
      }
    })
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

  getMsg() {
    return this.chatService
      .getMsgList()
      .then(res => {
        this.msgList = res;
      })
      .catch(err => {
        console.log(err)
      })
  }

  async sendMsg() {
    if (!this.editorMsg.trim()) return;

    let newTmpMsg: TextMessage = {
      id: null,
      tmp_id: new Date().toDateString(),
      from: this.user.id,
      timestamp: new Date(),
      text: this.editorMsg,
      status: 'pending'
    };

    this.editorMsg = '';
    this.pushNewMsg(newTmpMsg);
    if (!this.showEmojiPicker) {
      this.messageInput.setFocus();
    }

    let lcMessage = await this.chatService.sendTextMsg(newTmpMsg.text)
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
