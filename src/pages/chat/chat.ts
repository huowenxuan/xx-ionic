import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavParams} from 'ionic-angular';
import {Events, Content, TextInput} from 'ionic-angular';
import {ChatService, TextMessage, Message, UserInfo} from "../../providers/chat-service";
import {IM} from "../../utils/IM";

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
  im: IM
  conversation

  constructor(public navParams: NavParams,
              public chatService: ChatService,
              public events: Events,) {
    // Get the navParams toUserId parameter
    this.toUser = {
      id: navParams.get('toUserId'),
      name: navParams.get('toUserName')
    };
    // Get mock user information
    this.chatService.getUserInfo()
      .then((res) => {
        this.user = res
      });

    this.im = IM.shareIM()
    this.initConversation()
  }

  async initConversation() {
    this.conversation = await this.im.createSingleConversation('2')
    console.log('init conversation done')
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
      this.pushNewMsg(msg);
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

    let newMsg: TextMessage = {
      id: null,
      _id: Date.now().toString(),
      from: this.user.id,
      timestamp: Date.now(),
      text: this.editorMsg,
      conversationId: this.conversation.id,
      status: 'pending'
    };

    this.pushNewMsg(newMsg);
    this.editorMsg = '';
    if (!this.showEmojiPicker) {
      this.messageInput.setFocus();
    }

    this.im.sendTextMessage(this.conversation, this.editorMsg)
      .then((lcMessage) => {

      })


    // let index = this.getMsgIndexById(id);
    // if (index !== -1) {
    //   this.msgList[index].status = 'success';
    // }
  }

  /**
   * @name pushNewMsg
   * @param msg
   */
  pushNewMsg(msg: Message) {
    this.msgList.push(msg);
    this.scrollToBottom();
  }

  getMsgIndexById(id: string) {
    return this.msgList.findIndex(e => e.id === id)
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400)
  }
}
